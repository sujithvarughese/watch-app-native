import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ThemedText} from "@/components/ThemedText";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <ThemedText style={styles.iconButtonLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
    fontWeight: 500
  },
});
