/* eslint-disable eslint-comments/disable-enable-pair */
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

import ImageUploadStyle from './ImageUpload.style';

const ImageUpload = () => {
  const s = ImageUploadStyle;

  return (
    <View style={s.container}>
      <TouchableOpacity style={s.box}>
        <Image source={require('../../assets/image/plus.png')} style={s.plus} />
      </TouchableOpacity>
      <Text style={s.text}>Profil fotoğrafınızı yükleyin</Text>
    </View>
  );
};
export default ImageUpload;
