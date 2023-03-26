import { Product } from "@/models/Product.model";
import { SearchFilters as SearchFilters } from "@/models/PriceFilter.model";
import { SearchSort } from "@/models/SearchSort.model";
import type { GetProductsResult } from "@/pages/api/products";
import merge from "lodash/merge";
import { useRouter } from "next/router";
import qs from "qs";
import { createContext, useCallback, useReducer } from "react";
import useSwr from "swr";

type QueryType = {
  search: string | string[] | undefined;
  sort?: SearchSort;
  filters?: Array<{ id: string; value: any }>;
};

type SearchParameters = {
  sorts: SearchSort[];
  filters: SearchFilters[];
};

type ContextValueType = {
  query: QueryType;
  parameters: SearchParameters;
  products: Product[];
  actions: {
    updateQuery: (query: Partial<QueryType>) => void;
    updateSearchResult: (
      products: Product[],
      parameters: SearchParameters
    ) => void;
  };
};

type ActionTypes =
  | { type: "updateQuery"; value: Partial<QueryType> }
  | {
      type: "updateSearchResult";
      value: Parameters<ContextValueType["actions"]["updateSearchResult"]>;
    };

export const GlobalContext = createContext<ContextValueType>({
  query: {
    search: "",
    sort: undefined,
    filters: undefined,
  },
  parameters: {
    sorts: [],
    filters: [],
  },
  products: [],
  actions: {
    updateQuery: () => {},
    updateSearchResult: () => {},
  },
});

function reducer(
  state: Omit<ContextValueType, "actions">,
  action: ActionTypes
): Omit<ContextValueType, "actions"> {
  switch (action.type) {
    case "updateQuery":
      return { ...state, query: merge({}, state.query, action.value) };
    case "updateSearchResult":
      return {
        ...state,
        products: action.value[0],
        parameters: action.value[1],
      };
    default:
      return state;
  }
}

GlobalContext.displayName = "GlobalContext";

export const GlobalContextProvider = ({
  children,
  initialValues,
}: {
  children: any;
  initialValues: Omit<ContextValueType, "actions">;
}): JSX.Element => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialValues);
  const getQueryString = useCallback(
    (query: Partial<QueryType>) =>
      qs.stringify(
        {
          search: query.search,
          sort: query.sort?.id,
          ...Object.fromEntries(
            query.filters?.map((e) => [e.id, e.value]) ?? []
          ),
        },
        {
          skipNulls: true,
          encode: false,
        }
      ),
    []
  );

  const updateQuery = useCallback<ContextValueType["actions"]["updateQuery"]>(
    (update) => {
      const query = merge({}, state.query, update);

      dispatch({ type: "updateQuery", value: query });

      router.push(
        { pathname: router.pathname, query: getQueryString(query) },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [dispatch, getQueryString, router, state]
  );

  const updateSearchResult = useCallback<
    ContextValueType["actions"]["updateSearchResult"]
  >(
    (...args) => {
      dispatch({ type: "updateSearchResult", value: args });
    },
    [dispatch]
  );

  useSwr<GetProductsResult>(`/api/products?${getQueryString(state.query)}`, {
    onSuccess: (data) => {
      updateSearchResult(data.products, {
        sorts: data.available_sorts,
        filters: data.available_filters,
      });
    },
  });

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        actions: { updateQuery, updateSearchResult },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
