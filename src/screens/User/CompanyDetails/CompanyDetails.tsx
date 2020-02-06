/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity, Linking} from 'react-native';

import Swiper from 'react-native-swiper';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';
import CompanyDetailsStyle from './CompanyDetails.style';
import TabsHeader from '../../../common-components/TabsHeader';
import Colors from '../../../styles/Colors';
import CompanyCard from '../CompanyCard';
import {UserCompany} from '../../../schemes/user/UserCompany';

export interface CompanyDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const companyFeatureCard = (featureNo: number) => {
  const style = CompanyDetailsStyle;

  switch (featureNo) {
    case 1:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/wifi.png')}
          />
          <Text style={style.companyFeatureCardText}>İnternet</Text>
        </View>
      );
    case 2:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/electricity.png')}
          />
          <Text style={style.companyFeatureCardText}>Şarj</Text>
        </View>
      );
    case 3:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/animal.png')}
          />
          <Text style={style.companyFeatureCardText}>Hayvansever</Text>
        </View>
      );
    case 4:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/matchStream.png')}
          />
          <Text style={style.companyFeatureCardText}>Maç Yayını</Text>
        </View>
      );

    case 5:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/self-service.png')}
          />
          <Text style={style.companyFeatureCardText}>Self Servis</Text>
        </View>
      );

    case 6:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/outdoor.png')}
          />
          <Text style={style.companyFeatureCardText}>Dış Mekan</Text>
        </View>
      );

    case 7:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/liveMusic.png')}
          />
          <Text style={style.companyFeatureCardText}>Canlı Müzik</Text>
        </View>
      );

    case 8:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/packageService.png')}
          />
          <Text style={style.companyFeatureCardText}>Paket Servis</Text>
        </View>
      );

    case 9:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/reservation.png')}
          />
          <Text style={style.companyFeatureCardText}>Rezervasyon</Text>
        </View>
      );

    case 10:
      return (
        <View key={Math.random() * 1000} style={style.companyFeatureCard}>
          <Image
            style={style.companyFeatureCardImage}
            source={require('../../../assets/image/User/CompanyFeatures/slience.png')}
          />
          <Text style={style.companyFeatureCardText}>Sessiz</Text>
        </View>
      );

    default:
      return null;
  }
};

const CompanyDetails = ({navigation}: CompanyDetailsProps) => {
  const style = CompanyDetailsStyle;
  const company: UserCompany = navigation.getParam('company');

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <TabsHeader
          navigation={navigation}
          onRightPress={() => {
            navigation.navigate('UserDetails');
          }}
          onLeftPress={() => {
            return null;
          }}
        />
      </View>
      <View style={style.bodyContainer}>
        <ScrollView>
          <View style={style.swiperContainer}>
            <Swiper dotColor="#D8DFE8" activeDotColor={Colors.PRIMARY} showsButtons={false}>
              {company.companyImages.map(image => (
                <Image key={Math.random() * 1000} source={{uri: image}} style={style.swipeImage} />
              ))}
            </Swiper>
          </View>
          <Card elevation={6} opacity={0.15} style={style.companyInformationContainer}>
            <View style={style.cardHeader}>
              <View style={style.companyImageContainer}>
                <Image source={{uri: company.companyLogo}} style={style.companyImage} />
              </View>
              <Text style={style.cardHeaderText}>{company.companyName}</Text>
              <TouchableOpacity
                style={style.followButton}
                onPress={() => {
                  Linking.openURL(`instagram://user?username=${company.instagramAccount}`);
                }}>
                <Text style={style.followButtonText}>Takip et</Text>
              </TouchableOpacity>
            </View>
            <View style={style.line} />
            <View style={style.companyFeaturesContainer}>
              <ScrollView
                horizontal
                directionalLockEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {company.companyFeatures.map(featureNo => companyFeatureCard(featureNo))}
              </ScrollView>
            </View>
            <View style={style.phoneArea}>
              <Image
                style={style.phoneIcon}
                source={require('../../../assets/image/User/phoneIcon.png')}
              />
              <Text style={style.contactText}>{company.phoneNumber}</Text>
            </View>
            <View style={style.locationArea}>
              <Image
                style={style.locationIcon}
                source={require('../../../assets/image/User/locationIcon.png')}
              />
              <Text style={style.contactText} numberOfLines={1}>
                {company.address}
              </Text>
            </View>
          </Card>

          <View>
            <Text style={style.campaigns}>Kampanyalarımız</Text>
            {company.campaigns.map(campaign => {
              return (
                <CompanyCard
                  key={Math.random() * 100}
                  navigation={navigation}
                  company={company}
                  shouldHeaderHide
                />
              );
            })}
            {/*   */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CompanyDetails;
