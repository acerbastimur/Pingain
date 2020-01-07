import {observable, action} from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';

class WinModalStore {
  constructor() {
    console.log('Win Modal Store was initialized!');
  }

  @observable shareUsModalRef: RBSheet = null;
}

export default new WinModalStore();
