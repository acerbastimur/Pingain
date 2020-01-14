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
import {View, Text, Image, TextInput} from 'react-native';
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
import CompanyDetailsEditStyle from './CompanyDetailsEdit.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import TabsHeader from '../../../common-components/TabsHeader';
import CITIES from '../../../assets/constants/Cities';
import ImageUpload from '../../../common-components/ImageUpload';

interface CompanyDetailsEditProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class CompanyDetailsEdit extends React.Component<CompanyDetailsEditProps> {
  style = CompanyDetailsEditStyle;

  values = {
    cmpName: '',
    managerName: '',
    phoneNumber: '',
    instaAccount: '',
    address: '',
    city: '35',
    password: '',
    cmpFeatures: [],
  };

  formErrors = null;

  isFormValid = false;

  references = [];

  constructor(props: CompanyDetailsEditProps) {
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
            rightTextColor={Colors.COMPANY}
            onLeftPress={() => {
              navigation.navigate('Home');
            }}
            onRightPress={() => {
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
          scrollEnabled>
          <ScrollView style={this.style.container}>
            <View style={this.style.listHeader}>
              <Text style={this.style.listHeaderTextLight}>İşletmenizi Yansıtacak</Text>
              <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
                İşletme Profili
              </Text>
            </View>
            <View style={this.style.ppContainer}>
              <ImageUpload
                hideText
                borderColor={Colors.COMPANY}
                defaultImage="https://www.gazetemag.com/wp-content/uploads/2018/10/sebnem-ferah.jpg"
              />
            </View>

            <Formik
              validateOnMount
              initialValues={{
                cmpName: '',
                managerName: '',
                phoneNumber: '',
                instaAccount: '',
                address: '',
                city: '35',
                password: '',
                cmpFeatures: [],
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                cmpName: Yup.string()
                  .min(2)
                  .required(),
                managerName: Yup.string()
                  .min(2)
                  .required(),
                phoneNumber: Yup.string().required(),
                instaAccount: Yup.string()
                  .min(2)
                  .required(),
                address: Yup.string()
                  .min(8)
                  .required(),
                city: Yup.string().required(),
                password: Yup.string()
                  .min(6)
                  .required(),
                cmpFeatures: Yup.array(),
              })}>
              {({values, handleChange, errors, touched, setFieldTouched, isValid}) => {
                this.values = values;
                this.formErrors = errors;
                this.isFormValid = isValid;

                return (
                  <View style={this.style.formContainer}>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>İşletme Adı</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'cmpName')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'cmpName',
                            ref,
                          });
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="İşletme Adını Giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.cmpName}
                          onChangeText={handleChange('cmpName')}
                          onBlur={() => setFieldTouched('cmpName')}
                          autoCapitalize="words"
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            const nextInput = this.references.filter(
                              t => t.name === 'managerNameInput',
                            )[0].ref;
                            nextInput.focus();
                          }}
                          blurOnSubmit={false}
                        />
                        {!errors.cmpName && touched.cmpName ? (
                          <Image
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>İşletme Yetkilisi</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'managerName')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'managerName',
                            ref,
                          });
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="İsminizi Giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.managerName}
                          onChangeText={handleChange('managerName')}
                          onBlur={() => setFieldTouched('managerName')}
                          autoCapitalize="words"
                          returnKeyType="next"
                          ref={ref => {
                            const isThere = this.references.filter(
                              t => t.name === 'managerNameInput',
                            )[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'managerNameInput',
                              ref,
                            });
                          }}
                          onSubmitEditing={() => {
                            const nextInput = this.references.filter(
                              t => t.name === 'phoneNumberInput',
                            )[0].ref;

                            nextInput.focus();
                          }}
                          blurOnSubmit={false}
                        />
                        {!errors.managerName && touched.managerName ? (
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
                          placeholder="Telefon"
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
                            const nextInput = this.references.filter(
                              t => t.name === 'instaAccountInput',
                            )[0].ref;

                            nextInput.focus();
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
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>Instagram Hesabı</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'instaAccount')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'instaAccount',
                            ref,
                          });
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="instagram.com/xxx"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.instaAccount}
                          onChangeText={handleChange('instaAccount')}
                          onBlur={() => setFieldTouched('instaAccount')}
                          autoCapitalize="none"
                          returnKeyType="done"
                          ref={ref => {
                            const isThere = this.references.filter(
                              t => t.name === 'instaAccountInput',
                            )[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'instaAccountInput',
                              ref,
                            });
                          }}
                          onSubmitEditing={() => {
                            const nextInput = this.references.filter(
                              t => t.name === 'addressInput',
                            )[0].ref;

                            nextInput.focus();
                          }}
                        />
                        {!errors.instaAccount && touched.instaAccount ? (
                          <Image
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>Adresi</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'adress')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'adress',
                            ref,
                          });
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="Adresinizin Google Haritalar linkini girinizi"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.address}
                          onChangeText={handleChange('adress')}
                          onBlur={() => setFieldTouched('adress')}
                          autoCapitalize="words"
                          returnKeyType="done"
                          ref={ref => {
                            const isThere = this.references.filter(
                              t => t.name === 'addressInput',
                            )[0];
                            if (isThere) return;
                            this.references.push({
                              name: 'addressInput',
                              ref,
                            });
                          }}
                        />
                        {!errors.address && touched.address ? (
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
                          keyboardType="decimal-pad"
                          returnKeyType="done"
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
                      <Text style={this.style.inputText}>Şifre</Text>

                      <View style={this.style.featuresContainer}>
                        <CheckBox style={{width:50,height:50}} value={false} />
                      </View>
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
