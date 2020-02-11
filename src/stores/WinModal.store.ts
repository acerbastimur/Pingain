import {observable} from 'mobx';
import CampaignType from '../schemes/company/CampaignType.enum';

class WinModalStore {
  @observable isGetPinModalOpened = false;

  @observable getPinDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
  } = null;

  @observable isWinPrizeModalOpened = false;

  @observable winPrizeDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
    giftCode: string;
  } = null;
}

export default new WinModalStore();
