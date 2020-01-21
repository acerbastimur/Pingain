/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable eslint-comments/no-duplicate-disable */
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
import GetCompanyInfoStyle from './GetCompanyInfo.style';
import Colors from '../../../styles/Colors';
import Logo from '../../../common-components/Logo';
import Button from '../../../common-components/Button';
import ImageUpload from '../../../common-components/ImageUpload';
import SetCompanyInfoService from '../../../services/company/Auth/SetCompanyInfo.service';

interface GetCompanyInfoProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class GetCompanyInfo extends React.Component<GetCompanyInfoProps> {
  style = GetCompanyInfoStyle;

  references = [];

  constructor(props: GetCompanyInfoProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (
    name: string,
    companyName: string,
    phoneNumber: string,
    instagramAccount: string,
  ) => {
    SetCompanyInfoService.SetCompanyInfo(name, companyName, phoneNumber, instagramAccount).then(
      () => {
        console.log('WRITTEN');
      },
    );
  };

  public render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}>
        <View style={this.style.container}>
          <View style={this.style.uploadPhotoContainer}>
            <View style={this.style.uploadPhotoItem}>
              <ImageUpload />
            </View>
          </View>
          <View style={this.style.inputsContainer}>
            <Formik
              validateOnMount
              initialValues={{
                name: '',
                companyName: '',
                phoneNumber: '',
                instagramAccount: '',
              }}
              onSubmit={({name, companyName, phoneNumber, instagramAccount}) =>
                this.handleSubmit(name, companyName, phoneNumber, instagramAccount)
              }
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(2)
                  .required(),
                companyName: Yup.string()
                  .min(2)
                  .required(),
                phoneNumber: Yup.string()
                  .matches(/0[2-5](0[5-7]|[3-5]\d) ?\d{3} ?\d{4}$/g)
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
                    <Text style={this.style.inputText}>İşletme Yetkilisi</Text>
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
                        placeholder="İsim Soyisim"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.name}
                        maxLength={30}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          const companyNameInput = this.references.filter(
                            t => t.name === 'companyNameInput',
                          )[0].ref;
                          console.log(companyNameInput);

                          companyNameInput.focus();
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
                    <Text style={this.style.inputText}>İşletme Adı</Text>
                    <Animatable.View
                      ref={ref => {
                        const isThere = this.references.filter(t => t.name === 'companyName')[0];
                        if (isThere) return;
                        this.references.push({
                          name: 'companyName',
                          ref,
                        });
                      }}>
                      <TextInput
                        style={this.style.input}
                        placeholder="İşletme adını giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.companyName}
                        maxLength={30}
                        onChangeText={handleChange('companyName')}
                        onBlur={() => setFieldTouched('companyName')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        ref={ref => {
                          const isThere = this.references.filter(
                            t => t.name === 'companyNameInput',
                          )[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'companyNameInput',
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

                      {!errors.companyName && touched.companyName ? (
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
                        placeholder="İşletmenin telefon numarasını giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.phoneNumber}
                        maxLength={11}
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
                            t => t.name === 'instagramAccountInput',
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
                        maxLength={20}
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
                          if (errors.companyName) {
                            this.references.filter(t => t.name === 'companyName')[0].ref.shake();
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
                      backgroundColor={Colors.COMPANY}
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
                        if (errors.companyName) {
                          this.references.filter(t => t.name === 'companyName')[0].ref.shake();
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
    );
  }
}
