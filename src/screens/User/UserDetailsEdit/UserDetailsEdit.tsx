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
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-material-dropdown';
import UserDetailsEditStyle from './UserDetailsEdit.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import TabsHeader from '../../../common-components/TabsHeader';
import CITIES from '../../../assets/constants/Cities';
import ImageUpload from '../../../common-components/ImageUpload';

interface UserDetailsEditProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class UserDetailsEdit extends React.Component<UserDetailsEditProps> {
  style = UserDetailsEditStyle;

  values = {name: null, surname: null, email: null, password: null, phoneNumber: null};

  formErrors = null;

  isFormValid = false;

  references = [];

  constructor(props: UserDetailsEditProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    alert(JSON.stringify(this.values));
  };

  public render() {
    const {navigation} = this.props;
    return (
      <View style={this.style.pageContainer}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            rightButtonText="Kaydet"
            onPress={() => {
              /* navigation.navigate('UserDetails'); */

              if (this.isFormValid) {
                this.handleSubmit();
                return;
              }

              if (this.formErrors.name) {
                this.references.filter(t => t.name === 'name')[0].ref.shake();
              }
              if (this.formErrors.surname) {
                this.references.filter(t => t.name === 'surname')[0].ref.shake();
              }
              if (this.formErrors.email) {
                this.references.filter(t => t.name === 'email')[0].ref.shake();
              }
              if (this.formErrors.password) {
                this.references.filter(t => t.name === 'password')[0].ref.shake();
              }
              if (this.formErrors.phoneNumber) {
                this.references.filter(t => t.name === 'phoneNumber')[0].ref.shake();
              }
            }}
          />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={this.style.keyboardScrollContainer}
          disableScrollViewPanResponder={false}
          scrollEnabled={false}>
          <ScrollView style={this.style.container}>
            <View style={this.style.ppContainer}>
              {/*  <View style={this.style.ppOverflow}>
               
                <ImageUpload />
              </View> */}
              <ImageUpload
                hideText
                defaultImage="https://www.gazetemag.com/wp-content/uploads/2018/10/sebnem-ferah.jpg"
              />
            </View>

            <Formik
              validateOnMount
              initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                phoneNumber: '',
                city: '35',
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(2)
                  .required(),
                surname: Yup.string()
                  .min(2)
                  .required(),
                email: Yup.string()
                  .email()
                  .required(),
                password: Yup.string()
                  .min(6)
                  .required(),
                phoneNumber: Yup.string()
                  .matches(/05(0[5-7]|[3-5]\d) ?\d{3} ?\d{4}$/g)
                  .required(),
                city: Yup.string().required(),
              })}>
              {({values, handleChange, errors, touched, setFieldTouched, isValid}) => {
                this.values = values;
                this.formErrors = errors;
                this.isFormValid = isValid;

                return (
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
                          autoCapitalize="none"
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            const surnameInput = this.references.filter(
                              t => t.name === 'surnameInput',
                            )[0].ref;

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
                          placeholder="Soyisminizi Giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.surname}
                          onChangeText={handleChange('surname')}
                          onBlur={() => setFieldTouched('surname')}
                          autoCapitalize="none"
                          returnKeyType="next"
                          ref={ref => {
                            const isThere = this.references.filter(
                              t => t.name === 'surnameInput',
                            )[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'surnameInput',
                              ref,
                            });
                          }}
                          onSubmitEditing={() => {
                            const emailInput = this.references.filter(
                              t => t.name === 'emailInput',
                            )[0].ref;

                            emailInput.focus();
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
                          placeholder="Email Giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={() => setFieldTouched('email')}
                          autoCapitalize="none"
                          returnKeyType="next"
                          ref={ref => {
                            const isThere = this.references.filter(t => t.name === 'emailInput')[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'emailInput',
                              ref,
                            });
                          }}
                          onSubmitEditing={() => {
                            const passwordInput = this.references.filter(
                              t => t.name === 'passwordInput',
                            )[0].ref;

                            passwordInput.focus();
                          }}
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
                          returnKeyType="next"
                          secureTextEntry
                          ref={ref => {
                            const isThere = this.references.filter(
                              t => t.name === 'passwordInput',
                            )[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'passwordInput',
                              ref,
                            });
                          }}
                          onSubmitEditing={() => {
                            const phoneNumberInput = this.references.filter(
                              t => t.name === 'phoneNumberInput',
                            )[0].ref;

                            phoneNumberInput.focus();
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
                          placeholder="Telefon Numarası Giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.phoneNumber}
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={() => setFieldTouched('phoneNumber')}
                          autoCapitalize="none"
                          keyboardType="decimal-pad"
                          returnKeyType="done"
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
                        />
                        {!errors.phoneNumber && touched.phoneNumber ? (
                          <Image
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={[this.style.inputContainer, this.style.dropDownContainer]}>
                      <Text style={this.style.inputText}>İkamet Edilen İl</Text>
                      <Animatable.View>
                        <View style={this.style.dropdownComponentContainer}>
                          <Dropdown
                            value={values.city}
                            onChangeText={handleChange('city')}
                            data={CITIES}
                            containerStyle={this.style.dropdownContainer}
                            itemTextStyle={this.style.dropdownText}
                            textColor={Colors.SECONDARY}
                            fontSize={14}
                          />
                        </View>
                      </Animatable.View>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
