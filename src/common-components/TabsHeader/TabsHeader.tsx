/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationActions,
  StackActions,
} from 'react-navigation';
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
    }2
    if (rightEditIcon) {
      return <Image source={require('../../assets/image/editIcon.png')} style={s.image} />;
    }

    return <Image source={require('../../assets/image/User/profileImage.png')} style={s.image} />;
  };
  const leftComponent = () => {
    if (
      navigation.state.routeName === 'CampaignsHome' ||
      navigation.state.routeName === 'QrReadHome' ||
      navigation.state.routeName === 'PrizesHome'
    ) {
      return (
        <TouchableOpacity>
          <Image source={require('../../assets/image/User/searchIcon.png')} style={s.image} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={s.backButtonContainer}
        onPress={() => {
          console.log(navigation);

          navigation.dispatch(NavigationActions.back());
        }}>
        <Image source={require('../../assets/image/backIcon.png')} style={s.backIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.container}>
      {leftComponent()}
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
