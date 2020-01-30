/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions, NavigationScreenProp} from 'react-navigation';
import Logo from '../Logo';
import TabsHeaderStyle from './TabsHeader.style';

interface TabsHeaderProps {
  navigation: NavigationScreenProp<any, any>;
  rightButtonText?: string;
  rightEditIcon?: boolean;
  rightTextColor?: string;
  onRightPress?: () => void;
  onLeftPress?: () => void;
}
class TabsHeader extends React.Component<TabsHeaderProps> {
  s = TabsHeaderStyle;

  rightComponent = () => {
    const {rightButtonText, rightTextColor, rightEditIcon} = this.props;
    if (rightButtonText) {
      return <Text style={[this.s.buttonText, {color: rightTextColor}]}>{rightButtonText}</Text>;
    }
    if (rightEditIcon) {
      return <Image source={require('../../assets/image/editIcon.png')} style={this.s.image} />;
    }

    return (
      <Image source={require('../../assets/image/User/profileImage.png')} style={this.s.image} />
    );
  };

  leftComponent = () => {
    const {navigation, onLeftPress} = this.props;

    if (
      navigation.state.routeName === 'CampaignsHome' ||
      navigation.state.routeName === 'QrReadHome' ||
      navigation.state.routeName === 'PrizesHome' ||
      navigation.state.routeName === 'QrGenerateHome' ||
      navigation.state.routeName === 'Home'
    ) {
      return (
        <TouchableOpacity>
          <Image source={require('../../assets/image/User/searchIcon.png')} style={this.s.image} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={this.s.backButtonContainer}
        onPress={() => {
          console.log(navigation);
          onLeftPress();
          navigation.dispatch(NavigationActions.back());
        }}>
        <Image source={require('../../assets/image/backIcon.png')} style={this.s.backIcon} />
      </TouchableOpacity>
    );
  };

  render() {
    const {navigation, rightButtonText, onRightPress} = this.props;

    return (
      <View style={this.s.container}>
        {this.leftComponent()}
        <View style={this.s.logoContainer} pointerEvents="box-none">
          <Logo width={30} />
        </View>
        <TouchableOpacity
          style={[rightButtonText ? this.s.rightTextContainer : this.s.imageContainer]}
          onPress={onRightPress}>
          {this.rightComponent()}
        </TouchableOpacity>
      </View>
    );
  }
}
export default TabsHeader;
