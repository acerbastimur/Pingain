import { observable } from 'mobx';
import { UserCompany } from '../schemes/user/UserCompany';
import CampaignType from '../schemes/company/CampaignType.enum';

class WinModalStore {
  @observable isGetPinModalOpened = false;

  @observable getPinDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
    companyId: string;
  } = null;

  @observable isWinPrizeModalOpened = false;

  @observable winPrizeDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
    giftCode: string;
    campaignId: string;
    company: UserCompany;
  } = null;
}

export default new WinModalStore();
