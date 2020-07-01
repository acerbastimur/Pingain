/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { Dropdown } from 'react-native-material-dropdown';
import { v4 as uuid } from 'uuid';
import SectionEditStyle from './SectionEdit.style';
import TabsHeader from '../../../../../../common-components/TabsHeader';
import Button from '../../../../../../common-components/Button';
import Colors from '../../../../../../global/styles/Colors';
import { SectionItem, CompanyMenu, Section } from '../../../../../../schemes/company/CompanyMenu';
import UpdateCompanyMenuService from '../../../../../../services/company/General/UpdateCompanyMenu.service';
import CompanyStore from '../../../../../../stores/Company.store';

export interface SectionEditProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface SectionEditState {
  loading: boolean;
  sectionType: number;
  sectionName: string;
  sectionItems: Array<SectionItem>;
}

@observer
export default class SectionEdit extends React.Component<SectionEditProps, SectionEditState> {
  style = SectionEditStyle;

  constructor(props: SectionEditProps) {
    super(props);

    const isEdit = this.props.navigation.getParam('isEdit');
    const sectionItems = this.props.navigation.getParam('sectionItems');
    const sectionName = this.props.navigation.getParam('sectionName');
    const sectionType = this.props.navigation.getParam('sectionType');

    this.state = {
      loading: false,
      sectionType: isEdit ? sectionType : 1,
      sectionName: isEdit ? sectionName : '',
      sectionItems: isEdit
        ? sectionItems
        : [
            {
              itemId: uuid(),
              itemName: '',
              itemDetails: '',
              itemPrice: 1,
            },
          ],
    };
  }

  public render() {
    const { navigation } = this.props;

    const { loading, sectionName, sectionType, sectionItems } = this.state;
    const isEdit = this.props.navigation.getParam('isEdit');

    const priceExtractor = Array(99)
      .fill(null)
      .map((_, index) => {
        return {
          value: index + 1,
          label: index + 1,
        };
      });

    return (
      <View style={this.style.container}>
        {loading ? (
          <View style={this.style.indicatorContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{ width: 100, height: 100 }}
              source={require('../../../../../../assets/image/loading.gif')}
            />
          </View>
        ) : null}
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onLeftPress={() => null}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
              return null;
            }}
          />
        </View>
        <ScrollView
          style={this.style.scrollView}
          contentContainerStyle={this.style.scrollViewContainer}
        >
          <View style={this.style.listHeader}>
            <Text style={this.style.listHeaderTextLight}>Sürekli Güncellenebilir</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              {isEdit ? 'Menünüzü Güncelleyin' : 'Menünüzü Yayınlayın'}
            </Text>
          </View>
          <View style={this.style.sectionEditSectionsContainer}>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Menü Bölüm Adı</Text>
              <View style={this.style.dropdownAreaContainer}>
                <TextInput
                  style={this.style.input}
                  placeholder="Örn: Soğuk İçecekler"
                  placeholderTextColor={Colors.SECONDARY}
                  selectionColor={Colors.PRIMARY}
                  maxLength={26}
                  value={sectionName}
                  onChangeText={text => this.setState({ sectionName: text })}
                  autoCapitalize="words"
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={this.style.dropdownFullWidth}>
                <Text style={this.style.inputText}>Bölüm Tipi</Text>
                <Dropdown
                  value={sectionType}
                  rippleOpacity={0}
                  onChangeText={value => this.setState({ sectionType: value })}
                  data={[
                    { value: 1, label: 'İçecek' },
                    { value: 2, label: 'Yemek' },
                    { value: 3, label: 'Tatlı' },
                  ]}
                  itemTextStyle={this.style.dropdownText}
                  inputContainerStyle={this.style.dropdownInputContainerStyle}
                  containerStyle={[this.style.dropdownInnerContainer, { top: -25 }]}
                  textColor={Colors.COMPANY}
                  fontSize={16}
                />
              </View>
            </View>
          </View>
          <View style={this.style.menuTitleHeader}>
            <Text style={this.style.listHeaderText}>Ürün Adı</Text>
            <Text style={this.style.listHeaderText}>Fiyat(TL)</Text>
          </View>

          <View style={this.style.menuItemsContainer}>
            {sectionItems.map(({ itemDetails, itemId, itemName, itemPrice }) => {
              console.log(itemName, itemPrice);

              return (
                <View style={this.style.menuItem} key={itemId}>
                  <View style={this.style.row}>
                    <TextInput
                      style={this.style.menuItemInput}
                      placeholder="Ürün adını yazınız"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      maxLength={26}
                      value={itemName}
                      onChangeText={text => {
                        const itemIndex = sectionItems.findIndex(
                          sectionItem => sectionItem.itemId === itemId,
                        );
                        const newItemList = [...sectionItems];
                        newItemList[itemIndex].itemName = text;
                        this.setState({ sectionItems: newItemList });
                      }}
                      autoCapitalize="words"
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      blurOnSubmit={false}
                    />
                    <View style={this.style.priceContainer}>
                      <Dropdown
                        value={itemPrice}
                        onChangeText={price => {
                          const itemIndex = sectionItems.findIndex(
                            sectionItem => sectionItem.itemId === itemId,
                          );
                          const newItemList = [...sectionItems];
                          newItemList[itemIndex].itemPrice = price;
                          this.setState({ sectionItems: newItemList });
                        }}
                        data={priceExtractor}
                        itemTextStyle={this.style.dropdownText}
                        inputContainerStyle={[
                          this.style.dropdownInputContainerStyle,
                          { paddingLeft: 5 },
                        ]}
                        containerStyle={[
                          this.style.dropdownInnerContainer,
                          this.style.transparentBorder,
                        ]}
                        textColor={Colors.COMPANY}
                        fontSize={18}
                      />
                    </View>
                    <TouchableOpacity
                      style={this.style.removeElementButton}
                      hitSlop={{ bottom: 0, top: 0, left: 10, right: 20 }}
                      onPress={() => {
                        const newItemList = sectionItems.filter(
                          sectionItem => sectionItem.itemId !== itemId,
                        );

                        this.setState({ sectionItems: newItemList });
                      }}
                    >
                      <Text style={this.style.crossText}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[this.style.row, { marginTop: 0 }]}>
                    <TextInput
                      style={[this.style.menuItemInput, { width: '85%' }]}
                      placeholder="Ürün açıklamasını yazınız (opsiyonel)"
                      placeholderTextColor={Colors.SECONDARY}
                      selectionColor={Colors.PRIMARY}
                      maxLength={26}
                      value={itemDetails}
                      onChangeText={text => {
                        const itemIndex = sectionItems.findIndex(
                          sectionItem => sectionItem.itemId === itemId,
                        );
                        const newItemList = [...sectionItems];
                        newItemList[itemIndex].itemDetails = text;
                        this.setState({ sectionItems: newItemList });
                      }}
                      autoCapitalize="words"
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>
              );
            })}
          </View>
          <View style={[this.style.btnContainer, this.style.newProductBtn]}>
            <Button
              backgroundColor={Colors.Background}
              text="+ Yeni Ürün Ekle"
              textColor={Colors.COMPANY}
              shadow={false}
              onPress={() => {
                const newItemList: Array<SectionItem> = [
                  ...sectionItems,
                  ...[
                    {
                      itemId: uuid(),
                      itemName: '',
                      itemDetails: '',
                      itemPrice: 1,
                    },
                  ],
                ];
                this.setState({ sectionItems: newItemList });
              }}
            />
          </View>
          <View style={this.style.btnContainer}>
            <Button
              backgroundColor={Colors.COMPANY}
              text={isEdit ? 'Menü Bölümünü Güncelle' : 'Yeni Menü Bölümü Oluştur'}
              textColor="#fff"
              shadow
              onPress={async (): Promise<any> => {
                this.setState({ loading: true });

                // if editing the existing section
                if (isEdit) {
                  const newCompanyMenu: CompanyMenu = CompanyStore.companyMenu;
                  const sectionId = this.props.navigation.getParam('sectionId');

                  const updatedSectionIndex = newCompanyMenu.sections.findIndex(
                    section => section.sectionId === sectionId,
                  );
                  newCompanyMenu.sections[updatedSectionIndex].sectionItems = sectionItems;
                  newCompanyMenu.sections[updatedSectionIndex].sectionName = sectionName;
                  newCompanyMenu.sections[updatedSectionIndex].sectionType = sectionType;

                  try {
                    await UpdateCompanyMenuService.updateCompanyMenu(newCompanyMenu);
                    this.setState({ loading: false });
                    CompanyStore.companyToast.show('Menu kaydedildi!', 3000);
                    return navigation.goBack();
                  } catch (err) {
                    console.warn('Error while updating menu', err);
                  }
                }
                // if creating section, not editing
                else {
                  const {
                    companyDetails: { companyId, menuRef },
                  } = CompanyStore; // get current company's info

                  // if it's the first time to create a menu
                  if (!menuRef) {
                    try {
                      const newSectionId = uuid();
                      const newCompanyMenu: CompanyMenu = {
                        companyId,
                        sections: [
                          {
                            sectionId: newSectionId,
                            sectionItems,
                            sectionName,
                            sectionType,
                          },
                        ],
                      };
                      await UpdateCompanyMenuService.createNewCompanyMenu(newCompanyMenu);
                      this.setState({ loading: false });
                      CompanyStore.companyToast.show('Menu kaydedildi!', 3000);
                      return navigation.goBack();
                    } catch (err) {
                      console.warn('Error while creating menu', err);
                    }
                  }

                  // if there is menus and it's a new section
                  const newCompanyMenu: CompanyMenu = CompanyStore.companyMenu;
                  const newSectionId = uuid();

                  const newSection: Section = {
                    sectionId: newSectionId,
                    sectionItems,
                    sectionName,
                    sectionType,
                  };

                  newCompanyMenu.sections.push(newSection);
                  try {
                    await UpdateCompanyMenuService.updateCompanyMenu(newCompanyMenu);

                    this.setState({ loading: false });
                    CompanyStore.companyToast.show('Menu kaydedildi!', 3000);

                    return navigation.goBack();
                  } catch (err) {
                    console.warn('Error while updating menu', err);
                  }
                }
                return null;
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
