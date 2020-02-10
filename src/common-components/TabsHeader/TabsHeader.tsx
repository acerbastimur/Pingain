/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NavigationActions, NavigationScreenProp} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import {observer} from 'mobx-react';
import Logo from '../Logo';
import TabsHeaderStyle from './TabsHeader.style';
import RightIcon from './RightIcon';

interface TabsHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
  rightButtonText?: string;
  rightEditIcon?: boolean;
  rightTextColor?: string;
  onRightPress?: () => void;
  onLeftPress?: () => void;
}
@observer
class TabsHeader extends React.Component<TabsHeaderProps> {
  s = TabsHeaderStyle;

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
          <FastImage
            style={this.s.image}
            resizeMode="contain"
            source={require('../../assets/image/User/searchIcon.png')}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={this.s.backButtonContainer}
        onPress={() => {
          onLeftPress();
          navigation.dispatch(NavigationActions.back());
        }}>
        <FastImage
          style={this.s.backIcon}
          resizeMode="contain"
          source={require('../../assets/image/backIcon.png')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {rightButtonText, onRightPress, rightEditIcon, rightTextColor} = this.props;

    return (
      <View style={this.s.container}>
        {this.leftComponent()}
        <View style={this.s.logoContainer} pointerEvents="box-none">
          <Logo width={30} />
        </View>
        <TouchableOpacity
          style={[rightButtonText ? this.s.rightTextContainer : this.s.imageContainer]}
          onPress={onRightPress}>
          <RightIcon
            rightButtonText={rightButtonText}
            rightTextColor={rightTextColor}
            rightEditIcon={rightEditIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default TabsHeader;
