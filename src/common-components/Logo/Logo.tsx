import * as React from 'react';
import {View, Text, Image} from 'react-native';
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
      <Image
        source={require('../../assets/image/logo.png')}
        style={[s.image, {width: width || 52, height: width || 52}]}
      />
    </View>
  );
};
export default Logo;
