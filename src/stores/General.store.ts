import { observable } from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';
import AuthRole from '../schemes/general/AuthRole.enum';

class GeneralStore {
  @observable shareUsModalRef: RBSheet = null;

  @observable authRole: AuthRole = null;
}

export default new GeneralStore();
