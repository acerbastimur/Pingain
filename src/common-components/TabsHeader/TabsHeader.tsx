import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import TabsHeaderStyle from './TabsHeader.style';
import Logo from '../Logo';

interface TabsHeaderProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const TabsHeader = (props: TabsHeaderProps) => {
  const s = TabsHeaderStyle;

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => {}}>
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
