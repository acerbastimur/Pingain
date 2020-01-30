/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/sort-comp */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import ImageUploadStyle from './ImageUpload.style';
import CompanyStore from '../../stores/Company.store';
import UserStore from '../../stores/User.store';

export interface ImageUploadProps {
  defaultImage?: any;
  hideText?: boolean;
  borderColor?: string;
  borderWidth?: number;
  companyLogo?: boolean;
  userLogo?: boolean;
}

export interface ImageUploadState {
  imageSource: string;
}

export default class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
  s = ImageUploadStyle;

  options = {
    title: 'Profil fotoğrafı seçin',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  pickImage = () => {
    ImagePicker.showImagePicker(this.options, response => {
      const {companyLogo, userLogo} = this.props;

      // console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source,
        });

        if (companyLogo) {
          CompanyStore.newCompanyLogoUri = source;
          //  console.log(CompanyStore);
        }
        if (userLogo) {
          UserStore.newCompanyLogoUri = source;
        }
      }
    });
  };

  constructor(props: ImageUploadProps) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  componentDidMount() {
    const {defaultImage} = this.props;
    console.log('image upload mounted', defaultImage);

    if (!defaultImage) return;

    storage()
      .ref()
      .child(defaultImage)
      .getDownloadURL()
      .then(url => {
        this.setState({imageSource: url});
      });
  }

  public render() {
    const {imageSource} = this.state;
    const {hideText, defaultImage, borderWidth, borderColor} = this.props;

    return (
      <View style={this.s.container}>
        <TouchableOpacity
          style={[
            this.s.box,
            {borderWidth: defaultImage ? 1 : 4},
            {borderWidth: borderWidth || 4},
            {borderColor},
          ]}
          onPress={this.pickImage}>
          {imageSource ? (
            <Image source={{uri: imageSource}} style={this.s.profilePhoto} />
          ) : (
            <Image source={require('../../assets/image/plus.png')} style={this.s.plus} />
          )}
        </TouchableOpacity>
        {hideText ? null : <Text style={this.s.text}>Profil fotoğrafınızı yükleyin</Text>}
      </View>
    );
  }
}
