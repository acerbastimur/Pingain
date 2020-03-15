import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import UserRegisterStyle from './UserRegister.style';
import Colors from '../../../global/styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import RegisterService from '../../../services/user/Auth/Register.service';
import ModalContainer from '../../../common-components/ModalContainer';

interface UserRegisterProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface UserRegisterState {
  isErrorModalActive: boolean;
  loading: boolean;
}
get
interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
}
export default class UserRegister extends React.Component<UserRegisterProps, UserRegisterState> {
  style = UserRegisterStyle;

  references = [];

  constructor(props: UserRegisterProps) {
    super(props);
    this.state = { isErrorModalActive: false, loading: false };
  }

  handleSubmit = ({ email, password }: RegisterForm) => {
    this.setState({
      loading: true,
    });
    RegisterService.registerUserAuth(email, password)
      .then(() => {
        return null;
      })
      .catch(() => {
        this.setState({ loading: false });
        setTimeout(() => {
          this.setState({ isErrorModalActive: true });
        }, 1000);
      });
  };

  public render() {
    const { navigation } = this.props;
    const { isErrorModalActive, loading } = this.state;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 100, height: 100 }}
          source={require('../../../assets/image/loading.gif')}
        />
      </View>
    ) : (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        disableScrollViewPanResponder={false}
        scrollEnabled={false}
      >
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
              passwordConfirm: '',
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
            })}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
              isValid,
            }) => (
              <View style={this.style.formContainer}>
                <View style={[this.style.inputContainer, this.style.firstInputPadding]}>
                  <Text style={this.style.inputText}>Email</Text>
                  <Animatable.View
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'email')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'email',
                        ref,
                      });
                    }}
                  >
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
                          t => t.name === 'passwordInput',
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
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'password')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'password',
                        ref,
                      });
                    }}
                  >
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
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                      <FastImage
                        resizeMode="contain"
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
                    }}
                  >
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
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                      <FastImage
                        resizeMode="contain"
                        source={require('../../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <Text style={this.style.termsText}>
                  Pingain’e kayıt olarak geçerli{' '}
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        'https://sites.google.com/view/pingain-privacy-policy/ana-sayfa',
                      );
                    }}
                    style={this.style.underline}
                  >
                    sözleşmeleri
                  </Text>{' '}
                  kabul etmiş sayılırsınız.
                </Text>

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
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => {
                      navigation.navigate('UserLogin');
                    }}
                  >
                    <Text style={this.style.loginText}>
                      Pingain üyesiyim. <Text style={this.style.underline}>Giriş Yap</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
        <ModalContainer
          isVisible={isErrorModalActive}
          modalType={2}
          errorMessage="Bu email kullanılmakta"
          backButton={() => {
            this.setState({ isErrorModalActive: false });
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}
