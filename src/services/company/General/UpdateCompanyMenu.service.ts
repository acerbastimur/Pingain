import { CompanyMenu, Section } from './../../../schemes/company/CompanyMenu';
import firestore from '@react-native-firebase/firestore';
import CompanyStore from '../../../stores/Company.store';
import { v4 as uuid } from 'uuid';
import GetCompanyMenuService from './GetCompanyMenu.service';

export default class UpdateCompanyMenuService {
  static async createNewCompanyMenu(newCompanyMenu: CompanyMenu): Promise<boolean> {
    const { companyDetails } = CompanyStore; // get current company's info
    const newMenuId = uuid();
    await firestore()
      .collection('menus')
      .doc(newMenuId)
      .set(newCompanyMenu);

    await firestore()
      .collection('companies')
      .doc(companyDetails.companyId)
      .update({
        menuRef: newMenuId,
      });
    await GetCompanyMenuService.getCompanyMenu();
    return true;
  }

  static async updateCompanyMenu(newCompanyMenu: CompanyMenu): Promise<boolean> {
    const {
      companyDetails: { menuRef },
    } = CompanyStore; // get current company's info

    console.log('OLD CONTENT EDIT');

    await firestore()
      .collection('menus')
      .doc(menuRef)
      .update(newCompanyMenu);
    console.log('section added');

    await GetCompanyMenuService.getCompanyMenu();
    console.log('got company menu');

    return true;
  }
}
