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
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
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
import FastImage from 'react-native-fast-image';
import UserDetailsEditStyle from './UserDetailsEdit.style';
import Colors from '../../../styles/Colors';
import Button from '../../../common-components/Button';
import TabsHeader from '../../../common-components/TabsHeader';
import CITIES from '../../../assets/constants/Cities';
import ImageUpload from '../../../common-components/ImageUpload';
import UserStore from '../../../stores/User.store';
import LoginService from '../../../services/user/Auth/Login.service';
import SetUserInfoService from '../../../services/user/Auth/SetUserInfo.service';

interface UserDetailsEditProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface UserDetailsEditState {
  loading: boolean;
}
interface UserDetailsForm {
  name: string;
  surname: string;
  password?: '';
  phoneNumber: string;
  city: string;
}

export default class UserDetailsEdit extends React.Component<
  UserDetailsEditProps,
  UserDetailsEditState
> {
  style = UserDetailsEditStyle;

  references = [];

  constructor(props: UserDetailsEditProps) {
    super(props);
    this.state = {loading: false};
  }

  handleSubmit = async ({name, surname, password, phoneNumber, city}: UserDetailsForm) => {
    if (password) {
      LoginService.setNewPassword(password);
    }

    const newUserLogo = UserStore.newCompanyLogoUri;
    this.setState({loading: true});
    await SetUserInfoService.updateUserDetails(name, surname, phoneNumber, city, newUserLogo).then(
      () => {
        this.setState({
          loading: false,
        });
      },
    );
  };

  public render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    const {name, surname, phoneNumber, city, profilePhoto} = UserStore.userDetails;
    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.pageContainer}>
        <View style={this.style.headerContainer}>
          <TabsHeader navigation={navigation} rightButtonText=" " onLeftPress={() => null} />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={this.style.keyboardScrollContainer}
          disableScrollViewPanResponder={false}
          scrollEnabled={false}>
          <ScrollView style={this.style.container}>
            <View style={this.style.ppContainer}>
              <ImageUpload
                hideText
                borderColor={Colors.SECONDARY}
                borderWidth={1}
                defaultImage={profilePhoto}
                userLogo
              />
            </View>

            <Formik
              initialValues={{
                name,
                surname,
                password: '',
                phoneNumber,
                city,
              }}
              validateOnMount
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(2)
                  .required(),
                surname: Yup.string()
                  .min(2)
                  .required(),

                password: Yup.string().min(6),
                phoneNumber: Yup.string()
                  .matches(/05(0[5-7]|[3-5]\d) ?\d{3} ?\d{4}$/g)
                  .required(),
                city: Yup.string().required(),
              })}>
              {({
                values,
                handleChange,
                errors,
                touched,
                setFieldTouched,
                validateForm,
                handleSubmit,
                isValid,
              }) => {
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
                          <FastImage
                            resizeMode="contain"
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
                            const phoneInput = this.references.filter(
                              t => t.name === 'phoneNumberInput',
                            )[0].ref;

                            phoneInput.focus();
                          }}
                          blurOnSubmit={false}
                        />
                        {!errors.surname && touched.surname ? (
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
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="*******"
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
                          <FastImage
                            resizeMode="contain"
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
                          <FastImage
                            resizeMode="contain"
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
                    <View style={this.style.buttonContainer}>
                      <Button
                        text="Devam"
                        backgroundColor={Colors.COMPANY}
                        textColor="#fff"
                        onPress={() => {
                          validateForm();
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
                          if (errors.password) {
                            this.references.filter(t => t.name === 'phoneNumber')[0].ref.shake();
                          }
                        }}
                      />
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
