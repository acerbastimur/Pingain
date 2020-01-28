import {observable, toJS} from 'mobx';
import AuthRole from '../schemes/AuthRole.enum';
import User from '../schemes/User';

class UserStore {
  @observable userDetails: User = null;

  @observable newUserLogoUri: string = null;

  constructor() {
    console.log('User Store was initialized!');
  }
}

export default new UserStore();
