import * as React from 'react';
import {View, Text, Image} from 'react-native';
import TabsHeaderStyle from './TabsHeader.style';
import Logo from '../Logo';

const TabsHeader = props => {
  const s = TabsHeaderStyle;

  return (
    <View  style={s.container}>
      <Image
        source={require('../../assets/image/User/searchIcon.png')}
        style={{width: 25, height: 25}}
      />
      <Logo width={30} />
      <Image
        source={require('../../assets/image/User/profileImage.png')}
        style={{width: 25, height: 25}}
      />
    </View>
  );
};
export default TabsHeader;
