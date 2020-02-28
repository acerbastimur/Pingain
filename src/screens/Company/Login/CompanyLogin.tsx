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
import {
  View, Text, TouchableOpacity, TextInput, ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import CompanyRegisterStyle from './CompanyLogin.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import LoginService from '../../../services/company/Auth/Login.service';
import ModalContainer from '../../../common-components/ModalContainer';

interface CompanyLoginProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface CompanyLoginState {
  isErrorModalActive: boolean;
  loading: boolean;
}

interface RegisterForm {
  email: string;
  password: string;
}

export default class CompanyLogin extends React.Component<CompanyLoginProps, CompanyLoginState> {
  style = CompanyRegisterStyle;

  references = [];

  constructor(props: CompanyLoginProps) {
    super(props);
    this.state = { isErrorModalActive: false, loading: false };
  }

  handleSubmit = ({ email, password }: RegisterForm) => {
    this.setState({
      loading: true,
    });
    LoginService.loginCompanyAuth(email, password)
      .then(() => null)
      .catch(() => {
        this.setState({ isErrorModalActive: true, loading: false });
      });
  };

  public render() {
    const { navigation } = this.props;
    const { isErrorModalActive, loading } = this.state;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={this.style.keyboardScrollContainer}
          scrollEnabled={false}>
          <View style={this.style.container}>
            <View style={this.style.logoContainer}>
              <Logo />
            </View>
            <View style={this.style.headerTextContainer}>
              <Text style={this.style.headerText}>Merhabalar</Text>
              <Text style={this.style.headerTextLight}>Pingain’e Hoşgeldiniz</Text>
              <Text style={this.style.headerText2}>İşinizi geliştirmek için sizinleyiz.</Text>
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
                values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid,
              }) => (
                  <View style={this.style.formContainer}>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>Email</Text>
                      <Animatable.View
                        ref={(ref) => {
                          const isThere = this.references.filter((t) => t.name === 'email')[0];
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
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                          onSubmitEditing={() => {
                            const passwordInput = this.references.filter(
                              (t) => t.name === 'passwordInput',
                            )[0].ref;

                            passwordInput.focus();
                          }}
                          blurOnSubmit={false}
                        />

                        {!errors.email && touched.email ? (
                          <FastImage
                            resizeMode="contain"
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>Şifre</Text>
                      <Animatable.View
                        ref={(ref) => {
                          const isThere = this.references.filter((t) => t.name === 'password')[0];
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
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                          ref={(ref) => {
                            const isThere = this.references.filter((t) => t.name === 'passwordInput')[0];
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
                              this.references.filter((t) => t.name === 'email')[0].ref.shake();
                            }
                            if (errors.password) {
                              this.references.filter((t) => t.name === 'password')[0].ref.shake();
                            }
                          }}
                        />

                        {!errors.password && touched.password ? (
                          <FastImage
                            resizeMode="contain"
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={this.style.buttonContainer}>
                      <Button
                        text="Giriş Yap"
                        backgroundColor={Colors.COMPANY}
                        textColor="#fff"
                        onPress={() => {
                          if (isValid) {
                            handleSubmit();
                            return;
                          }

                          if (errors.email) {
                            this.references.filter((t) => t.name === 'email')[0].ref.shake();
                          }
                          if (errors.password) {
                            this.references.filter((t) => t.name === 'password')[0].ref.shake();
                          }
                        }}
                      />
                    </View>
                    <View style={this.style.bottomFieldContainer}>
                      <TouchableOpacity
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}

                        onPress={() => {
                          navigation.navigate('CompanyRegister');
                        }}
                        style={this.style.loginTextContainer}>
                        <Text style={this.style.loginText}>
                          Pingain işletmesi değil misin ?{' '}
                          <Text style={this.style.underline}>Kayıt ol</Text>
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
          <ModalContainer
            isVisible={isErrorModalActive}
            modalType={2}
            errorMessage="Email veya şifre hatalı"
            backButton={() => {
              this.setState({ isErrorModalActive: false });
            }}
          />
        </KeyboardAwareScrollView>
      );
  }
}
