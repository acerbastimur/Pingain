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
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';

import Swiper from 'react-native-swiper';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';
import CompanyDetailsStyle from './CompanyDetails.style';
import TabsHeader from '../TabsHeader';
import Colors from '../../styles/Colors';
import CompanyCard from '../CompanyCard';

export interface CompanyDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CompanyDetails = ({navigation}: CompanyDetailsProps) => {
  const style = CompanyDetailsStyle;

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
              <Image
                source={require('../../assets/image/User/CoffeeExample/photo1.jpg')}
                style={style.swipeImage}
              />
              <Image
                source={require('../../assets/image/User/CoffeeExample/photo2.jpg')}
                style={style.swipeImage}
              />
              <Image
                source={require('../../assets/image/User/CoffeeExample/photo3.jpg')}
                style={style.swipeImage}
              />
            </Swiper>
          </View>
          <Card elevation={6} opacity={0.15} style={style.companyInformationContainer}>
            <View style={style.cardHeader}>
              <View style={style.companyImageContainer}>
                <Image
                  source={require('../../assets/image/User/cafeImageExample.png')}
                  style={style.companyImage}
                />
              </View>
              <Text style={style.cardHeaderText}>Cafe Rien</Text>
              <TouchableOpacity style={style.followButton}>
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
                <View style={style.companyFeatureCard}>
                  <Image
                    style={style.companyFeatureCardImage}
                    source={require('../../assets/image/User/wifi-line.png')}
                  />
                  <Text style={style.companyFeatureCardText}>Wifi</Text>
                </View>
                <View style={style.companyFeatureCard}>
                  <Image
                    style={style.companyFeatureCardImage}
                    source={require('../../assets/image/User/plugIcon.png')}
                  />
                  <Text style={style.companyFeatureCardText}>Şarj</Text>
                </View>
                <View style={style.companyFeatureCard}>
                  <Image
                    style={style.companyFeatureCardImage}
                    source={require('../../assets/image/User/mute.png')}
                  />
                  <Text style={style.companyFeatureCardText}>Sessiz</Text>
                </View>
                <View style={style.companyFeatureCard}>
                  <Image
                    style={style.companyFeatureCardImage}
                    source={require('../../assets/image/User/animalIcon.png')}
                  />
                  <Text style={style.companyFeatureCardText}>Hayvansever</Text>
                </View>
              </ScrollView>
            </View>
            <View style={style.phoneArea}>
              <Image
                style={style.phoneIcon}
                source={require('../../assets/image/User/phoneIcon.png')}
              />
              <Text style={style.contactText}>0 (232) 290 7481</Text>
            </View>
            <View style={style.locationArea}>
              <Image
                style={style.locationIcon}
                source={require('../../assets/image/User/locationIcon.png')}
              />
              <Text style={style.contactText} numberOfLines={1}>
                İYTE, İnovasyon Merkezi A10 BinasI 3554 sokak, numara:12 Urla/İzmir
              </Text>
            </View>
          </Card>

          <View>
            <Text style={style.campaigns}>Kampanyalarımız</Text>
            <CompanyCard navigation={navigation} isCampaign1Done shouldHeaderHide />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CompanyDetails;
