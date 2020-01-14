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

import ImageUploadStyle from './ImageUpload.style';

export interface ImageUploadProps {
  defaultImage?: any;
  hideText?: boolean;
  borderColor?: string;
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
      console.log('Response = ', response);

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
      }
    });
  };

  constructor(props: ImageUploadProps) {
    super(props);
    this.state = {
      imageSource: props.defaultImage ? props.defaultImage : null,
    };
  }

  public render() {
    const {imageSource} = this.state;
    const {hideText, defaultImage, borderColor} = this.props;
    console.log(imageSource);

    return (
      <View style={this.s.container}>
        <TouchableOpacity
          style={[this.s.box, {borderWidth: defaultImage ? 1 : 4}, {borderColor}]}
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
