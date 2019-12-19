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

interface ModalContainerProps {
  isVisible: boolean;
  backButton: (e: any) => void;
}

const ModalContainer = ({isVisible = false, backButton}: ModalContainerProps) => {
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
            Şifreni sıfırlamak istediğine emin misin?
          </Text>
          <Text numberOfLines={1} style={s.subText}>
            Bu işlem geri alınamaz.
          </Text>

          <View style={s.buttonsContainer}>
            <View style={s.buttonContainer}>
              <Button
                text="Şifremi Sıfırla"
                backgroundColor={Colors.SECONDARY}
                textColor="#fff"
                onPress={() => {}}
              />
            </View>
            <View style={s.buttonContainer}>
              <Button
                text="Vazgeç"
                backgroundColor="#fff"
                borderColor={Colors.WARN}
                borderWidth={1}
                textColor={Colors.WARN}
                fontWeight="normal"
                onPress={() => {
                  backButton(true);
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
