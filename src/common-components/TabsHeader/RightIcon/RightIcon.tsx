/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import RightIconStyle from './RightIcon.style';
import GeneralStore from '../../../stores/General.store';
import AuthRole from '../../../schemes/general/AuthRole.enum';
import CompanyStore from '../../../stores/Company.store';
import UserStore from '../../../stores/User.store';

interface RightIconProps {
  width?: number;
  rightButtonText: string;
  rightTextColor: string;
  rightEditIcon: boolean;
}

@observer
export default class RightIcon extends React.Component<RightIconProps> {
  s = RightIconStyle;

  render() {
    const {rightButtonText, rightTextColor, rightEditIcon} = this.props;
    if (rightButtonText) {
      return <Text style={[this.s.buttonText, {color: rightTextColor}]}>{rightButtonText}</Text>;
    }
    if (rightEditIcon) {
      return (
        <FastImage
          style={this.s.image}
          resizeMode="contain"
          source={require('../../../assets/image/editIcon.png')}
        />
      );
    }
    const {authRole} = GeneralStore;

    if (authRole === AuthRole.Company) {
      return CompanyStore?.companyLogo ? (
        <FastImage
          style={this.s.image}
          resizeMode="contain"
          source={{uri: CompanyStore.companyLogo}}
        />
      ) : null;
    }
    return UserStore?.profilePhoto ? (
      <FastImage style={this.s.image} resizeMode="contain" source={{uri: UserStore.profilePhoto}} />
    ) : null;
  }
}
