import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MARKET_BASE_URL} from '../../services/api';
import {ApiResponse} from '../../types/auth';
import createAxiosInstance from '../../services/api';
import {
  GetMarketResponse,
  getMarketsCredentials,
  MarketsState,
  MarketSummaries,
} from '../../types/markets';
import {GET_MARKETS_SUMMARIES, GET_MARKETS_URL} from '../../services/endpoint';

// Async thunks
export const getMarkets = createAsyncThunk<
  ApiResponse<GetMarketResponse[]>,
  getMarketsCredentials,
  {rejectValue: string}
>(GET_MARKETS_URL, async (credentials, {rejectWithValue}) => {
  try {
    const axiosInstance = await createAxiosInstance(MARKET_BASE_URL);
    const response = await axiosInstance.get<ApiResponse<GetMarketResponse[]>>(
      GET_MARKETS_URL,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Login failed. Please try again.',
    );
  }
});

export const getMarketSummaries = createAsyncThunk<
  ApiResponse<MarketSummaries[]>,
  getMarketsCredentials,
  {rejectValue: string}
>(GET_MARKETS_SUMMARIES, async (credentials, {rejectWithValue}) => {
  try {
    const axiosInstance = await createAxiosInstance(MARKET_BASE_URL);
    const response = await axiosInstance.get<ApiResponse<MarketSummaries[]>>(
      GET_MARKETS_SUMMARIES,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Please try again.',
    );
  }
});

const initialState: MarketsState = {
  marketsData: [],
  marketsSummariesData: [],
  getMarketsDataSuccess: false,
  getMarketsSummariesDataSuccess: false,
};

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMarkets.pending, state => {
        state.getMarketsDataSuccess = false;
      })
      .addCase(getMarkets.fulfilled, (state, action) => {
        state.getMarketsDataSuccess = true;
        state.marketsData = action.payload.data;
      })
      .addCase(getMarkets.rejected, () => {});

    builder
      .addCase(getMarketSummaries.pending, state => {
        state.getMarketsSummariesDataSuccess = false;
      })
      .addCase(getMarketSummaries.fulfilled, (state, action) => {
        state.marketsSummariesData = action.payload.data;
        state.getMarketsSummariesDataSuccess = true;
      })
      .addCase(getMarketSummaries.rejected, () => {});
  },
});

export const {} = marketsSlice.actions;
export default marketsSlice.reducer;
