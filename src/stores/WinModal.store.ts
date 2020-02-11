import {observable, action} from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';
import CampaignType from '../schemes/company/CampaignType.enum';

class WinModalStore {
  constructor() {
    console.log('Win Modal Store was initialized!');
  }

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
