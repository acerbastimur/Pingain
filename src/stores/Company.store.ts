import {observable, toJS} from 'mobx';
import AuthRole from '../schemes/general/AuthRole.enum';
import Company from '../schemes/company/Company';
import {Campaign} from '../schemes/company/CompanyCampaign';

class CompanyStore {
  @observable companyDetails: Company = null;

  @observable newCompanyLogoUri: string = null;

  @observable campaigns: Array<Campaign>;

  constructor() {
    console.log('Company Store was initialized!');
  }
}

export default new CompanyStore();
