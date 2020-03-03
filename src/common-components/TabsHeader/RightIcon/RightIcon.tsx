/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
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

interface RightIconState {
  isLoadingImage: boolean;
}

@observer
export default class RightIcon extends React.Component<RightIconProps, RightIconState> {
  s = RightIconStyle;

  constructor(props: RightIconProps) {
    super(props);
    this.state = {
      isLoadingImage: true,
    };
  }

  render() {
    const { rightButtonText, rightTextColor, rightEditIcon } = this.props;
    const { profilePhoto } = UserStore;
    const { isLoadingImage } = this.state;

    if (rightButtonText) {
      return <Text style={[this.s.buttonText, { color: rightTextColor }]}>{rightButtonText}</Text>;
    }
    if (rightEditIcon) {
      return (
        <FastImage
          style={this.s.image}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/image/editIcon.png')}
        />
      );
    }
    const { authRole } = GeneralStore;

    if (authRole === AuthRole.Company) {
      return CompanyStore?.companyLogo ? (
        <FastImage
          style={[this.s.image, this.s.companyLogo]}
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: CompanyStore.companyLogo }}
          onLoadEnd={() => {
            this.setState({
              isLoadingImage: false,
            });
          }}
        >
          <View style={this.s.loadingCenter}>
            <ActivityIndicator animating={isLoadingImage} />
          </View>
        </FastImage>
      ) : null;
    }

    return profilePhoto ? (
      <FastImage
        style={[this.s.image, this.s.profileImage]}
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: profilePhoto }}
        onLoadEnd={() => {
          this.setState({
            isLoadingImage: false,
          });
        }}
      >
        <View style={this.s.loadingCenter}>
          <ActivityIndicator animating={isLoadingImage} />
        </View>
      </FastImage>
    ) : null;
  }
}
