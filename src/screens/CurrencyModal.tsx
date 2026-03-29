import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';

interface CurrencyModalType {
  visible: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
  removeCurr?: string;
}

const currencyList = [
  { currCode: 'MYR', isoCode: 'MY' },
  { currCode: 'USD', isoCode: 'US' },
  { currCode: 'EUR', isoCode: 'EU' },
  { currCode: 'SGD', isoCode: 'SG' },
  { currCode: 'JPY', isoCode: 'JP' },
  { currCode: 'IDR', isoCode: 'ID' },
];

const CurrencyModal = ({
  visible,
  onClose,
  onSelect,
  removeCurr,
}: CurrencyModalType) => {
  const filteredList = currencyList.filter(
    item => item.currCode !== removeCurr,
  );
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <FlatList
              data={filteredList}
              keyExtractor={item => item.currCode}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.currCode);
                    onClose();
                  }}
                >
                  <CountryFlag
                    style={styles.flag}
                    isoCode={item.isoCode}
                    size={15}
                  />
                  <Text style={styles.text}>{item.currCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CurrencyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#2c2c3e',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  flag: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
