import * as React from 'react';
import {View, Text, Button} from 'react-native';
import 'react-native-gesture-handler';

export interface AppState {
  myNumber: number;
}

export default class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      myNumber: 0,
    };
  }

  public render() {
    const {myNumber} = this.state;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{margin: 100}}>
        <Button
          title="Arttır"
          onPress={() => {
            this.setState({
              myNumber: myNumber + 1,
            });
          }}
        />
        <Text>{myNumber}</Text>
      </View>
    );
  }
}
