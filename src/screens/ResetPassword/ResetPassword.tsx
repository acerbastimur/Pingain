import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
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
  email: string;
  mailSent: boolean;
}
export default class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
  style = ResetPasswordStyle;

  references = [];

  constructor(props: ResetPasswordProps) {
    super(props);
    this.state = {
      isModalVisible: false,
      email: null,
      mailSent: false,
    };
  }

  handleSubmit = ({ email }) => {
    this.setState({ isModalVisible: true, email });
  };

  public render() {
    const { navigation } = this.props;
    const { isModalVisible, email, mailSent } = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={this.style.keyboardScrollContainer}
        scrollEnabled={false}
      >
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
                  <Text style={this.style.inputText}>Email</Text>
                  <Animatable.View
                    ref={ref => {
                      const isThere = this.references.filter(t => t.name === 'email')[0];
                      if (isThere) return;
                      this.references.push({
                        name: 'email',
                        ref,
                      });
                    }}
                  >
                    <TextInput
                      style={this.style.input}
                      placeholder="Email giriniz"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                      <FastImage
                        resizeMode="contain"
                        source={require('../../assets/image/tick.png')}
                        style={this.style.image}
                      />
                    ) : null}
                  </Animatable.View>
                </View>
                <View style={this.style.buttonContainer}>
                  <Button
                    text={mailSent ? 'Sana bir email gönderdik!' : 'Şifremi Sıfırla'}
                    backgroundColor={mailSent ? '#0FBE7C' : Colors.SECONDARY}
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
          email={email}
          backButton={() => {
            this.setState({ isModalVisible: false });
          }}
          onResolveResetPass={() => {
            console.log('ok');

            this.setState({ isModalVisible: false, mailSent: true });
            setTimeout(() => {
              this.setState({ mailSent: false });
            }, 2000);
          }}
          onRejectResetPass={() => {
            this.setState({ isModalVisible: false, mailSent: false });
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}
