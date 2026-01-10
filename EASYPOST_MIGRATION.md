# EasyPost Migration Guide

## Overview

We've migrated from Shippo to EasyPost for better carrier support, developer-friendly API, and flexible pricing.

## Why EasyPost?

✅ **100+ carriers** including Royal Mail, DPD, Evri
✅ **Free API access** on all plans
✅ **Pay only for what you use** - no monthly fees
✅ **Better Node.js SDK** - more developer-friendly
✅ **UK carrier support** - Royal Mail, Parcelforce, DPD, Evri

## Setup Steps

### 1. Get EasyPost API Key

1. Sign up at https://easypost.com
2. Go to API Keys in your dashboard
3. Copy your API key (starts with `EZTEST` for test mode)

### 2. Add to Vercel Environment Variables

```
EASYPOST_API_KEY=EZTESTxxxxxxxxxxxx
```

Add this in:
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Select "Production", "Preview", and "Development"

### 3. Configure Carriers

Edit `/lib/easypost.ts` to enable/disable carriers:

```typescript
export const AVAILABLE_CARRIERS = {
  'RoyalMail': { name: 'Royal Mail', enabled: true, priority: 1 },
  'Evri': { name: 'Evri', enabled: true, priority: 2 },
  'DPD': { name: 'DPD UK', enabled: true, priority: 3 },
  'Parcelforce': { name: 'Parcelforce', enabled: false, priority: 4 },
  // Add more carriers as needed
};
```

Set `enabled: true` for carriers you want to offer customers.

## API Endpoints

### Shipping Rates (EasyPost)
- **Endpoint**: `POST /api/shipping/rates-easypost`
- **Request**:
  ```json
  {
    "toAddress": {
      "name": "Customer Name",
      "street1": "123 Street",
      "city": "London",
      "zip": "SW1A 1AA",
      "country": "GB",
      "email": "customer@email.com"
    },
    "weight": "0.5"
  }
  ```
- **Response**:
  ```json
  {
    "rates": [
      {
        "id": "rate_xxx",
        "provider": "RoyalMail",
        "serviceName": "2nd Class",
        "amount": "5.97",
        "originalAmount": "3.98",
        "currency": "GBP",
        "estimatedDays": "2-3",
        "easypostRateId": "rate_xxx"
      }
    ]
  }
  ```

### Test EasyPost
- **Endpoint**: `GET /api/test/easypost`
- Tests API connection and returns sample rates

### Carrier Settings
- **Endpoint**: `GET /api/settings/carriers`
- Shows enabled/disabled carriers

## Updating Checkout to Use EasyPost

Update `/app/checkout/page.tsx`:

```typescript
// Change from:
const response = await fetch('/api/shipping/rates', {

// To:
const response = await fetch('/api/shipping/rates-easypost', {
```

## Supported UK Carriers

| Carrier | Service | Enabled |
|---------|---------|---------|
| Royal Mail | 1st Class, 2nd Class, Signed For | ✅ |
| Evri | Standard, Next Day | ✅ |
| DPD UK | Next Day, Express | ✅ |
| Parcelforce | 24hr, 48hr | ⚠️ Optional |

## Pricing

- **50% markup applied** to all rates
- Customer pays: `carrier_rate × 1.5`
- You pay EasyPost: `carrier_rate` (only when purchasing labels)

## Migration Checklist

- [x] Install EasyPost SDK (`@easypost/api`)
- [x] Create EasyPost configuration (`lib/easypost.ts`)
- [x] Create new rates endpoint (`/api/shipping/rates-easypost`)
- [x] Add carrier toggle system
- [ ] Get EasyPost API key from https://easypost.com
- [ ] Add `EASYPOST_API_KEY` to Vercel environment variables
- [ ] Test with `/api/test/easypost`
- [ ] Update checkout page to use new endpoint
- [ ] Test full checkout flow
- [ ] Deploy to production

## Testing

1. **Test API Connection**:
   ```
   GET /api/test/easypost
   ```

2. **Test Shipping Rates**:
   ```bash
   curl -X POST https://jungleetoys.com/api/shipping/rates-easypost \
     -H "Content-Type: application/json" \
     -d '{
       "toAddress": {
         "name": "Test",
         "street1": "10 Downing St",
         "city": "London",
         "zip": "SW1A 2AA",
         "country": "GB"
       },
       "weight": "0.5"
     }'
   ```

3. **Test Checkout Flow**:
   - Add product to cart
   - Enter UK address
   - Verify Royal Mail, Evri, DPD rates show
   - Check 50% markup applied
   - Complete payment

## Troubleshooting

### No rates returned
- Check `EASYPOST_API_KEY` is set in Vercel
- Verify address format (UK postcodes)
- Check carrier is enabled in `/lib/easypost.ts`

### Wrong currency (USD instead of GBP)
- EasyPost auto-detects currency from country code
- Ensure `country: 'GB'` in addresses

### Carrier not appearing
- Check carrier name matches EasyPost format (e.g., "RoyalMail", "DPD")
- Set `enabled: true` in `AVAILABLE_CARRIERS`

## Rollback Plan

If issues occur, you can temporarily revert to Shippo:

1. Change checkout to use `/api/shipping/rates` (old endpoint)
2. Both systems can run in parallel during migration

## Next Steps

1. **Get Live API Key**: Switch from test to production key
2. **Monitor Rates**: Check EasyPost dashboard for rate accuracy
3. **Add More Carriers**: Enable UPS, FedEx as needed
4. **Dynamic Carrier Toggle**: Move carrier config to database for runtime changes
