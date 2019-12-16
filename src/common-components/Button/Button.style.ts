/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  touchable: {
    height: '100%',
    backgroundColor: Colors.INFO,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
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
