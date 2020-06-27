import { CompanyMenu } from './../schemes/company/CompanyMenu';
import { observable } from 'mobx';
import Company from '../schemes/company/Company';
import { Campaign } from '../schemes/company/CompanyCampaign';

class CompanyStore {
  @observable companyDetails: Company = null;

  @observable newCompanyLogoUri: string = null;

  @observable campaigns: Array<Campaign>;

  @observable companyLogo: string = null;

  @observable companyMenu: CompanyMenu = null;
}

export default new CompanyStore();
