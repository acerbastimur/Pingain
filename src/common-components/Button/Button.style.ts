/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  touchable: {
    width: '76%',
    height: '6.5%',
    backgroundColor: Colors.INFO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#2D8EFF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },
});
