import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TextStyle, Text, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  label: string;
  value: string | boolean;
  onChange: (name: string, value: string | boolean) => void;
}

interface Styles {
  inputLine: TextStyle;
  input: TextStyle;
  label: TextStyle;
  inputRow: TextStyle;
  booleanButton: TextStyle;
  selectedBooleanButton: TextStyle;
  booleanButtonText: TextStyle;
}

const inputStyles = StyleSheet.create<Styles>({
  inputLine: {
    borderBottomColor: '#401201',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#260101',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  booleanButton: {
    padding: 10,
    backgroundColor: '#D9C3A9',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedBooleanButton: {
    backgroundColor: '#401201',
  },
  booleanButtonText: {
    color: 'white',
  },
});

const InputField: React.FC<Props> = ({ name, label, value, onChange, ...inputProps }) => {
  if (typeof value === 'boolean') {
    return (
      <View style={inputStyles.inputRow}>
        <Text style={inputStyles.label}>{label}</Text>
        <TouchableOpacity
          style={[inputStyles.booleanButton, value === true && inputStyles.selectedBooleanButton]}
          onPress={() => onChange(name, true)}
        >
          <Text style={inputStyles.booleanButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[inputStyles.booleanButton, value === false && inputStyles.selectedBooleanButton]}
          onPress={() => onChange(name, false)}
        >
          <Text style={inputStyles.booleanButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={inputStyles.inputLine}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        style={inputStyles.input}
        placeholder={label}
        value={value as string}
        onChangeText={(text) => onChange(name, text)}
        {...inputProps}
      />
    </View>
  );
};

export default InputField;
