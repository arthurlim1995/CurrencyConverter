import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversionRates } from '../interface/Currency.interface';

interface CurrencyState {
  rates: ConversionRates;
}

const initialState: CurrencyState = {
  rates: {},
};

const CurrencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setRates(state, action: PayloadAction<ConversionRates>) {
      state.rates = action.payload;
    },
  },
});

export const { setRates } = CurrencySlice.actions;
export const CurrencyReducer = CurrencySlice.reducer;
