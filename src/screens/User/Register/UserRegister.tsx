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
import UserRegisterStyle from './UserRegister.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';

interface UserRegisterProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class UserRegister extends React.Component<UserRegisterProps> {
  style = UserRegisterStyle;

  references = [];

  constructor(props: UserRegisterProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  public render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        disableScrollViewPanResponder={false}
        scrollEnabled={false}>
        <View style={this.style.container}>
          <View style={this.style.logoContainer}>
            <Logo />
          </View>
          <View style={this.style.headerTextContainer}>
            <Text style={this.style.headerText}>Ödüllere ve İkramlara</Text>
            <Text style={this.style.headerTextLight}>Sadece bir adım kaldı</Text>
            <Text style={this.style.headerText2}>Doğru kararı vereceğini biliyorduk</Text>
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
              passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password')])
                .required(),
            })}>
            {({values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid}) => (
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
                      placeholder="Şifre Giriniz"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      autoCapitalize="none"
                      secureTextEntry
                      returnKeyType="next"
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'passwordInput')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'passwordInput',
                          ref,
                        });
                      }}
                      onSubmitEditing={() => {
                        const passwordInput = this.references.filter(
                          t => t.name === 'passwordConfirmInput',
                        )[0].ref;

                        passwordInput.focus();
                      }}
                      blurOnSubmit={false}
                    />
                    {!errors.password && touched.password ? (
                      <Image
                        source={require('../../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.inputContainer}>
                  <Text style={this.style.inputText}>Şifre Tekrar</Text>
                  <Animatable.View
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'passwordConfirm')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'passwordConfirm',
                        ref,
                      });
                    }}>
                    <TextInput
                      style={this.style.input}
                      placeholder="Şifre Giriniz"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      value={values.passwordConfirm}
                      onChangeText={handleChange('passwordConfirm')}
                      onBlur={() => setFieldTouched('passwordConfirm')}
                      autoCapitalize="none"
                      secureTextEntry
                      returnKeyType="done"
                      ref={ref => {
                        const isThere = this.references.filter(
                          t => t.name === 'passwordConfirmInput',
                        )[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'passwordConfirmInput',
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
                        if (errors.passwordConfirm) {
                          this.references.filter(t => t.name === 'passwordConfirm')[0].ref.shake();
                        }
                      }}
                    />
                    {!errors.passwordConfirm && touched.passwordConfirm ? (
                      <Image
                        source={require('../../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.buttonContainer}>
                  <Button
                    text="Kayıt Ol"
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
                      if (errors.passwordConfirm) {
                        this.references.filter(t => t.name === 'passwordConfirm')[0].ref.shake();
                      }
                    }}
                  />
                </View>
                <View style={this.style.loginTextContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UserLogin');
                    }}>
                    <Text style={this.style.loginText}>
                      Pingain üyesiyim. <Text style={this.style.underline}>Giriş Yap</Text>
                    </Text>
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
