import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import MenuStyle from './Menu.style';
import CompanyStore from '../../../../../stores/Company.store';
import TabsHeader from '../../../../../common-components/TabsHeader';
import { Card } from 'react-native-shadow-cards';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Button from '../../../../../common-components/Button';
import Colors from '../../../../../global/styles/Colors';
import GetCompanyMenuService from '../../../../../services/company/General/GetCompanyMenu.service';
import { CompanyMenu, Section } from './../../../../../schemes/company/CompanyMenu';
import { toJS } from 'mobx';
import Toast from 'react-native-easy-toast';

export interface MenuProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface MenuState {
  loading: boolean;
}

@observer
export default class Menu extends React.Component<MenuProps, MenuState> {
  style = MenuStyle;

  constructor(props: MenuProps) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await GetCompanyMenuService.getCompanyMenu();
    this.setState({
      loading: false,
    });
  }

  menuSectionItem = (
    { sectionItems, sectionName, sectionType, sectionId }: Section,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  ) => {
    const menuSectionImage = (menuType: string) => {
      const menuTypes = {
        '1': require('../../../../../assets/image/User/coffeeIcon.png'),
        '2': require('../../../../../assets/image/User/mealIcon.png'),
        '3': require('../../../../../assets/image/User/dessertIcon.png'),
      };
      return menuTypes[menuType];
    };
    const menuSectionArrow = (menuType: string) => {
      const menuTypes = {
        '1': require('../../../../../assets/image/Company/coffeeArrow.png'),
        '2': require('../../../../../assets/image/Company/statisticsArrow.png'),
        '3': require('../../../../../assets/image/Company/dessertArrow.png'),
      };
      return menuTypes[menuType];
    };
    return (
      <Card elevation={6} opacity={0.15} key={Math.random() * 100} style={this.style.card}>
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={this.style.otherCardBodyItem}
          onPress={() => {
            navigation.navigate('MenuSectionEdit', {
              isEdit: true,
              sectionItems,
              sectionType,
              sectionName,
              sectionId,
            });
          }}
        >
          <FastImage
            resizeMode="contain"
            style={this.style.cardBodyItemIcon}
            source={menuSectionImage(sectionType.toString())}
          />

          <Text style={this.style.otherCardBodyItemName}>{sectionName}</Text>
          <View style={this.style.arrowContainer}>
            <FastImage
              resizeMode="contain"
              style={this.style.arrow}
              source={menuSectionArrow(sectionType.toString())}
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  public render() {
    const { navigation } = this.props;
    const {
      companyDetails: { menuRef },
    } = CompanyStore;
    const { loading } = this.state;
    const sections = toJS(CompanyStore.companyMenu?.sections);
    return loading ? (
      <View style={this.style.indicatorContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 100, height: 100 }}
          source={require('../../../../../assets/image/loading.gif')}
        />
      </View>
    ) : (
      <View style={this.style.container}>
          <Toast
          ref={(ref: Toast) => (CompanyStore.companyToast = ref)}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderWidth: 0.2,
            borderColor: Colors.SECONDARY_LIGHT,
            width: '40%',
            
            justifyContent: 'center',
            alignItems: 'center',
          }}
          position="bottom"
          positionValue={250}
          textStyle={{ color: Colors.PRIMARY, fontFamily: 'Helvetica Neue' }}
        />
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
            <Text style={this.style.listHeaderTextLight}>Temassız Menü Deneyimi İçin</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              Menü Bölümleri
            </Text>
          </View>
          <View style={this.style.menuSectionsContainer}>
            {sections?.map(section => this.menuSectionItem(section, navigation))}
          </View>
          <View style={this.style.btnContainer}>
            <Button
              backgroundColor={Colors.COMPANY}
              text="Yeni Menü Bölümü Oluştur"
              textColor="#fff"
              shadow
              onPress={() => {
                navigation.navigate('MenuSectionEdit', { isEdit: false });
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
