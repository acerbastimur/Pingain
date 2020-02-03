import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Company from '../../../schemes/company/Company';
import CompanyStore from '../../../stores/Company.store';

export default class GetCompanyInfoService {
  static async getCompanyInfo(): Promise<Company> {
    const {uid} = auth().currentUser;
    const companyColRef = firestore()
      .collection('companies')
      .doc(uid);
    const dataSnapshot = (await companyColRef.get()).data() as Company;
    CompanyStore.companyDetails = dataSnapshot; // update company store
    return dataSnapshot;
  }
}
