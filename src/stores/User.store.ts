import { observable } from 'mobx';
import { UserCompany } from '../schemes/user/UserCompany';
import User from '../schemes/user/User';

class UserStore {
  @observable userDetails: User = null;

  @observable newUserLogoUri: string = null;

  @observable newCompanyLogoUri: string = null;

  @observable companies: Array<UserCompany> = null;

  @observable profilePhoto: string = null;
}

export default new UserStore();
