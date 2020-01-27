import CampaignType from './CampaignType.enum';

export interface Campaign {
  actionCount: number;
  campaignName: string;
  campaignType: CampaignType;
  companyId: string;
  currentQrId: string;
  prizeCount: number;
  campaignId: string;
}

export interface CampaignTransactions {
  transactionDate: Date;
  userId: string;
}
