/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import ButtonStyle from './Button.style';

interface ButtonProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  onPress?: () => void;
  borderWidth?: number;
  borderColor?: string;
  shadow?: boolean;
  fontWeight?: any;
}

const Button = ({
  text,
  backgroundColor,
  textColor,
  onPress,
  borderWidth,
  borderColor,
  shadow = true,
  fontWeight = '500',
}: ButtonProps) => {
  const s = ButtonStyle;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...s.touchable,
        borderWidth,
        borderColor,
        backgroundColor,
        ...s.shadow,
        elevation: shadow ? 10 : 0,
        shadowOpacity: shadow ? 0.27 : 0,
      }}>
      <Text style={{...s.text, color: textColor, fontWeight}}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
