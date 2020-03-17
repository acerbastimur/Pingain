import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import GetCompanyInfoStyle from './GetCompanyInfo.style';
import Colors from '../../../global/styles/Colors';
import Button from '../../../common-components/Button';
import ImageUpload from '../../../common-components/ImageUpload';
import SetCompanyInfoService from '../../../services/company/Auth/SetCompanyInfo.service';

interface GetCompanyInfoProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface GetCompanyInfoState {
  isLoading: boolean;
}

export default class GetCompanyInfo extends React.Component<
  GetCompanyInfoProps,
  GetCompanyInfoState
> {
  style = GetCompanyInfoStyle;

  imageUploadRef = null;

  references = [];

  constructor(props: GetCompanyInfoProps) {
    super(props);
    this.state = { isLoading: false };
  }

  handleSubmit = (
    name: string,
    companyName: string,
    phoneNumber: string,
    instagramAccount: string,
  ) => {
    const { navigation } = this.props;
    const logoUri = this.imageUploadRef.state.imageSource;
    this.setState({ isLoading: true });
    SetCompanyInfoService.setCompanyInfo(
      name,
      companyName,
      phoneNumber,
      instagramAccount,
      logoUri,
    ).then(() => {
      navigation.navigate('CompanyTabNavigation');
    });
  };

  public render() {
    const { isLoading } = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}
      >
        {isLoading ? (
          <View style={this.style.indicatorContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 100, height: 100 }}
              source={require('../../../assets/image/loading.gif')}
            />
          </View>
        ) : (
          <View style={this.style.container}>
            <View style={this.style.uploadPhotoContainer}>
              <Animatable.View
                ref={ref => {
                  const isThere = this.references.filter(t => t.name === 'image')[0];
                  if (isThere) return;
                  this.references.push({
                    name: 'image',
                    ref,
                  });
                }}
                style={this.style.uploadPhotoItem}
              >
                <ImageUpload
                  borderWidth={2}
                  ref={ref => {
                    this.imageUploadRef = ref;
                  }}
                />
              </Animatable.View>
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
                onSubmit={({ name, companyName, phoneNumber, instagramAccount }) =>
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
                        }}
                      >
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
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                          onSubmitEditing={() => {
                            const companyNameInput = this.references.filter(
                              t => t.name === 'companyNameInput',
                            )[0].ref;

                            companyNameInput.focus();
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
                      <Text style={this.style.inputText}>İşletme Adı</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'companyName')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'companyName',
                            ref,
                          });
                        }}
                      >
                        <TextInput
                          style={this.style.input}
                          placeholder="İşletme adını giriniz"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.companyName}
                          maxLength={22}
                          onChangeText={handleChange('companyName')}
                          onBlur={() => setFieldTouched('companyName')}
                          autoCapitalize="words"
                          returnKeyType="next"
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                          <FastImage
                            resizeMode="contain"
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                          />
                        ) : null}
                      </Animatable.View>
                    </View>
                    <View style={this.style.inputContainer}>
                      <Text style={this.style.inputText}>İşletme Telefon Numarası</Text>
                      <Animatable.View
                        ref={ref => {
                          const isThere = this.references.filter(t => t.name === 'phoneNumber')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'phoneNumber',
                            ref,
                          });
                        }}
                      >
                        <TextInput
                          style={this.style.input}
                          placeholder="0(567)8912345"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.phoneNumber}
                          maxLength={11}
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={() => setFieldTouched('phoneNumber')}
                          autoCapitalize="none"
                          keyboardType="number-pad"
                          returnKeyType="next"
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                          <FastImage
                            resizeMode="contain"
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
                        }}
                      >
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
                          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                        text="Devam"
                        backgroundColor={Colors.COMPANY}
                        textColor="#fff"
                        onPress={() => {
                          const selectedPhoto = this.imageUploadRef.state.imageSource;
                          if (isValid) {
                            if (!selectedPhoto)
                              return this.references.filter(t => t.name === 'image')[0].ref.shake();
                            handleSubmit();
                            return null;
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
                          return null;
                        }}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}
