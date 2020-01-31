import {observable, action} from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';
import AuthRole from '../schemes/general/AuthRole.enum';

class GeneralStore {
  constructor() {
    console.log('General Store was initialized!');
  }

  @observable shareUsModalRef: RBSheet = null;

  @observable authRole: AuthRole = null;
}

export default new GeneralStore();
