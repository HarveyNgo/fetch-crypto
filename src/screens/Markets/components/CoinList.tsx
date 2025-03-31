import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CoinButton from './CoinButton';
import {Skeleton} from '../../../components/index';
import {useAppSelector} from '../../../redux/hook/useAppSelector';
import {FC, useMemo} from 'react';

type Props = {
  actionCoinHandler: (coin: string) => void;
  activeCoin: string | undefined;
};
const CoinList: FC<Props> = ({activeCoin, actionCoinHandler}) => {
  const getMarketsDataSuccess = useAppSelector(
    state => state.markets?.getMarketsDataSuccess,
  );
  const marketsData = useAppSelector(state => state.markets?.marketsData);

  const _renderCoinList = useMemo(() => {
    if (!getMarketsDataSuccess) {
      return <Skeleton width={100} height={32} />;
    }
    const coinList = marketsData?.map(coin => coin.title);

    return coinList?.map((coin: string) => (
      <TouchableOpacity key={coin} onPress={() => actionCoinHandler(coin)}>
        <CoinButton
          name={coin}
          isActive={activeCoin === coin}
          length={coinList?.length}
        />
      </TouchableOpacity>
    ));
  }, [actionCoinHandler, activeCoin, getMarketsDataSuccess, marketsData]);

  return <View style={styles.coinList}>{_renderCoinList}</View>;
};

export default CoinList;

export const styles = StyleSheet.create({
  coinList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 15,
  },
});
