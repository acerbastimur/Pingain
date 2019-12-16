/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Button from '../../common-components/Button';
import UserTypeSelectStyle from './UserTypeSelect.style';
import Colors from '../../styles/Colors';
import Logo from '../../common-components/Logo';

const UserTypeSelect = props => {
  const s = UserTypeSelectStyle;
  const x = new AbortController();
  x.abort();
  return (
    <View style={s.container}>
      <View style={s.logoContainer}>
        <Logo />
      </View>
      <View style={s.headerTextContainer}>
        <Text style={s.headerText}>
          <Text style={s.headerTextBold}>Pingain</Text>'e kayıt ol.
        </Text>
        <Text style={s.headerText}>
          Pinleri Topla <Text accessibilityRole="image">📌</Text>
        </Text>
        <Text style={s.headerText2}>Sana uygun olan profili seç</Text>
      </View>
      <View style={s.userFieldContainer}>
        <Text style={s.typeTextBold}>Merhaba Pingainer,</Text>
        <Text style={s.typeTextLight}>Aramıza hoşgeldin!</Text>
        <View style={s.buttonContainer}>
          <Button text="Pingainer Kayıt" backgorundColor={Colors.INFO} textColor="#fff" />
        </View>
        <View style={s.line} />
      </View>
      <View style={s.companyFieldContainer}>
        <Text style={s.typeTextBold}>İşletme iseniz,</Text>
        <Text style={s.typeTextLight}>Sizi böyle alalım!</Text>
        <View style={s.buttonContainer}>
          <Button text="İşletme Kayıt Ol" backgorundColor={Colors.COMPANY} textColor="#fff" />
        </View>
      </View>
    </View>
  );
};
export default UserTypeSelect;
