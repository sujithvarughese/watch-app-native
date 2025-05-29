import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {ThemedText} from "@/components/ThemedText";
import { ButtonProps } from "react-native";

type Props = ButtonProps & {
  children: React.ReactNode;
  onPress: () => void;
}

const Button: React.FC<Props> = ({children, onPress, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button]}
      {...props}
    >
      <ThemedText style={styles.buttonText}>{children}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'limegreen'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  }
});

export default Button;

