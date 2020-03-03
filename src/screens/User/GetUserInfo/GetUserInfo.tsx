import * as React from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import GetUserInfoStyle from './GetUserInfo.style';
import Colors from '../../../styles/Colors';
import Button from '../../../common-components/Button';
import ImageUpload from '../../../common-components/ImageUpload';
import CITIES from '../../../assets/constants/Cities';
import SetUserInfoService from '../../../services/user/Auth/SetUserInfo.service';

interface GetUserInfoProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface GetUserInfoState {
  isLoading: boolean;
}

export default class GetUserInfo extends React.Component<GetUserInfoProps, GetUserInfoState> {
  style = GetUserInfoStyle;

  imageUploadRef = null;

  references = [];

  constructor(props: GetUserInfoProps) {
    super(props);
    this.state = { isLoading: false };
  }

  handleSubmit = (name: string, surname: string, phoneNumber: string, city: string) => {
    const { navigation } = this.props;
    const logoUri = this.imageUploadRef.state.imageSource;
    this.setState({ isLoading: true });
    SetUserInfoService.setUserInfo(name, surname, phoneNumber, city, logoUri).then(() => {
      navigation.navigate('UserTabNavigation');
    });
  };

  public render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}
      >
        <View style={this.style.container}>
          <View style={this.style.uploadPhotoContainer}>
            <Animatable.View
              style={this.style.uploadPhotoItem}
              ref={ref => {
                const isThere = this.references.filter(t => t.name === 'image')[0];
                if (isThere) return;
                this.references.push({
                  name: 'image',
                  ref,
                });
              }}
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
                surname: '',
                phoneNumber: '',
                city: '35',
              }}
              onSubmit={({ name, surname, phoneNumber, city }) =>
                this.handleSubmit(name, surname, phoneNumber, city)
              }
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
                city: Yup.string().required(),
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
                    <Text style={this.style.inputText}>İsim</Text>
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
                        placeholder="İsminizi giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.name}
                        maxLength={15}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                      }}
                    >
                      <TextInput
                        style={this.style.input}
                        placeholder="Soyisminizi giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.surname}
                        maxLength={15}
                        onChangeText={handleChange('surname')}
                        onBlur={() => setFieldTouched('surname')}
                        autoCapitalize="words"
                        returnKeyType="next"
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                      }}
                    >
                      <TextInput
                        style={this.style.input}
                        placeholder="Telefon numaranızı giriniz"
                        placeholderTextColor={Colors.SECONDARY}
                        selectionColor={Colors.PRIMARY}
                        value={values.phoneNumber}
                        maxLength={11}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={() => setFieldTouched('phoneNumber')}
                        autoCapitalize="none"
                        keyboardType="number-pad"
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
                      backgroundColor={Colors.INFO}
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
                        if (errors.surname) {
                          this.references.filter(t => t.name === 'surname')[0].ref.shake();
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
      </KeyboardAwareScrollView>
    );
  }
}
