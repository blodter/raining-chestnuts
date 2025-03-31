export const WmoMapping = {
  0: 'Clear',
  1: 'Cloudy',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Heavy Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Heavy Freezing Drizzle',
  61: 'Light Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Freezing Rain',
  71: 'Light Snow',
  73: 'Moderate Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Light Rain Showers',
  81: 'Moderate Rain Showers',
  82: 'Heavy Rain Showers',
  85: 'Light Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Slight Thunderstorm',
  96: 'Slight Thunderstorm with Hail',
  99: 'Heavy Thunderstorm with Hail',
};

export const WmoIconMapping = {
  0: ['far', 'sun'],
  1: ['fas', 'cloud'],
  2: ['fas', 'cloud-sun'],
  3: ['fas', 'cloud'], // clouds on pro
  45: ['fas', 'cloud'], // cloud-fog on pro
  48: ['fas', 'cloud'], // cloud-fog on pro
  51: ['fas', 'cloud-rain'], // cloud-drizzle on pro
  53: ['fas', 'cloud-rain'], // cloud-drizzle on pro
  55: ['fas', 'cloud-rain'], // cloud-drizzle on pro
  56: ['fas', 'cloud-rain'], // cloud-hail-mixed on pro
  57: ['fas', 'cloud-rain'], // cloud-hail-mixed on pro
  61: ['fas', 'cloud-rain'],
  63: ['fas', 'cloud-rain'],
  65: ['fas', 'cloud-rain'],
  66: ['fas', 'cloud-rain'], // cloud-hail-mixed on pro
  67: ['fas', 'cloud-rain'], // cloud-hail-mixed on pro
  71: ['far', 'snowflake'],
  73: ['far', 'snowflake'], // snowflake on pro
  75: ['far', 'snowflake'], // snowflakes on pro
  77: ['far', 'snowflake'], // snowflakes on pro
  80: ['far', 'snowflake'],
  81: ['far', 'snowflake'],
  82: ['far', 'snowflake'],
  85: ['far', 'snowflake'], // cloud-sleet on pro
  86: ['far', 'snowflake'], // cloud-sleet on pro
  95: ['fas', 'cloud-bolt'],
  96: ['fas', 'cloud-bolt'],
  99: ['fas', 'cloud-bolt'],
};
