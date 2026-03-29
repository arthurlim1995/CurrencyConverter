import Config from 'react-native-config';

export const API_URL = {
  RATES: {
    url: `https://v6.exchangerate-api.com/v6/${Config.EXCHANGE_RATE_API_KEY}/latest/{currency}`,
  },
};
