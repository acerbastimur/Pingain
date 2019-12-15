import * as React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ButtonStyle from './Button.style';

interface ButtonProps {
  text: string;
  backgorundColor: string;
  textColor: string;
  borderWidth?: number;
  borderColor?: string;
}

const Button = (props: ButtonProps) => {
  const s = ButtonStyle;
  const {text, backgorundColor, textColor, borderWidth, borderColor} = props;

  return (
    <TouchableOpacity
      style={{...s.touchable, borderWidth, borderColor, backgroundColor: backgorundColor}}>
      <Text style={{...s.text, color: textColor}}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
