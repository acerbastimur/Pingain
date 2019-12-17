/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserRegisterStyle from './UserLogin.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';

interface UserRegisterProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class UserRegister extends React.Component<UserRegisterProps> {
  style = UserRegisterStyle;

  constructor(props: UserRegisterProps) {
    super(props);
    this.state = {};
  }

  inputComponent = (header: string) => (
    <View style={this.style.inputContainer}>
      <Text style={this.style.inputText}>Email</Text>
      <View>
        <TextInput
          style={this.style.input}
          placeholder="Email giriniz"
          placeholderTextColor={Colors.SECONDARY}
          selectionColor={Colors.PRIMARY}
        />
        <Image source={require('../../../assets/image/tick.png')} style={this.style.image} />
      </View>
    </View>
  );

  public render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={this.style.keyboardScrollContainer}>
        <View style={this.style.container}>
          <View style={this.style.logoContainer}>
            <Logo />
          </View>
          <View style={this.style.headerTextContainer}>
            <Text style={this.style.headerText}>Selam Pingainer</Text>
            <Text style={this.style.headerTextLight}>Hoşgeldin !</Text>
            <Text style={this.style.headerText2}>Seni gördüğümüze sevindik :)</Text>
          </View>
          <View style={this.style.formContainer}>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Email</Text>
              <View>
                <TextInput
                  style={this.style.input}
                  placeholder="Email giriniz"
                  placeholderTextColor={Colors.SECONDARY}
                  selectionColor={Colors.PRIMARY}
                />
                <Image
                  source={require('../../../assets/image/tick.png')}
                  style={this.style.image}
                />
              </View>
            </View>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Şifre</Text>
              <View>
                <TextInput
                  style={this.style.input}
                  placeholder="Şifre Giriniz"
                  placeholderTextColor={Colors.SECONDARY}
                  selectionColor={Colors.PRIMARY}
                />
                <Image
                  source={require('../../../assets/image/tick.png')}
                  style={this.style.image}
                />
              </View>
            </View>
            <View style={this.style.buttonContainer}>
              <Button
                text="Giriş Yap"
                backgorundColor={Colors.INFO}
                textColor="#fff"
                onPress={() => {
                  console.log('User register');
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserRegister');
              }}
              style={this.style.loginTextContainer}>
              <Text style={this.style.loginText}>
                Pingainer değil misin? <Text style={this.style.underline}>Kayıt ol</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
