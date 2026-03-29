import { all } from 'redux-saga/effects';
import { CurrencySaga } from './Currency.saga';

export default function* rootSaga() {
  yield all([CurrencySaga()]);
}
