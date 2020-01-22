import {observable, action} from 'mobx';
import AuthRole from '../schemes/AuthRole.enum';
import Company from '../schemes/Company';

class GeneralStore {
  @observable companyDetails: Company = null;

  constructor() {
    console.log('Company Store was initialized!');
  }
}

export default new GeneralStore();
