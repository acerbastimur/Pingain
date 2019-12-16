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
  backgorundColor: string;
  textColor: string;
  onPress?: () => void;
  borderWidth?: number;
  borderColor?: string;
}

const Button = (props: ButtonProps) => {
  const s = ButtonStyle;
  const {text, backgorundColor, textColor, borderWidth, borderColor, onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...s.touchable, borderWidth, borderColor, backgroundColor: backgorundColor}}>
      <Text style={{...s.text, color: textColor}}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
