/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationActions, NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';
import Logo from '../Logo';
import TabsHeaderStyle from './TabsHeader.style';
import RightIcon from './RightIcon';
import GeneralStore from '../../stores/General.store';
import AuthRole from '../../schemes/general/AuthRole.enum';
import CompanyStore from '../../stores/Company.store';

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
    const { navigation, onLeftPress } = this.props;

    if (
      navigation.state.routeName === 'CampaignsHome'
      || (navigation.state.routeName === 'QrReadHome' && GeneralStore.authRole === AuthRole.User)
      || navigation.state.routeName === 'PrizesHome'

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

    if (navigation.state.routeName === 'QrReadHome'
      || navigation.state.routeName === 'QrGenerateHome'
      || navigation.state.routeName === 'Home'
    ) {
      const {
        address, companyFeatures, city, companyImages, phoneNumber, companyLogo,
      } = CompanyStore.companyDetails;
      const profileState = address && companyFeatures && city && companyImages && phoneNumber && companyLogo;

      if (profileState) {
        return (
          <View style={this.s.stateWrapper}>
            <View style={this.s.activeDot} />
            <Text style={this.s.stateText}>Aktif</Text>
          </View>
        );
      }

      return (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={this.s.stateWrapper} onPress={() => navigation.navigate('CompanyDetailsEdit')}>
          <View style={this.s.passiveDot} />
          <Text style={this.s.stateText}>Pasif</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={this.s.backButtonContainer}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}

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
    const {
      rightButtonText, onRightPress, rightEditIcon, rightTextColor,
    } = this.props;

    return (
      <View style={this.s.container}>
        {this.leftComponent()}
        <View style={this.s.logoContainer} pointerEvents="box-none">
          <Logo width={30} />
        </View>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}

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
