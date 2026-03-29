import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CurrencyInputType {
  value: string;
  currency: string;
  onChangeText: (text: string) => void;
  onPressCurrency: () => void;
}

const CurrencyInput = ({
  value,
  currency,
  onChangeText,
  onPressCurrency,
}: CurrencyInputType) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="0"
        style={styles.input}
        placeholderTextColor={'#595858'}
      />
      <TouchableOpacity onPress={onPressCurrency} style={styles.currencyBtn}>
        <Text style={styles.currencyText}>{currency}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrencyInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2c2c3e',
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    color: '#fff',
  },
  currencyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3a3a4f',
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
});
