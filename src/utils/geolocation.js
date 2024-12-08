export const isEurope = async () => {
  try {
    // Using ipapi.co for geolocation (free tier: 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // Check if the country is in Europe
    const europeanCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 
      'NO', 'CH', 'AL', 'BA', 'ME', 'MK', 'RS', 'TR'
    ];
    return europeanCountries.includes(data.country_code);
  } catch (error) {
    console.error('Error detecting location:', error);
    return false; // Default to non-European version if there's an error
  }
};
