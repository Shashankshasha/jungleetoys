import EasyPostClient from '@easypost/api';

// Lazy initialization - only create client when first used
let easyPostInstance: EasyPostClient | null = null;

export const getEasyPostClient = (): EasyPostClient => {
  if (!easyPostInstance) {
    const apiKey = process.env.EASYPOST_API_KEY;

    if (!apiKey) {
      throw new Error('EASYPOST_API_KEY is not configured');
    }

    easyPostInstance = new EasyPostClient(apiKey);
  }

  return easyPostInstance;
};

// Carrier configuration - can be toggled on/off
export const AVAILABLE_CARRIERS = {
  'RoyalMail': { name: 'Royal Mail', enabled: true, priority: 1 },
  'Evri': { name: 'Evri', enabled: true, priority: 2 },
  'DPD': { name: 'DPD UK', enabled: true, priority: 3 },
  'Parcelforce': { name: 'Parcelforce', enabled: false, priority: 4 },
  'UPS': { name: 'UPS', enabled: false, priority: 5 },
  'FedEx': { name: 'FedEx', enabled: false, priority: 6 },
} as const;

// Get enabled carriers
export const getEnabledCarriers = () => {
  return Object.entries(AVAILABLE_CARRIERS)
    .filter(([_, config]) => config.enabled)
    .sort((a, b) => a[1].priority - b[1].priority)
    .map(([key, config]) => ({ key, ...config }));
};

// Check if carrier is enabled
export const isCarrierEnabled = (carrierName: string): boolean => {
  const carrier = Object.entries(AVAILABLE_CARRIERS).find(
    ([key, config]) =>
      key.toLowerCase() === carrierName.toLowerCase() ||
      config.name.toLowerCase() === carrierName.toLowerCase()
  );
  return carrier ? carrier[1].enabled : false;
};
