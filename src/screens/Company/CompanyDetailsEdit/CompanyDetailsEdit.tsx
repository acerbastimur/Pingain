/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
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
import CheckBox from 'react-native-check-box';
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
import {observer} from 'mobx-react';
import FastImage from 'react-native-fast-image';
import CompanyDetailsEditStyle from './CompanyDetailsEdit.style';
import Colors from '../../../styles/Colors';
import TabsHeader from '../../../common-components/TabsHeader';
import CITIES from '../../../assets/constants/Cities';
import ImageUpload from '../../../common-components/ImageUpload';
import CompanyStore from '../../../stores/Company.store';
import Button from '../../../common-components/Button';
import SetCompanyInfoService from '../../../services/company/Auth/SetCompanyInfo.service';
import LoginService from '../../../services/company/Auth/Login.service';

interface CompanyDetailsEditProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface CompanyDetailsEditState {
  selectCheckBox: boolean;
  loading: boolean;
  imageKeys: Array<number>;
}
interface CompanyDetailsForm {
  cmpName: string;
  managerName: string;
  phoneNumber: string;
  instaAccount: string;
  address: string;
  city: string;
  password: string;
  cmpFeatures: [];
}

@observer
export default class CompanyDetailsEdit extends React.Component<
  CompanyDetailsEditProps,
  CompanyDetailsEditState
> {
  style = CompanyDetailsEditStyle;

  references = [];

  companyImages = [null, null, null];

  companyNewLogo = null;

  constructor(props: CompanyDetailsEditProps) {
    super(props);
    this.state = {selectCheckBox: false, loading: false, imageKeys: [0, 0, 0, 0]};
    const {companyImages} = CompanyStore.companyDetails;
    this.companyImages = companyImages || [null, null, null];
  }

  handleSubmit = async ({
    address,
    city,
    cmpFeatures,
    cmpName,
    instaAccount,
    managerName,
    password,
    phoneNumber,
  }: CompanyDetailsForm) => {
    if (password) {
      LoginService.setNewPassword(password);
    }

    const newCompanyLogo = CompanyStore.newCompanyLogoUri;
    this.setState({loading: true});
    await SetCompanyInfoService.updateCompanyDetails(
      cmpName,
      managerName,
      phoneNumber,
      instaAccount,
      address,
      city,
      cmpFeatures,
      this.companyImages,
      newCompanyLogo,
    ).then(() => {
      this.setState({
        loading: false,
      });
      setTimeout(() => {
        this.setState({imageKeys: new Array(4).fill(Math.random() * 100)});
      }, 1000);
    });
  };

  public render() {
    const {navigation} = this.props;
    const {selectCheckBox, loading, imageKeys} = this.state;
    const {
      companyName,
      adminName,
      address,
      city,
      companyFeatures = [],
      companyImages,
      companyLogo,
      instagramAccount,
      phoneNumber,
    } = CompanyStore.companyDetails;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.pageContainer}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            rightButtonText="Kaydet"
            rightTextColor={Colors.COMPANY}
            onLeftPress={() => {
              return null;
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
                key={imageKeys[0]}
                hideText
                borderColor={Colors.COMPANY}
                borderWidth={2}
                defaultImage={companyLogo || null}
                companyLogo
              />
            </View>

            <Formik
              validateOnMount
              validateOnChange
              key={imageKeys[0]}
              validateOnBlur
              initialValues={{
                cmpName: companyName,
                managerName: adminName,
                phoneNumber,
                instaAccount: instagramAccount,
                address,
                city,
                password: '',
                cmpFeatures: companyFeatures,
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                cmpName: Yup.string()
                  .min(2)
                  .required(),
                managerName: Yup.string()
                  .min(2)
                  .required(),
                phoneNumber: Yup.string()
                  .matches(/0[2-5](0[5-7]|[3-5]\d) ?\d{3} ?\d{4}$/g)
                  .required(),
                instaAccount: Yup.string().min(2),
                address: Yup.string().min(8),
                city: Yup.string(),
                password: Yup.string().min(6),
                cmpFeatures: Yup.array(),
              })}>
              {({
                values,
                handleChange,
                errors,
                touched,
                setFieldTouched,
                isValid,
                validateForm,
                handleSubmit,
              }) => {
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
                          <FastImage
                            style={this.style.image}
                            resizeMode="contain"
                            source={require('../../../assets/image/tick.png')}
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
                          <FastImage
                            resizeMode="contain"
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
                          const isThere = this.references.filter(t => t.name === 'address')[0];
                          if (isThere) return;
                          this.references.push({
                            name: 'address',
                            ref,
                          });
                        }}>
                        <TextInput
                          style={this.style.input}
                          placeholder="Adresinizin Google Haritalar linkini girinizi"
                          placeholderTextColor={Colors.SECONDARY}
                          selectionColor={Colors.PRIMARY}
                          value={values.address}
                          onChangeText={handleChange('address')}
                          onBlur={() => setFieldTouched('address')}
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
                          <FastImage
                            source={require('../../../assets/image/tick.png')}
                            style={this.style.image}
                            resizeMode="contain"
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
                            rippleDuration={0}
                            animationDuration={0}
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
                          returnKeyType="done"
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
                    <View style={this.style.featuresContainer}>
                      <Text style={this.style.inputText}>İşletme Özellikleri</Text>

                      <View style={this.style.checkboxLine}>
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(1) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 1);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(1);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(1) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="İnternet"
                          style={this.style.checkboxStyle}
                        />
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(2) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 2);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(2);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(2) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Elektrik"
                          style={this.style.checkboxStyle}
                        />
                      </View>
                      <View style={this.style.checkboxLine}>
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(3) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 3);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(3);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(3) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Hayvan Sever"
                          style={this.style.checkboxStyle}
                        />
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(4) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 4);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(4);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(4) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Maç Yayını"
                          style={this.style.checkboxStyle}
                        />
                      </View>
                      <View style={this.style.checkboxLine}>
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(5) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 5);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(5);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(5) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Self Servis"
                          style={this.style.checkboxStyle}
                        />
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(6) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 6);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(6);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(6) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Dış Mekan"
                          style={this.style.checkboxStyle}
                        />
                      </View>
                      <View style={this.style.checkboxLine}>
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(7) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 7);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(7);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(7) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Canlı Müzik"
                          style={this.style.checkboxStyle}
                        />
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(8) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 8);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(8);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(8) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Paket Servis"
                          style={this.style.checkboxStyle}
                        />
                      </View>
                      <View style={this.style.checkboxLine}>
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(9) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 9);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(9);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(9) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Rezervasyon"
                          style={this.style.checkboxStyle}
                        />
                        <CheckBox
                          onClick={() => {
                            const isExist = values.cmpFeatures.indexOf(10) !== -1;
                            if (isExist) {
                              values.cmpFeatures = values.cmpFeatures.filter(item => item !== 10);
                              return this.setState({selectCheckBox: !selectCheckBox});
                            }
                            values.cmpFeatures.push(10);
                            return this.setState({selectCheckBox: !selectCheckBox});
                          }}
                          isChecked={values.cmpFeatures.indexOf(10) !== -1}
                          rightTextStyle={this.style.checkboxText}
                          checkBoxColor={Colors.SECONDARY}
                          rightText="Sessiz Ortam"
                          style={this.style.checkboxStyle}
                        />
                      </View>
                    </View>
                    <View style={this.style.cmpImagesUploadContainer}>
                      <Text style={this.style.inputText}>İşletme Görselleri</Text>
                      <Text style={this.style.inputSubText}>
                        İşletmenizi ait fotoğrafları yükleyiniz
                      </Text>
                      <View style={this.style.cmpImagesContainer}>
                        <View style={this.style.profileImage}>
                          <ImageUpload
                            key={imageKeys[1]}
                            hideText
                            borderColor={Colors.PRIMARY}
                            borderWidth={1}
                            defaultImage={
                              companyImages && companyImages[0] ? companyImages[0] : null
                            }
                            ref={ref => {
                              if (ref && ref.state && ref.state.imageSource) {
                                this.companyImages[0] = ref.state.imageSource;
                              }
                            }}
                          />
                        </View>
                        <View style={this.style.profileImage}>
                          <ImageUpload
                            key={imageKeys[2]}
                            hideText
                            borderColor={Colors.PRIMARY}
                            borderWidth={1}
                            defaultImage={
                              companyImages && companyImages.length > 1 && companyImages[1]
                                ? companyImages[1]
                                : null
                            }
                            ref={ref => {
                              if (ref && ref.state && ref.state.imageSource) {
                                this.companyImages[1] = ref.state.imageSource;
                              }
                            }}
                          />
                        </View>
                        <View style={this.style.profileImage}>
                          <ImageUpload
                            key={imageKeys[3]}
                            hideText
                            borderColor={Colors.PRIMARY}
                            borderWidth={1}
                            defaultImage={
                              companyImages && companyImages.length > 2 ? companyImages[2] : null
                            }
                            ref={ref => {
                              if (ref && ref.state && ref.state.imageSource) {
                                this.companyImages[2] = ref.state.imageSource;
                              }
                            }}
                          />
                        </View>
                      </View>
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

                          if (errors.cmpName) {
                            this.references.filter(t => t.name === 'cmpName')[0].ref.shake();
                          }
                          if (errors.instaAccount) {
                            this.references.filter(t => t.name === 'instaAccount')[0].ref.shake();
                          }
                          if (errors.managerName) {
                            this.references.filter(t => t.name === 'managerName')[0].ref.shake();
                          }
                          if (errors.phoneNumber) {
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
