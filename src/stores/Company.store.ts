import {observable, toJS} from 'mobx';
import AuthRole from '../schemes/AuthRole.enum';
import Company from '../schemes/Company';
import {Campaign} from '../schemes/CompanyCampaign';

class GeneralStore {
  @observable companyDetails: Company = null;

  @observable newCompanyLogoUri: string = null;

  @observable campaigns: Array<Campaign>;

  constructor() {
    console.log('Company Store was initialized!');
  }
}

export default new GeneralStore();
