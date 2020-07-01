import { CompanyMenu } from './../../../schemes/company/CompanyMenu';
import firestore from '@react-native-firebase/firestore';
import CompanyStore from '../../../stores/Company.store';
import { Campaign } from '../../../schemes/company/CompanyCampaign';
import GetCompanyInfoService from './GetCompanyInfo.service';

export default class GetCompanyMenuService {
  static async getCompanyMenu(): Promise<any> {
    const {
      companyDetails: { menuRef },
    } = CompanyStore; // get current company's info

    if (!menuRef) return null;

    const menuDocument = firestore()
      .collection('menus')
      .doc(menuRef);

    const companyMenu = (await menuDocument.get()).data() as CompanyMenu;

    CompanyStore.companyMenu = companyMenu;

    return true;
  }
}
