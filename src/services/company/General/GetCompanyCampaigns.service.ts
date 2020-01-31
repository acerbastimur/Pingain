import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Company from '../../../schemes/company/Company';
import CompanyStore from '../../../stores/Company.store';
import {Campaign} from '../../../schemes/company/CompanyCampaign';
import GetCompanyInfoService from './GetCompanyInfo.service';

export default class GetCompanyCampaignsService {
  static async getAllCompanyCampaigns(): Promise<Array<Campaign>> {
    /*     

    const companyColRef = firestore()
      .collection('campaigns')
      .doc(uid);
    const dataSnapshot = (await companyColRef.get()).data();
    console.log(dataSnapshot); */
    const {uid} = auth().currentUser;
    await GetCompanyInfoService.getCompanyInfo();
    const userCampaignKeys = CompanyStore.companyDetails.campaigns;
    const userCampaigns: Array<Campaign> = [];
    if (userCampaignKeys) {
      const campaigns = await Promise.all(
        userCampaignKeys.map(async (campaignKey, index) => {
          const companyColRef = firestore()
            .collection('campaigns')
            .doc(campaignKey);
          const dataSnapshot = (await companyColRef.get()).data() as Campaign;
          userCampaigns.push(dataSnapshot);
        }),
      );
    }

    console.log('campaigns are', userCampaigns);
    CompanyStore.campaigns = userCampaigns; // update Company Store
    return userCampaigns;
  }
}
