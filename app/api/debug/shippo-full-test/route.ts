import { NextResponse } from 'next/server';

// Comprehensive Shippo integration test endpoint
export async function GET() {
  const results: any = {
    step1_apiKey: { status: 'pending', message: '' },
    step2_apiConnection: { status: 'pending', message: '', data: null },
    step3_carrierAccounts: { status: 'pending', message: '', data: null },
    step4_shipmentCreation: { status: 'pending', message: '', data: null },
    step5_ratesReceived: { status: 'pending', message: '', data: null },
    step6_carrierFilter: { status: 'pending', message: '', data: null },
    step7_markup: { status: 'pending', message: '', data: null },
  };

  try {
    // STEP 1: Check API Key
    const shippoApiKey = process.env.SHIPPO_API_KEY;
    if (!shippoApiKey) {
      results.step1_apiKey = {
        status: 'failed',
        message: 'SHIPPO_API_KEY environment variable not set',
      };
      return NextResponse.json({ success: false, results });
    }
    results.step1_apiKey = {
      status: 'passed',
      message: `API key found (${shippoApiKey.substring(0, 12)}...)`,
      keyLength: shippoApiKey.length,
    };

    // STEP 2: Test API Connection
    try {
      const testResponse = await fetch('https://api.goshippo.com/carrier_accounts/', {
        headers: {
          'Authorization': `ShippoToken ${shippoApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!testResponse.ok) {
        results.step2_apiConnection = {
          status: 'failed',
          message: `Shippo API returned error ${testResponse.status}`,
          statusCode: testResponse.status,
        };
        return NextResponse.json({ success: false, results });
      }

      results.step2_apiConnection = {
        status: 'passed',
        message: 'Successfully connected to Shippo API',
      };
    } catch (error: any) {
      results.step2_apiConnection = {
        status: 'failed',
        message: `Connection failed: ${error.message}`,
      };
      return NextResponse.json({ success: false, results });
    }

    // STEP 3: Get Carrier Accounts
    try {
      const carrierResponse = await fetch('https://api.goshippo.com/carrier_accounts/', {
        headers: {
          'Authorization': `ShippoToken ${shippoApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const carrierData = await carrierResponse.json();
      const activeCarriers = carrierData.results?.filter((c: any) => c.active) || [];

      results.step3_carrierAccounts = {
        status: 'passed',
        message: `Found ${activeCarriers.length} active carrier accounts`,
        data: {
          totalCarriers: carrierData.results?.length || 0,
          activeCarriers: activeCarriers.length,
          carriers: activeCarriers.map((c: any) => ({
            carrier: c.carrier,
            account_id: c.account_id,
            active: c.active,
          })),
        },
      };
    } catch (error: any) {
      results.step3_carrierAccounts = {
        status: 'warning',
        message: `Could not fetch carriers: ${error.message}`,
      };
    }

    // STEP 4: Create Test Shipment
    const fromAddress = {
      name: 'JungleeToys',
      street1: '483 Green Lanes',
      city: 'London',
      state: '',
      zip: 'N13 4BS',
      country: 'GB',
      phone: '+44 7342224136',
      email: 'grace@jungleetoys.com',
    };

    const toAddress = {
      name: 'Test Customer',
      street1: '142 midland road',
      city: 'crawley',
      state: '',
      zip: 'lu2 0gh',
      country: 'GB',
      phone: '+44 7123456789',
      email: 'test@example.com',
    };

    const parcel = {
      length: '15',
      width: '10',
      height: '10',
      distance_unit: 'cm',
      weight: '0.5',
      mass_unit: 'kg',
    };

    try {
      const shipmentResponse = await fetch('https://api.goshippo.com/shipments/', {
        method: 'POST',
        headers: {
          'Authorization': `ShippoToken ${shippoApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address_from: fromAddress,
          address_to: toAddress,
          parcels: [parcel],
          async: false,
        }),
      });

      if (!shipmentResponse.ok) {
        const errorText = await shipmentResponse.text();
        results.step4_shipmentCreation = {
          status: 'failed',
          message: `Shipment creation failed with status ${shipmentResponse.status}`,
          error: errorText,
        };
        return NextResponse.json({ success: false, results });
      }

      const shipment = await shipmentResponse.json();
      results.step4_shipmentCreation = {
        status: 'passed',
        message: `Shipment created successfully`,
        data: {
          shipmentId: shipment.object_id,
          status: shipment.status,
          addressValidation: {
            from: shipment.address_from?.validation_results,
            to: shipment.address_to?.validation_results,
          },
        },
      };

      // STEP 5: Check Rates Received
      const rates = shipment.rates || [];
      if (rates.length === 0) {
        results.step5_ratesReceived = {
          status: 'failed',
          message: 'No rates returned from Shippo',
          data: { ratesCount: 0 },
        };
        return NextResponse.json({ success: false, results });
      }

      results.step5_ratesReceived = {
        status: 'passed',
        message: `Received ${rates.length} rates from Shippo`,
        data: {
          ratesCount: rates.length,
          providers: rates.map((r: any) => r.provider),
          allRates: rates.map((r: any) => ({
            provider: r.provider,
            service: r.servicelevel?.name,
            amount: r.amount,
            currency: r.currency,
            days: r.estimated_days,
          })),
        },
      };

      // STEP 6: Test Carrier Filter
      const targetCarriers = ['DPD UK', 'Evri', 'Evri UK'];
      const filteredRates = rates.filter((rate: any) =>
        targetCarriers.includes(rate.provider)
      );

      if (filteredRates.length === 0) {
        results.step6_carrierFilter = {
          status: 'failed',
          message: `No rates matched filter. Looking for: ${targetCarriers.join(', ')}`,
          data: {
            targetCarriers,
            availableProviders: [...new Set(rates.map((r: any) => r.provider))],
            filteredCount: 0,
          },
        };
      } else {
        results.step6_carrierFilter = {
          status: 'passed',
          message: `${filteredRates.length} rates matched filter`,
          data: {
            targetCarriers,
            matchedProviders: filteredRates.map((r: any) => r.provider),
            filteredCount: filteredRates.length,
          },
        };
      }

      // STEP 7: Apply 50% Markup
      const markedUpRates = filteredRates.map((rate: any) => {
        const originalAmount = parseFloat(rate.amount);
        const markedUpAmount = (originalAmount * 1.5).toFixed(2);
        return {
          provider: rate.provider,
          service: rate.servicelevel?.name,
          originalAmount: rate.amount,
          markedUpAmount: markedUpAmount,
          currency: rate.currency,
          estimatedDays: rate.estimated_days,
        };
      });

      results.step7_markup = {
        status: 'passed',
        message: `Applied 50% markup to ${markedUpRates.length} rates`,
        data: {
          markedUpRates,
        },
      };

    } catch (error: any) {
      results.step4_shipmentCreation = {
        status: 'failed',
        message: `Shipment creation error: ${error.message}`,
        error: error.stack,
      };
      return NextResponse.json({ success: false, results });
    }

    // Summary
    const allPassed = Object.values(results).every((r: any) =>
      r.status === 'passed' || r.status === 'warning'
    );

    return NextResponse.json({
      success: allPassed,
      summary: {
        totalSteps: 7,
        passed: Object.values(results).filter((r: any) => r.status === 'passed').length,
        failed: Object.values(results).filter((r: any) => r.status === 'failed').length,
        warnings: Object.values(results).filter((r: any) => r.status === 'warning').length,
      },
      results,
      recommendation: allPassed
        ? 'All tests passed! Shippo integration is working correctly.'
        : 'Some tests failed. Check the results above for details.',
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      results,
    }, { status: 500 });
  }
}
