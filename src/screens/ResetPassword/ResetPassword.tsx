/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-empty-function */
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
import ResetPasswordStyle from './ResetPassword.style';
import Colors from '../../styles/Colors';
import Logo from '../../common-components/Logo';
import Button from '../../common-components/Button';
import ModalContainer from '../../common-components/ModalContainer';

interface ResetPasswordProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface ResetPasswordState {
  isModalVisible: boolean;
}
export default class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
  style = ResetPasswordStyle;

  references = [];

  constructor(props: ResetPasswordProps) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  handleSubmit = (values: any) => {
    this.setState({isModalVisible: true});
  };

  public render() {
    const {navigation} = this.props;
    const {isModalVisible} = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}>
        <View style={this.style.container}>
          <View style={this.style.logoContainer}>
            <Logo />
          </View>
          <View style={this.style.headerTextContainer}>
            <Text style={this.style.headerText}>Demek</Text>
            <Text style={this.style.headerTextLight}>Şifreni unuttun !</Text>
            <Text style={this.style.headerText2}>Merak etme hemen hallederiz</Text>
          </View>
          <Formik
            validateOnMount
            initialValues={{
              email: '',
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()

                .required(),
            })}>
            {({values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid}) => (
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
                      returnKeyType="send"
                      onSubmitEditing={() => {
                        if (isValid) {
                          handleSubmit();
                        }

                        if (errors.email) {
                          this.references.filter(t => t.name === 'email')[0].ref.shake();
                        }
                      }}
                    />

                    {!errors.email && touched.email ? (
                      <Image
                        source={require('../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.buttonContainer}>
                  <Button
                    text="Şifremi Sıfırla"
                    backgroundColor={Colors.SECONDARY}
                    textColor="#fff"
                    onPress={() => {
                      if (isValid) {
                        handleSubmit();
                        return;
                      }

                      if (errors.email) {
                        this.references.filter(t => t.name === 'email')[0].ref.shake();
                      }
                    }}
                  />
                  <View style={this.style.dismiss}>
                    <Button
                      text="Vazgeç"
                      backgroundColor="#fff"
                      textColor={Colors.PRIMARY}
                      shadow={false}
                      fontWeight="bold"
                      onPress={() => {
                        navigation.goBack();
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
        <ModalContainer
          isVisible={isModalVisible}
          modalType={1}
          backButton={e => {
            this.setState({isModalVisible: false});
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}
