export interface UserCompany {
  companyLogo: string;
  companyName: string;
  instagramAccount: string;
  address?: any;
  companyFeatures?: Array<number>;
  phoneNumber: string;
  companyImages?: Array<string>;
  city?: string;
  campaigns: Campaign[];
}
export interface Campaign {
  currentQr: string;
  campaignId: string;
  campaignType: number;
  prizeCount: number;
  campaignName: string;
  companyId: string;
  actionCount: number;
}
