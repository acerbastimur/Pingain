/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import UserLoginStyle from './UserLogin.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';

interface UserLoginProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class UserRegister extends React.Component<UserLoginProps> {
  style = UserLoginStyle;

  references = [];

  constructor(props: UserLoginProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values: any) => {
    const {navigation} = this.props;
    navigation.navigate('UserNavigator');
  };

  public render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}>
        <View style={this.style.container}>
          <View style={this.style.logoContainer}>
            <Logo />
          </View>
          <View style={this.style.headerTextContainer}>
            <Text style={this.style.headerText}>Selam Pingainer</Text>
            <Text style={this.style.headerTextLight}>Hoşgeldin !</Text>
            <Text style={this.style.headerText2}>Seni gördüğümüze sevindik :)</Text>
          </View>
          <Formik
            validateOnMount
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()

                .required(),
              password: Yup.string()
                .min(6)
                .required(),
            })}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
              isValid,
              isSubmitting,
            }) => (
              <View style={this.style.formContainer}>
                <View style={this.style.inputContainer}>
                  <Text style={this.style.inputText}>Email</Text>
                  <Animatable.View
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'email')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'email',
                        ref,
                      });
                    }}>
                    <TextInput
                      style={this.style.input}
                      placeholder="Email giriniz"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        const passwordInput = this.references.filter(
                          t => t.name === 'passwordInput',
                        )[0].ref;

                        passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                    />

                    {!errors.email && touched.email ? (
                      <Image
                        source={require('../../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.inputContainer}>
                  <Text style={this.style.inputText}>Şifre</Text>
                  <Animatable.View
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'password')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'password',
                        ref,
                      });
                    }}>
                    <TextInput
                      style={this.style.input}
                      placeholder="Şifrenizi Giriniz"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      autoCapitalize="none"
                      secureTextEntry
                      returnKeyType="done"
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'passwordInput')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'passwordInput',
                          ref,
                        });
                      }}
                      onSubmitEditing={() => {
                        if (isValid) {
                          handleSubmit();
                          return;
                        }

                        if (errors.email) {
                          this.references.filter(t => t.name === 'email')[0].ref.shake();
                        }
                        if (errors.password) {
                          this.references.filter(t => t.name === 'password')[0].ref.shake();
                        }
                      }}
                    />

                    {!errors.password && touched.password ? (
                      <Image
                        source={require('../../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.buttonContainer}>
                  <Button
                    text="Giriş Yap"
                    backgroundColor={Colors.INFO}
                    textColor="#fff"
                    onPress={() => {
                      if (isValid) {
                        handleSubmit();
                        return;
                      }

                      if (errors.email) {
                        this.references.filter(t => t.name === 'email')[0].ref.shake();
                      }
                      if (errors.password) {
                        this.references.filter(t => t.name === 'password')[0].ref.shake();
                      }
                    }}
                  />
                </View>
                <View style={this.style.bottomFieldContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UserRegister');
                      console.log('User register button is pressed');
                    }}
                    style={this.style.loginTextContainer}>
                    <Text style={this.style.loginText}>
                      Pingainer değil misin? <Text style={this.style.underline}>Kayıt ol</Text>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ResetPassword');
                    }}>
                    <Text style={this.style.forgotPassword}>Şifremi unuttum</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
