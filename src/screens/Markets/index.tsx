import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {CryptoText} from '../../components';
import {styles} from './styles';
import {Icons} from '../../assets';

const MarketsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CryptoText style={styles.marketText} testID="markets-text">
          {'markets'}
        </CryptoText>
        <TouchableOpacity>
          <Image style={styles.searchIcon} source={Icons.search} />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.coinList}></View> */}
      {/* <View style={styles.coinList}>{_renderCoinList}</View> */}

      {/* {_renderList} */}
    </SafeAreaView>
  );
};

export default MarketsScreen;
