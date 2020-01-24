import {observable, toJS} from 'mobx';
import AuthRole from '../schemes/AuthRole.enum';
import Company from '../schemes/Company';

class GeneralStore {
  @observable companyDetails: Company = null;

  @observable newCompanyLogoUri: string = null;

  constructor() {
    console.log('Company Store was initialized!');
  }
}

export default new GeneralStore();
