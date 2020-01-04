import {observable, action} from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';

class WinModalStore {
  constructor() {
    console.log('Win Modal Store was initialized!');
  }

  @observable getPinModalRef: RBSheet = null;

  @observable winPrizeHalfModalRef: RBSheet = null;
}

export default new WinModalStore();
