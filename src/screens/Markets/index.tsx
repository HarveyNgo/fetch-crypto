import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {CryptoText, Skeleton} from '../../components/index';
import {styles} from './styles';
import {Icons} from '../../assets';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch} from '../../redux/hook/useAppDispatch';
import {getMarkets, getMarketSummaries} from '../../redux/slices/marketsSlice';
import {useAppSelector} from '../../redux/hook/useAppSelector';
import {GetMarketResponse, MarketData} from '../../types/markets';
import CoinButton from './components/CoinButton';
import CoinItem from './components/CoinItem';
import {useTranslation} from 'react-i18next';

const MarketsScreen = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const marketsData = useAppSelector(state => state.markets?.marketsData);
  const listRef = useRef<FlatList>(null);
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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [activeCoin]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getMarketsHandler();
    getMarketSummariesHandler();
  }, [getMarketSummariesHandler, getMarketsHandler]);

  const _renderDetailList = useMemo(() => {
    if (!getMarketsDataSuccess || !getMarketsSummariesDataSuccess) {
      return (
        <FlatList
          ref={listRef}
          style={styles.detailList}
          data={Array.from({length: 10})}
          keyExtractor={(it, index) => index.toString()}
          renderItem={() => <Skeleton width={'100%'} height={74} />}
        />
      );
    }
    setRefreshing(false);

    return (
      <FlatList
        ref={listRef}
        style={styles.detailList}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: {item: MarketData}) => (
          <CoinItem item={item} summaries={marketsSummariesData} />
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
    <View style={styles.outer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CryptoText style={styles.marketText}>{t('markets')}</CryptoText>
          <TouchableOpacity>
            <Image style={styles.searchIcon} source={Icons.search} />
          </TouchableOpacity>
        </View>

        <View style={styles.coinList}>{_renderCoinList}</View>

        {_renderDetailList}
      </SafeAreaView>
    </View>
  );
};

export default MarketsScreen;
