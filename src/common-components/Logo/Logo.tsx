/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';
import LogoStyle from './Logo.style';

interface LogoProps {
  width?: number;
}
const Logo = ({width}: LogoProps) => {
  const s = LogoStyle;

  return (
    <View
      style={[
        s.container,
        {width: width || 52, height: width || 52, borderRadius: width ? width / 3 : 18},
      ]}>
      <FastImage
        style={[s.image, {width: width || 52, height: width || 52}]}
        resizeMode="contain"
        source={require('../../assets/image/logo.png')}
      />
    </View>
  );
};
export default Logo;
