import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {CryptoText} from '../../components/index';
import {styles} from './styles';
import {Icons} from '../../assets';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from '../../redux/hook/useAppDispatch';
import {getMarkets, getMarketSummaries} from '../../redux/slices/marketsSlice';
import {useAppSelector} from '../../redux/hook/useAppSelector';
import {GetMarketResponse} from '../../types/markets';
import {useTranslation} from 'react-i18next';
import {setError} from '../../redux/slices/commonSlide';
import CoinList from './components/CoinList';
import CoinDetailList from './components/CoinDetailList';

const MarketsScreen = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const marketsData = useAppSelector(state => state.markets?.marketsData);
  const [activeCoin, setActiveCoin] = useState<string | undefined>(undefined);

  const getMarketsHandler = useCallback(() => {
    dispatch(getMarkets({}))
      .unwrap()
      .then(data => {
        if (data.data) {
          setActiveCoin(data?.data[0].title);
        }
      })
      .catch((error: any) => {
        dispatch(setError(error));
      });
  }, [dispatch]);

  const getMarketSummariesHandler = useCallback(() => {
    dispatch(getMarketSummaries({}))
      .unwrap()
      .then(() => {})
      .catch((error: any) => {
        dispatch(setError(error));
      });
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

  const onRefresh = useCallback(async () => {
    getMarketsHandler();
    getMarketSummariesHandler();
  }, [getMarketSummariesHandler, getMarketsHandler]);

  return (
    <View style={styles.outer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CryptoText style={styles.marketText}>{t('markets')}</CryptoText>
          <TouchableOpacity>
            <Image style={styles.searchIcon} source={Icons.search} />
          </TouchableOpacity>
        </View>

        <CoinList
          actionCoinHandler={(coin: string) => {
            setActiveCoin(coin);
          }}
          activeCoin={activeCoin}
        />
        <CoinDetailList
          onRefresh={onRefresh}
          activeCoin={activeCoin}
          filteredData={filteredData}
        />
      </SafeAreaView>
    </View>
  );
};

export default MarketsScreen;
