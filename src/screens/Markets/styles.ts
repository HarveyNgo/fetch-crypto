import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  marketText: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: Colors.black,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  coinList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  list: {
    backgroundColor: 'transparent',
  },
});
