import {observable, toJS, computed} from 'mobx';
import AuthRole from '../schemes/AuthRole.enum';
import User from '../schemes/User';

class UserStore {
  @observable userDetails: User = null;

  @observable newUserLogoUri: string = null;

  @observable newCompanyLogoUri: string = null;

  constructor() {
    console.log('User Store was initialized!');
  }

  @computed getUserDetails(): User {
    return this.userDetails;
  }
}

export default new UserStore();
