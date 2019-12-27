import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import TabsHeaderStyle from './TabsHeader.style';
import Logo from '../Logo';
 
const TabsHeader = props => {
  const s = TabsHeaderStyle;

  return (
    <View style={s.container}>
      <TouchableOpacity>
        <Image source={require('../../assets/image/User/searchIcon.png')} style={s.image} />
      </TouchableOpacity>

      <Logo width={30} />
      <TouchableOpacity>
        <Image source={require('../../assets/image/User/profileImage.png')} style={s.image} />
      </TouchableOpacity>
    </View>
  );
};
export default TabsHeader;
