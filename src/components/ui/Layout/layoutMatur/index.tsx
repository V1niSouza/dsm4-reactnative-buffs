import React from "react";
import { View } from "react-native";
import { s } from "./styles";

type Props = {
    children: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
};

export default function LayoutMatur({
    children
} : Props ){
    return(
        <View style={s.container}>
            {children}
        </View>
    )
}