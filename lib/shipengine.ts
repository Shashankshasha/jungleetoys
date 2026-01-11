import ShipEngine from 'shipengine';

// Lazy initialization - only create client when first used
let shipEngineInstance: ShipEngine | null = null;

export const getShipEngineClient = (): ShipEngine => {
  if (!shipEngineInstance) {
    const apiKey = process.env.SHIPENGINE_API_KEY;

    if (!apiKey) {
      throw new Error('SHIPENGINE_API_KEY is not configured');
    }

    shipEngineInstance = new ShipEngine(apiKey);
  }

  return shipEngineInstance;
};

// Carrier configuration - can be toggled on/off
export const AVAILABLE_CARRIERS = {
  'RoyalMail': { name: 'Royal Mail', enabled: true, priority: 1 },
  'Evri': { name: 'EVRi', enabled: true, priority: 2 },
  'DPD': { name: 'DPD', enabled: true, priority: 3 },
  'Yodel': { name: 'Yodel', enabled: false, priority: 4 },
  'GlobalPost': { name: 'GlobalPost', enabled: false, priority: 5 },
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
      config.name.toLowerCase() === carrierName.toLowerCase() ||
      carrierName.toLowerCase().includes(key.toLowerCase()) ||
      carrierName.toLowerCase().includes(config.name.toLowerCase())
  );
  return carrier ? carrier[1].enabled : false;
};
