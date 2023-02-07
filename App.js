import { StyleSheet, View } from 'react-native';
import {Dimensions} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { MainScreen } from './src/screens/MainScreen';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  return (
    <NativeBaseProvider>
      <View style = {styles.container}>
        <MainScreen/>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#gggg',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    flex: 1,
    flexDirection: 'column'
  },
});
