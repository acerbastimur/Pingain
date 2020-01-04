import {observable, action} from 'mobx';

class WinModalStore {
  constructor() {
    console.log('Win Modal Store was initialized!');
  }

  @observable winHalfModalRef: any = null;
}

export default new WinModalStore();
