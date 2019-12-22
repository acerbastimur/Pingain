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
import GetUserInfoStyle from './GetUserInfo.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import ImageUpload from '../../../common-components/ImageUpload';

interface GetUserInfoProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class UserRegister extends React.Component<GetUserInfoProps> {
  style = GetUserInfoStyle;

  references = [];

  constructor(props: GetUserInfoProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  public render() {
    const {navigation} = this.props;
    setTimeout(() => {
      console.log('references', this.references);
    }, 1000);
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}>
        <View style={this.style.container}>
          <View style={this.style.uploadPhotoContainer}>
            <ImageUpload />
          </View>
          <View style={this.style.inputsContainer}>
            <Formik
              validateOnMount
              initialValues={{
                name: '',
                surname: '',
                phoneNumber: '',
                instagramAccount: '',
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(2)
                  .required(),
                surname: Yup.string()
                  .min(2)
                  .required(),
                phoneNumber: Yup.string()
                  .matches(/05(0[5-7]|[3-5]\d) ?\d{3} ?\d{4}$/g)
                  .required(),
                instagramAccount: Yup.string().min(2),
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
                    <Text style={this.style.inputText}>İsim</Text>
                    <Animatable.View
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'name')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'name',
                          ref,
                        });
                      }}>
                      <TextInput
                        style={this.style.input}
                        placeholder="İsminizi giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          const surnameInput = this.references.filter(
                            t => t.name === 'surnameInput',
                          )[0].ref;
                          console.log(surnameInput);

                          surnameInput.focus();
                        }}
                        blurOnSubmit={false}
                      />

                      {!errors.name && touched.name ? (
                        <Image
                          source={require('../../../assets/image/tick.png')}
                          style={this.style.image}
                        />
                      ) : null}
                    </Animatable.View>
                  </View>
                  <View style={this.style.inputContainer}>
                    <Text style={this.style.inputText}>Soyisim</Text>
                    <Animatable.View
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'surname')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'surname',
                          ref,
                        });
                      }}>
                      <TextInput
                        style={this.style.input}
                        placeholder="Soyisminizi giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.surname}
                        onChangeText={handleChange('surname')}
                        onBlur={() => setFieldTouched('surname')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'surnameInput')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'surnameInput',
                            ref,
                          });
                        }}
                        onSubmitEditing={() => {
                          const phoneNumberInput = this.references.filter(
                            t => t.name === 'phoneNumberInput',
                          )[0].ref;

                          phoneNumberInput.focus();
                        }}
                        blurOnSubmit={false}
                      />

                      {!errors.surname && touched.surname ? (
                        <Image
                          source={require('../../../assets/image/tick.png')}
                          style={this.style.image}
                        />
                      ) : null}
                    </Animatable.View>
                  </View>
                  <View style={this.style.inputContainer}>
                    <Text style={this.style.inputText}>Telefon Numarası</Text>
                    <Animatable.View
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'phoneNumber')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'phoneNumber',
                          ref,
                        });
                      }}>
                      <TextInput
                        style={this.style.input}
                        placeholder="Telefon numaranızı giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={() => setFieldTouched('phoneNumber')}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        ref={ref => {
                          const isThere = this.references.filter(
                            t => t.name === 'phoneNumberInput',
                          )[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'phoneNumberInput',
                            ref,
                          });
                        }}
                        onSubmitEditing={() => {
                          const instagramAccountInput = this.references.filter(
                            t => t.name === 'instagramAccount',
                          )[0].ref;

                          instagramAccountInput.focus();
                        }}
                        blurOnSubmit={false}
                      />

                      {!errors.phoneNumber && touched.phoneNumber ? (
                        <Image
                          source={require('../../../assets/image/tick.png')}
                          style={this.style.image}
                        />
                      ) : null}
                    </Animatable.View>
                  </View>
                  <View style={this.style.inputContainer}>
                    <Text style={this.style.inputText}>Instagram Hesabı</Text>
                    <Animatable.View
                      ref={ref => {
                        const isThere = this.references.filter(
                          t => t.name === 'instagramAccount',
                        )[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'instagramAccount',
                          ref,
                        });
                      }}>
                      <TextInput
                        style={this.style.input}
                        placeholder="Instagram hesabınızın linkini giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.instagramAccount}
                        onChangeText={handleChange('instagramAccount')}
                        onBlur={() => setFieldTouched('instagramAccount')}
                        autoCapitalize="none"
                        returnKeyType="done"
                        ref={ref => {
                          const isThere = this.references.filter(
                            t => t.name === 'instagramAccountInput',
                          )[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'instagramAccountInput',
                            ref,
                          });
                        }}
                        onSubmitEditing={() => {
                          if (isValid) {
                            handleSubmit();
                            return;
                          }

                          if (errors.name) {
                            this.references.filter(t => t.name === 'name')[0].ref.shake();
                          }
                          if (errors.surname) {
                            this.references.filter(t => t.name === 'surname')[0].ref.shake();
                          }
                          if (errors.phoneNumber) {
                            this.references.filter(t => t.name === 'phoneNumber')[0].ref.shake();
                          }
                          if (errors.instagramAccount) {
                            this.references
                              .filter(t => t.name === 'instagramAccount')[0]
                              .ref.shake();
                          }
                        }}
                      />

                      {!errors.instagramAccount && touched.instagramAccount ? (
                        <Image
                          source={require('../../../assets/image/tick.png')}
                          style={this.style.image}
                        />
                      ) : null}
                    </Animatable.View>
                  </View>
                  <View style={this.style.buttonContainer}>
                    <Button
                      text="Devam"
                      backgroundColor={Colors.INFO}
                      textColor="#fff"
                      onPress={() => {
                        console.log(isValid, errors);

                        if (isValid) {
                          handleSubmit();
                          return;
                        }

                        if (errors.name) {
                          this.references.filter(t => t.name === 'name')[0].ref.shake();
                        }
                        if (errors.surname) {
                          this.references.filter(t => t.name === 'surname')[0].ref.shake();
                        }
                        if (errors.phoneNumber) {
                          this.references.filter(t => t.name === 'phoneNumber')[0].ref.shake();
                        }
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
      /*  <KeyboardAwareScrollView
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
      </KeyboardAwareScrollView> */
    );
  }
}
