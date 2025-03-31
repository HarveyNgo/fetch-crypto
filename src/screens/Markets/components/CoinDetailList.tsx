import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Skeleton} from '../../../components/index';
import {useAppSelector} from '../../../redux/hook/useAppSelector';
import {FC, useEffect, useMemo, useRef, useState} from 'react';
import CoinItem from './CoinItem';
import {MarketData} from '../../../types/markets';

type Props = {
  onRefresh: () => void;
  activeCoin: string | undefined;
  filteredData: MarketData[];
};
const CoinDetailList: FC<Props> = ({onRefresh, activeCoin, filteredData}) => {
  const listRef = useRef<FlatList>(null);
  const [refreshing, setRefreshing] = useState(false);
  const getMarketsDataSuccess = useAppSelector(
    state => state.markets?.getMarketsDataSuccess,
  );
  const getMarketsSummariesDataSuccess = useAppSelector(
    state => state.markets?.getMarketsSummariesDataSuccess,
  );
  const marketsSummariesData = useAppSelector(
    state => state.markets?.marketsSummariesData,
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [activeCoin]);

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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              onRefresh();
            }}
          />
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
  return <>{_renderDetailList}</>;
};

export default CoinDetailList;

export const styles = StyleSheet.create({
  detailList: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
});
