import * as React from 'react';
import {View, Text, Image} from 'react-native';
import LogoStyle from './Logo.style';

const Logo = props => {
  const s = LogoStyle;

  return (
    <View style={s.container}>
      <Image source={require('../../assets/image/logo.png')} style={s.image} />
    </View>
  );
};
export default Logo;
 