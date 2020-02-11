import firestore from '@react-native-firebase/firestore';
import CompanyStore from '../../../stores/Company.store';
import {Campaign} from '../../../schemes/company/CompanyCampaign';
import GetCompanyInfoService from './GetCompanyInfo.service';

export default class GetCompanyCampaignsService {
  static async getAllCompanyCampaigns(): Promise<Array<Campaign>> {
    await GetCompanyInfoService.getCompanyInfo();
    const userCampaignKeys = CompanyStore.companyDetails.campaigns;
    const userCampaigns: Array<Campaign> = [];
    if (userCampaignKeys) {
      await Promise.all(
        userCampaignKeys.map(async campaignKey => {
          const companyColRef = firestore()
            .collection('campaigns')
            .doc(campaignKey);
          const dataSnapshot = (await companyColRef.get()).data() as Campaign;
          userCampaigns.push(dataSnapshot);
        }),
      );
    }

    CompanyStore.campaigns = userCampaigns; // update Company Store
    return userCampaigns;
  }
}
