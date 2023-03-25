import { Product } from "@/models/Product.model";
import merge from "lodash/merge";
import { useRouter } from "next/router";
import { createContext, useCallback, useReducer, useMemo } from "react";
import { SearchSort } from "./models/SearchSort.model";
import useSwr from "swr";
import qs from "qs";
import type { GetProductsResult } from "./pages/api/products";

type QueryType = {
  search: string | string[] | undefined;
  sort?: SearchSort;
};
type SearchParameters = {
  sorts: SearchSort[];
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
  },
  parameters: {
    sorts: [],
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
      return { ...state, query: merge(state.query, action.value) };
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
    (query: QueryType) =>
      qs.stringify({
        search: query.search,
        sort: query.sort?.id,
      }),
    []
  );

  const updateQuery = useCallback<ContextValueType["actions"]["updateQuery"]>(
    (query) => {
      const newQuery: QueryType = { search: query.search, sort: query.sort };

      router.push(
        { pathname: "/", query: getQueryString(newQuery) },
        undefined,
        {
          shallow: true,
        }
      );

      dispatch({ type: "updateQuery", value: newQuery });
    },
    [dispatch, getQueryString, router]
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
      updateSearchResult(data.products, { sorts: data.available_sorts });
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
