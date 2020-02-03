export interface UserCompany {
  companyLogo: string;
  companyName: string;
  instagramAccount: string;
  address?: any;
  companyFeatures?: any;
  phoneNumber: string;
  companyImages?: any;
  city?: any;
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
