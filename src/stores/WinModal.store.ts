import {observable, action} from 'mobx';
import RBSheet from 'react-native-raw-bottom-sheet';
import CampaignType from '../schemes/company/CampaignType.enum';

class WinModalStore {
  constructor() {
    console.log('Win Modal Store was initialized!');
  }

  @observable getPinModalRef: RBSheet = null;

  @observable getPinDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
  } = null;

  @observable winPrizeHalfModalRef: RBSheet = null;

  @observable winPrizeDetails: {
    companyLogo: string;
    companyName: string;
    campaignType: CampaignType;
    campaignName: string;
    giftCode: string;
  } = null;
}

export default new WinModalStore();
