import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors.ts';

export const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Colors.marketBackgroud,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 28,
  },
  marketText: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: Colors.black,
    letterSpacing: 0.5,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 19,
  },
  coinList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 15,
  },
  detailList: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
});
