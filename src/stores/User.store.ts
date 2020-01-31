import {observable, toJS, computed} from 'mobx';
import {UserCompany} from '../schemes/user/UserCompany';
import AuthRole from '../schemes/general/AuthRole.enum';
import User from '../schemes/user/User';

class UserStore {
  @observable userDetails: User = null;

  @observable newUserLogoUri: string = null;

  @observable newCompanyLogoUri: string = null;

  @observable companies: Array<UserCompany> = null;

  constructor() {
    console.log('User Store was initialized!');
  }
}

export default new UserStore();
