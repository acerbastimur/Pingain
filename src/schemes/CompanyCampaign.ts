import CampaignType from './CampaignType.enum';

export interface Campaign {
  actionCount: number;
  campaignName: string;
  campaignType: CampaignType;
  companyId: string;
  currentQrId: string;
  prizeCount: number;
}

export interface CampaignTransactions {
  transactionDate: Date;
  userId: string;
}
