/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import {Dropdown} from 'react-native-material-dropdown';
import CreateCampaignService from '../../../../../../services/company/General/CreateCampaign.service';
import CampaignCreateStyle from './CampaignCreate.style';
import TabsHeader from '../../../../../../common-components/TabsHeader';
import Button from '../../../../../../common-components/Button';
import Colors from '../../../../../../styles/Colors';
import {Campaign} from '../../../../../../schemes/company/CompanyCampaign';

export interface CampaignCreateProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface CampaignCreateState {
  campaignName: string;
  actionCount: number;
  prizeCount: number;
  campaignType: number;
  loading: boolean;
}

export default class CampaignCreate extends React.Component<
  CampaignCreateProps,
  CampaignCreateState
> {
  campaignNameRef = null;

  style = CampaignCreateStyle;

  references = [];

  constructor(props: CampaignCreateProps) {
    super(props);
    this.state = {
      campaignName: '',
      actionCount: 7,
      prizeCount: 1,
      campaignType: 1,
      loading: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const campaign: Campaign = navigation.getParam('campaign');

    if (campaign) {
      this.setState({
        campaignName: campaign.campaignName,
        actionCount: campaign.actionCount,
        campaignType: campaign.campaignType,
        prizeCount: campaign.prizeCount,
      });
    }
  }

  handleSubmit = () => {
    const {campaignName, actionCount, prizeCount, campaignType} = this.state;
    const {navigation} = this.props;
    const campaign: Campaign = navigation.getParam('campaign');

    if (campaignName.length < 4) {
      return this.campaignNameRef.shake();
    }
    this.setState({loading: true});

    if (campaign) {
      return CreateCampaignService.updateCampaign(
        campaign.campaignId,
        actionCount,
        campaignName,
        campaignType,
        prizeCount,
      ).then(() => {
        navigation.navigate('Home');
      });
    }
    return CreateCampaignService.newCampaign(
      actionCount,
      campaignName,
      campaignType,
      prizeCount,
    ).then(() => {
      navigation.navigate('Home');
    });
  };

  public render() {
    const {navigation} = this.props;
    const {campaignName, actionCount, prizeCount, campaignType, loading} = this.state;
    const isItEditPage = navigation.getParam('edit');
    const campaign: Campaign = navigation.getParam('campaign');

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
            }}
            onLeftPress={() => {
              return null;
            }}
          />
        </View>

        <ScrollView
          style={this.style.scrollView}
          contentContainerStyle={this.style.scrollViewContainer}>
          <View style={this.style.listHeader}>
            <Text style={this.style.listHeaderTextLight}>Müşterilerinin Müdavimi Olacağı</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              {campaign ? 'Kampanyanı Düzenle' : 'Kampanyalar Oluştur'}
            </Text>
          </View>
          <View style={this.style.inputsContainer}>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Kampanya Adı</Text>
              <Animatable.View
                ref={ref => {
                  this.campaignNameRef = ref;
                }}>
                <TextInput
                  style={this.style.input}
                  placeholder="Örn: Filtre Kahve Kampanyası"
                  placeholderTextColor={Colors.SECONDARY}
                  selectionColor={Colors.PRIMARY}
                  value={campaignName}
                  onChangeText={text => this.setState({campaignName: text})}
                  autoCapitalize="none"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </Animatable.View>
            </View>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>İşlem Sayısı</Text>
              <View style={this.style.dropdownAreaContainer}>
                <Text style={this.style.dropdownPlaceholder}>Örn: 7 Filtre kahve işleminde</Text>
                <View style={this.style.dropdownContainer}>
                  <Dropdown
                    value={actionCount}
                    onChangeText={value => this.setState({actionCount: value})}
                    data={[
                      {value: 1, label: 1},
                      {value: 2, label: 2},
                      {value: 3, label: 3},
                      {value: 4, label: 4},
                      {value: 5, label: 5},
                      {value: 6, label: 6},
                      {value: 7, label: 7},
                      {value: 8, label: 8},
                      {value: 9, label: 9},
                      {value: 10, label: 10},
                      {value: 11, label: 11},
                      {value: 12, label: 12},
                      {value: 13, label: 13},
                      {value: 14, label: 14},
                      {value: 15, label: 15},
                    ]}
                    itemTextStyle={this.style.dropdownText}
                    inputContainerStyle={this.style.dropdownInputContainerStyle}
                    containerStyle={this.style.dropdownInnerContainer}
                    textColor={Colors.COMPANY}
                    fontSize={16}
                  />
                </View>
              </View>
            </View>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Ödül sayısı Sayısı</Text>
              <View style={this.style.dropdownAreaContainer}>
                <Text style={this.style.dropdownPlaceholder}>Örn: 1 Filtre Kahve hediye</Text>
                <View style={this.style.dropdownContainer}>
                  <Dropdown
                    value={prizeCount}
                    onChangeText={value => this.setState({prizeCount: value})}
                    data={[
                      {value: 1, label: 1},
                      {value: 2, label: 2},
                      {value: 3, label: 3},
                      {value: 4, label: 4},
                      {value: 5, label: 5},
                      {value: 6, label: 6},
                      {value: 7, label: 7},
                      {value: 8, label: 8},
                      {value: 9, label: 9},
                      {value: 10, label: 10},
                      {value: 11, label: 11},
                      {value: 12, label: 12},
                      {value: 13, label: 13},
                      {value: 14, label: 14},
                      {value: 15, label: 15},
                    ]}
                    itemTextStyle={this.style.dropdownText}
                    inputContainerStyle={this.style.dropdownInputContainerStyle}
                    containerStyle={this.style.dropdownInnerContainer}
                    textColor={Colors.COMPANY}
                    fontSize={16}
                  />
                </View>
              </View>
            </View>
            <View style={this.style.inputContainer}>
              <Text style={this.style.inputText}>Kampanya Kategorisi</Text>
              <View style={this.style.dropdownAreaContainer}>
                <View style={[this.style.dropdownContainer, this.style.dropdownFullWidth]}>
                  <Dropdown
                    value={campaignType}
                    onChangeText={value => this.setState({campaignType: value})}
                    data={[
                      {value: 1, label: 'İçecek'},
                      {value: 2, label: 'Yemek'},
                      {value: 3, label: 'Tatlı'},
                    ]}
                    itemTextStyle={this.style.dropdownText}
                    containerStyle={this.style.dropdownInnerContainer}
                    textColor={Colors.PRIMARY}
                    fontSize={16}
                  />
                </View>
              </View>
            </View>
            <View style={this.style.buttonsContainer}>
              <View style={this.style.buttonContainer}>
                <Button
                  backgroundColor={Colors.COMPANY}
                  text={isItEditPage ? 'Kampanyayı Güncelle' : 'Kampanya Oluştur'}
                  textColor="#fff"
                  shadow
                  onPress={() => {
                    this.handleSubmit();
                  }}
                />
              </View>
              <View style={this.style.buttonContainer}>
                <Button
                  backgroundColor="transparent"
                  text="Kampanyayı durdur"
                  textColor={Colors.WARN}
                  shadow={false}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
