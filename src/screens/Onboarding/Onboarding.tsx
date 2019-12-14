import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import OnboardingStyle from './Onboarding.style';
import Colors from '../../styles/Colors';

export default class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    const s = OnboardingStyle;
    const pageImageRefs = [];
    return (
      <View style={s.container}>
        <View style={s.swiperContainer}>
          <Swiper
            loop={false}
            paginationStyle={s.pagination}
            dotColor="#D8DFE8"
            activeDotColor={Colors.PRIMARY}
            onIndexChanged={index => {
              if (index === 0) {
                pageImageRefs[0].bounceIn();
                return;
              }
              if (index === 1) {
                pageImageRefs[1].bounce();
                return;
              }
              pageImageRefs[2].fadeIn();
            }}
            // eslint-disable-next-line react/jsx-closing-bracket-location
            showsButtons={false}>
            <View style={s.itemContainer}>
              <Animatable.Image
                ref={ref => {
                  pageImageRefs[0] = ref;
                }}
                animation="bounceIn" // for starting animation
                source={require('./images/page1.png')}
                style={s.image}
              />
              <Text style={s.title}>Arda kafede günde 2 bardak kahve içiyor</Text>
              <View style={s.line} />
              <Text style={s.subtitle}>
                Pingain işletmelerden topladığınız pinler sayesinde ödüller kazanmanızı sağlıyor!
              </Text>
            </View>
            <View style={s.itemContainer}>
              <Animatable.Image
                source={require('./images/page2.png')}
                style={s.image}
                ref={ref => {
                  pageImageRefs[1] = ref;
                }}
              />
              <Text style={s.title}>Melis ise butik bir kafesi olan işletmeci</Text>
              <View style={s.line} />
              <Text style={s.subtitle}>
                İşletmeler, Arda ve diğer kullanıcılarımıza özel birçok kampanyalar yayınlıyorlar!
              </Text>
            </View>
            <View style={s.itemContainer}>
              <Animatable.Image
                ref={ref => {
                  pageImageRefs[2] = ref;
                }}
                source={require('./images/page3.png')}
                style={s.image}
              />
              <Text style={s.title}>Hikayenin sonu ise ikramlar ve ödüller…</Text>
              <View style={s.line} />
              <Text style={s.subtitle}>
                Arda, Melis’in işletmesinde topladığı 6 pin ile 7. kahvesini ücretsiz ve keyifle
                içiyor!
              </Text>
            </View>
          </Swiper>
        </View>

        <View style={s.bottomLine}>
          <TouchableOpacity style={s.startButton}>
            <Text style={s.startText}>Başlayalım!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
