import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RadioButtonProps = {
  label: string;
  value: string;
  selected: string | null;
  onSelect: (value: string) => void;
};

function RadioButton({ label, value, selected, onSelect }: RadioButtonProps) {
  const isSelected = selected === value;

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onSelect(value)}>
      <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
        {isSelected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

type RadioButtonGroupProps = {
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  label?: string;
  containerStyle?: object;
};

export default function RadioButtonGroup({
  options,
  selectedValue,
  onValueChange,
  label,
  containerStyle,
}: RadioButtonGroupProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.groupLabel}>{label}</Text>}
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue}
          onSelect={onValueChange}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  groupLabel: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  outerCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  outerCircleSelected: {
    borderColor: "#007AFF",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 16,
  },
});
