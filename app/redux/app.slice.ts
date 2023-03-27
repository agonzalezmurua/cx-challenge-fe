import { SearchFilters } from "@/models/PriceFilter.model";
import { Product } from "@/models/Product.model";
import { SearchSort } from "@/models/SearchSort.model";
import { fetcher } from "@/shared.fetcher";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { HYDRATE } from "next-redux-wrapper";
import qs from "qs";
import type { AppState, AppThunk } from "./store";
import type { GetProductQuery, GetProductsResult } from "@/pages/api/products";
import Router from "next/router";

interface AppStateValue {
  query: GetProductQuery;
  /** Clientside parameters */
  parameters: {
    sorts: SearchSort[];
    filters: SearchFilters[];
  };
  products: Product[];
}

const initialState: AppStateValue = {
  query: {
    search: "",
  },
  products: [],
  parameters: {
    sorts: [],
    filters: [],
  },
};

const appSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateQuery: (
      state,
      action: PayloadAction<Partial<AppStateValue["query"]>>
    ) => {
      state.query = merge({}, state.query, action.payload);
    },
    updateSearchResult: (
      state,
      { payload }: PayloadAction<GetProductsResult>
    ) => {
      state.products = payload.products;
      state.query = payload.query;
      state.parameters = {
        filters: payload.available_filters,
        sorts: payload.available_sorts,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.app,
      };
    },
  },
});

export const { updateQuery, updateSearchResult } = appSlice.actions;
export const selectProducts = (state: AppState) => state.app.products;
export const selectQuery = (state: AppState) => state.app.query;
export const selectParameters = (state: AppState) => state.app.parameters;

type FetchProductsParams = {
  search?: string;
  sort?: string;
  price?: string;
};

function getProductFetchParams(query: GetProductQuery): FetchProductsParams {
  return {
    price: query.price,
    search: query.search,
    sort: query.sort?.id,
  };
}

export const fetchProducts =
  (query: Partial<FetchProductsParams>): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const queryObj = getProductFetchParams(state.app.query);

    const queryStr = qs.stringify(merge({}, queryObj, query), {
      skipNulls: true,
      encode: false,
    });

    // Update URL clientside
    if (typeof window !== "undefined")
      Router.push({ query: queryStr }, undefined, { shallow: true });

    const path = "/api/products?" + queryStr;

    const result = await fetcher<GetProductsResult>(path);

    dispatch(appSlice.actions.updateSearchResult(result));
  };

export default appSlice.reducer;
