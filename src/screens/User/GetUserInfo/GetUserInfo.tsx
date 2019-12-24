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
export default class GetUserInfo extends React.Component<GetUserInfoProps> {
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
                        maxLength={30}
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
                        maxLength={30}
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
                          const phoneInputInput = this.references.filter(
                            t => t.name === 'phoneNumberInput',
                          )[0].ref;
                          console.log(phoneInputInput);

                          phoneInputInput.focus();
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
                </View>
              )}
            </Formik>
          </View>
          <View style={this.style.buttonContainer}>
            <Text>sa</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
