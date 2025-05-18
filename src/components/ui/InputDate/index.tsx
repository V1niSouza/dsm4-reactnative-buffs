import React, { useState } from "react";
import { View, TouchableOpacity, useWindowDimensions, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../styles/colors";
import TextBody from "../TextBody";
import { Entypo } from "@expo/vector-icons";

type Props = {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
};

export default function DateInput({ label = "Data", value, onChange }: Props) {
  const [show, setShow] = useState(false);
  const { height } = useWindowDimensions();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={{ width: "100%", marginBottom: RFValue(25) }}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          backgroundColor: colors.gray.fundoInput,
          borderRadius: RFValue(10),
          borderWidth: RFValue(0.6),
          borderColor: colors.gray.base,
          width: "100%",
          height: height * 0.05,
          justifyContent: "center",
          paddingHorizontal: RFValue(10),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
            <TextBody>{formatDate(value)}</TextBody>
            <Entypo name="calendar" size={RFValue(20)} color={colors.gray.base} style={{marginLeft: 'auto'}} />
        </View>
      </TouchableOpacity>

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value}
          mode="date"
          display="calendar"
          onChange={handleChange}
          is24Hour={true}
        />
      )}
    </View>
  );
}
