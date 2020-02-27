/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import Button from '../../common-components/Button';
import AuthTypeSelectStyle from './AuthTypeSelect.style';
import Colors from '../../styles/Colors';
import Logo from '../../common-components/Logo';

interface AuthTypeSelectProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const AuthTypeSelect = (props: AuthTypeSelectProps) => {
  const s = AuthTypeSelectStyle;
  const { navigation } = props;
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
          <Button
            text="Pingainer Kayıt"
            backgroundColor={Colors.INFO}
            textColor="#fff"
            onPress={() => {
              navigation.navigate('UserRegister');
            }}
          />
        </View>
        <View style={s.line} />
      </View>
      <View style={s.companyFieldContainer}>
        <Text style={s.typeTextBold}>İşletme iseniz,</Text>
        <Text style={s.typeTextLight}>Sizi böyle alalım!</Text>
        <View style={s.buttonContainer}>
          <Button
            text="İşletme Kayıt Ol"
            backgroundColor={Colors.COMPANY}
            textColor="#fff"
            onPress={() => {
              navigation.navigate('CompanyRegister');
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default AuthTypeSelect;
