import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {CryptoText} from '../../components';
import {styles} from './styles';
import {Icons} from '../../assets';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from '../../redux/hook/useAppDispatch';
import {getMarkets, getMarketSummaries} from '../../redux/slices/marketsSlice';
import {useAppSelector} from '../../redux/hook/useAppSelector';
import {GetMarketResponse, MarketData} from '../../types/markets';
import CoinButton from './components/CoinButton';
import CoinCard from './components/CoinCard';
import Skeleton from '../../components/Skeleton';

const MarketsScreen = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector(state => state.markets?.marketsData);
  const marketsSummariesData = useAppSelector(
    state => state.markets?.marketsSummariesData,
  );
  const getMarketsDataSuccess = useAppSelector(
    state => state.markets?.getMarketsDataSuccess,
  );
  const getMarketsSummariesDataSuccess = useAppSelector(
    state => state.markets?.getMarketsSummariesDataSuccess,
  );
  const [activeCoin, setActiveCoin] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const getMarketsHandler = useCallback(() => {
    dispatch(getMarkets({}))
      .unwrap()
      .then(data => {
        if (data.data) {
          setActiveCoin(data?.data[0].title);
        }
      });
  }, [dispatch]);

  const getMarketSummariesHandler = useCallback(() => {
    dispatch(getMarketSummaries({}))
      .unwrap()
      .then(() => {});
  }, [dispatch]);

  useEffect(() => {
    getMarketsHandler();
    getMarketSummariesHandler();
  }, [getMarketSummariesHandler, getMarketsHandler]);

  const filteredData = useMemo(() => {
    return (
      marketsData?.find((coin: GetMarketResponse) => coin.title === activeCoin)
        ?.list || []
    );
  }, [activeCoin, marketsData]);
  console.log('hung filteredData:', filteredData);
  const _renderCoinList = useMemo(() => {
    if (!getMarketsDataSuccess) {
      return <Skeleton width={100} height={32} />;
    }
    const coinList = marketsData?.map(coin => coin.title);

    return coinList?.map((coin: string) => (
      <TouchableOpacity key={coin} onPress={() => setActiveCoin(coin)}>
        <CoinButton
          name={coin}
          isActive={activeCoin === coin}
          length={coinList?.length}
        />
      </TouchableOpacity>
    ));
  }, [activeCoin, getMarketsDataSuccess, marketsData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getMarketsHandler();
    getMarketSummariesHandler();
  }, [getMarketSummariesHandler, getMarketsHandler]);

  const _renderList = useMemo(() => {
    if (!getMarketsDataSuccess || !getMarketsSummariesDataSuccess) {
      return (
        <FlatList
          // ref={listRef}
          style={styles.list}
          data={Array.from({length: 10})}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <Skeleton width={'100%'} height={74} />}
        />
      );
    }
    setRefreshing(false);

    return (
      <FlatList
        // ref={listRef}
        style={styles.list}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: {item: MarketData}) => (
          <CoinCard item={item} summaries={marketsSummariesData} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  }, [
    filteredData,
    getMarketsDataSuccess,
    getMarketsSummariesDataSuccess,
    marketsSummariesData,
    onRefresh,
    refreshing,
  ]);

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
      <View style={styles.coinList}>{_renderCoinList}</View>

      {_renderList}
    </SafeAreaView>
  );
};

export default MarketsScreen;
