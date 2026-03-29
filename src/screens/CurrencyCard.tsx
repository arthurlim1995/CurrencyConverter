import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CurrencyCardType {
  value: string;
  currency: string;
}

const CurrencyCard = ({ value, currency }: CurrencyCardType) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Converted</Text>
      <Text style={styles.value}>
        {value} {currency}
      </Text>
    </View>
  );
};

export default CurrencyCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    padding: 20,
    borderRadius: 14,
    backgroundColor: '#4facfe',
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
  },
});
