/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import TabsHeaderStyle from './TabsHeader.style';
import Logo from '../Logo';

interface TabsHeaderProps {
  navigation: NavigationScreenProp<any, any>;
  rightButtonText?: string;
  rightEditIcon?: boolean;
  onPress: () => void;
}
const TabsHeader = ({navigation, rightButtonText, rightEditIcon, onPress}: TabsHeaderProps) => {
  const s = TabsHeaderStyle;
  const rightComponent = () => {
    if (rightButtonText) {
      return <Text style={s.buttonText}>{rightButtonText}</Text>;
    }
    if (rightEditIcon) {
      return <Image source={require('../../assets/image/editIcon.png')} style={s.image} />;
    }

    return <Image source={require('../../assets/image/User/profileImage.png')} style={s.image} />;
  };

  console.log(navigation.dangerouslyGetParent().state);

  return (
    <View style={s.container}>
      <TouchableOpacity>
        <Image source={require('../../assets/image/User/searchIcon.png')} style={s.image} />
      </TouchableOpacity>

      <Logo width={30} />
      <TouchableOpacity
        style={[rightButtonText ? s.rightTextContainer : s.imageContainer]}
        onPress={onPress}>
        {rightComponent()}
      </TouchableOpacity>
    </View>
  );
};
export default TabsHeader;
