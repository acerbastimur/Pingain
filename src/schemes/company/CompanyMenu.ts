export interface CompanyMenu {
  companyId: string;
  sections: Section[];
}

export interface SectionItem {
  itemId: string;
  itemName: string;
  itemDetails: string;
  itemPrice: number;
}

export interface Section {
  sectionId: string;
  sectionName: string;
  sectionType: number;
  sectionItems: SectionItem[];
}
