import { put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setRates } from '../slice/Currency.reducer';
import { API_URL } from '../constants/Api.constant';
import { ConversionRates } from '../interface/Currency.interface';

export function* getRates(): Generator<any> {
  try {
    let rates: ConversionRates = {};
    yield axios
      .get(API_URL.RATES.url.replace('{currency}', 'MYR'))
      .then(res => {
        rates = res.data.conversion_rates;
        console.log('respond', rates);
      })
      .catch(err => {
        console.log('Rates API error', err);
      });

    yield put(setRates(rates));
  } catch (e) {
    console.log('Saga error', e);
  }
}

export function* CurrencySaga() {
  yield takeEvery(getRatesAction.type, getRates);
}

export const getRatesAction = createAction('getRatesAction');
