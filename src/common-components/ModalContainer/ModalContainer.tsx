/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import ModalContainerStyle from './ModalContainer.style';
import Colors from '../../styles/Colors';
import Button from '../Button';

enum ModalType {
  ResetPassword = 1,
  ErrorMessage = 2,
}

interface ModalContainerProps {
  isVisible: boolean;
  modalType: ModalType;
  errorMessage?: string;
  backButton: (e: any) => void;
}

const ModalContainer = ({
  isVisible = false,
  backButton,
  modalType = ModalType.ResetPassword,
  errorMessage,
}: ModalContainerProps) => {
  const s = ModalContainerStyle;

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
      animationOutTiming={150}>
      <View style={s.contentContainer}>
        <View style={s.contentBox}>
          <Text numberOfLines={2} style={s.headerText}>
            {modalType === ModalType.ResetPassword
              ? 'Şifreni sıfırlamak istediğine emin misin?'
              : 'Kayıt yapılamadı'}
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
                  onPress={() => {}}
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
                    backButton(true);
                  } catch (err) {
                    console.log('Something went wrong on ModalContainer.tsx');
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalContainer;
