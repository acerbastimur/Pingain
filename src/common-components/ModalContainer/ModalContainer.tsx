import * as React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import ModalContainerStyle from './ModalContainer.style';
import Colors from '../../global/styles/Colors';
import Button from '../Button';
import ResetPasswordService from '../../services/common-services/ResetPassword.service';

enum ModalType {
  ResetPassword = 1,
  ErrorMessage = 2,
}

interface ModalContainerProps {
  isVisible: boolean;
  modalType: ModalType;
  errorMessage?: string;
  email?: string;
  backButton: () => void;
  onResolveResetPass?: () => void;
  onRejectResetPass?: () => void;
}
interface ModalContainerState {
  isButtonActive: boolean;
}

class ModalContainer
  /* = ({
}: ModalContainerProps) =>  */ extends React.Component<
    ModalContainerProps,
    ModalContainerState
  > {
  constructor(props: ModalContainerProps) {
    super(props);
    this.state = {
      isButtonActive: true,
    };
  }

  render() {
    const s = ModalContainerStyle;
    const { isButtonActive } = this.state;
    const {
      isVisible = false,
      backButton,
      modalType = ModalType.ResetPassword,
      errorMessage,
      email,
      onRejectResetPass,
      onResolveResetPass,
    } = this.props;
    return (
      <Modal
        style={s.modal}
        isVisible={isVisible}
        backdropColor="white"
        animationIn="fadeInUp"
        animationInTiming={400}
        animationOut="fadeOutDown"
        avoidKeyboard
        useNativeDriver
        hideModalContentWhileAnimating
        animationOutTiming={150}
      >
        <View style={s.contentContainer}>
          <View style={s.contentBox}>
            <Text numberOfLines={2} style={s.headerText}>
              {modalType === ModalType.ResetPassword
                ? 'Şifreni sıfırlamak istediğine emin misin?'
                : 'Hata'}
            </Text>
            <Text numberOfLines={1} style={s.subText}>
              {modalType === ModalType.ResetPassword ? 'Bu işlem geri alınamaz.' : errorMessage}
            </Text>

            <View style={s.buttonsContainer}>
              {modalType === ModalType.ResetPassword ? (
                <View style={s.buttonContainer}>
                  <Button
                    text="Şifremi Sıfırla"
                    backgroundColor={Colors.SECONDARY}
                    textColor="#fff"
                    disabled={!isButtonActive}
                    onPress={async () => {
                      this.setState({ isButtonActive: false });
                      return ResetPasswordService.resetPasswordWithEmail(email)
                        .then(() => {
                          this.setState({ isButtonActive: true });
                          return onResolveResetPass();
                        })
                        .catch(() => {
                          this.setState({ isButtonActive: true });

                          return onRejectResetPass();
                        });
                    }}
                  />
                </View>
              ) : null}
              <View style={s.buttonContainer}>
                <Button
                  text={modalType === ModalType.ResetPassword ? 'Vazgeç' : 'Geri'}
                  backgroundColor="#fff"
                  borderColor={Colors.WARN}
                  borderWidth={1}
                  textColor={Colors.WARN}
                  fontWeight="normal"
                  onPress={() => {
                    try {
                      backButton();
                    } catch (err) {
                      return null;
                    }
                    return null;
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default ModalContainer;
