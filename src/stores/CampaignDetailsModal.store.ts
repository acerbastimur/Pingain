import RBSheet from 'react-native-raw-bottom-sheet';
import {observable, action} from 'mobx';

class CampaignDetailsStore {
  constructor() {
    console.log('Campaign Detail store was initialized!');
  }

  @observable campaignDetailsHalfModalRef: RBSheet = null;
}

export default new CampaignDetailsStore();
