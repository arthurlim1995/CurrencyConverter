import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRatesAction } from '../sagas/Currency.saga';
import CurrencyModal from './CurrencyModal';
import CurrencyInput from './CurrencyInput';
import { ArrowDownUp } from 'lucide-react-native';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(state => state.currencyScreen.rates);

  const [fromCurrency, setFromCurrency] = useState('MYR');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const [currentInput, setCurrentInput] = useState<'from' | 'to'>('from');

  const [showModal, setShowModal] = useState(false);
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');

  useEffect(() => {
    dispatch(getRatesAction());
  }, []);

  const convert = (value: string, fromCurr: string, toCurr: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return '';
    }

    if (fromCurr === toCurr) {
      return value;
    }

    let convertFromValue = fromCurr === 'MYR' ? num : num / rates[fromCurr];
    let convertToValue =
      toCurr === 'MYR' ? convertFromValue : convertFromValue * rates[toCurr];

    if (toCurr === 'JPY' || toCurr === 'IDR') {
      return Math.round(convertToValue).toString();
    }

    return convertToValue.toFixed(4);
  };

  const handleFromChange = (text: string) => {
    setCurrentInput('from');
    setFromValue(text);
    setToValue(convert(text, fromCurrency, toCurrency));
  };

  const handleToChange = (text: string) => {
    setCurrentInput('to');
    setToValue(text);
    setFromValue(convert(text, toCurrency, fromCurrency));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleSelectCurrency = (code: string) => {
    if (selecting === 'from') {
      setFromCurrency(code);
      if (currentInput === 'from') {
        setToValue(convert(fromValue, code, toCurrency));
      }
    } else {
      setToCurrency(code);
      if (currentInput === 'to') {
        setFromValue(convert(toValue, code, fromCurrency));
      }
    }
  };

  return (
    <View style={styles.container}>
      <CurrencyInput
        value={fromValue}
        currency={fromCurrency}
        onChangeText={handleFromChange}
        onPressCurrency={() => {
          setSelecting('from');
          setShowModal(true);
        }}
      />
      <TouchableOpacity style={styles.swapBtn} onPress={swapCurrencies}>
        <ArrowDownUp size={18} color={'white'} />
      </TouchableOpacity>
      <CurrencyInput
        value={toValue}
        currency={toCurrency}
        onChangeText={handleToChange}
        onPressCurrency={() => {
          setSelecting('to');
          setShowModal(true);
        }}
      />
      <CurrencyModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleSelectCurrency}
        removeCurr={selecting === 'from' ? fromCurrency : toCurrency}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e2e',
    justifyContent: 'center',
  },
  swapBtn: {
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#2c2c3e',
    borderRadius: 50,
  },
});
