import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import ImageUploadStyle from './ImageUpload.style';

export interface AppProps {}

export interface AppState {
  imageSource: string;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  s = ImageUploadStyle;

  options = {
    title: 'Profil fotoğrafı seçin',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  constructor(props: AppProps) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

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

  public render() {
    const {imageSource} = this.state;
    console.log(imageSource);

    return (
      <View style={this.s.container}>
        <TouchableOpacity style={this.s.box} onPress={this.pickImage}>
          {imageSource ? (
            <Image source={{uri: imageSource}} style={this.s.profilePhoto} />
          ) : (
            <Image source={require('../../assets/image/plus.png')} style={this.s.plus} />
          )}
        </TouchableOpacity>
        <Text style={this.s.text}>Profil fotoğrafınızı yükleyin</Text>
      </View>
    );
  }
}
