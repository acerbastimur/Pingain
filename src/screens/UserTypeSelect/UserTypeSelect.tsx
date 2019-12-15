import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import Button from '../../common-components/Button';
import UserTypeSelectStyle from './UserTypeSelect.style';
import Colors from '../../styles/Colors';

const UserTypeSelect = props => {
  const s = UserTypeSelectStyle;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button text="Pingainer Kayıt" backgorundColor="#2D8EFF" textColor="#fff" />
    </View>
  );
};
export default UserTypeSelect;
