import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { createContext, useReducer, useCallback } from "react";

type QueryType =
  | ParsedUrlQuery
  | {
      search: string | string[] | undefined;
    };

type GlobalContextValue = {
  query: QueryType;
  products: Product[];
  actions: {
    updateQuery: (query: Partial<QueryType>) => void;
    updateProducts: (products: Product[]) => void;
  };
};

type ActionTypes =
  | { type: "updateQuery"; value: Partial<QueryType> }
  | {
      type: "updateProducts";
      value: Product[];
    };

export const GlobalContext = createContext<GlobalContextValue>({
  query: {
    search: "",
  },
  products: [],
  actions: {
    updateQuery: () => {},
    updateProducts: () => {},
  },
});

function reducer(
  state: Omit<GlobalContextValue, "actions">,
  action: ActionTypes
): Omit<GlobalContextValue, "actions"> {
  switch (action.type) {
    case "updateQuery":
      return { ...state, query: { ...state.query, ...action.value } };
    case "updateProducts":
      return { ...state, products: action.value };
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
  initialValues: Omit<GlobalContextValue, "actions">;
}): JSX.Element => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialValues);
  const updateQuery = useCallback<GlobalContextValue["actions"]["updateQuery"]>(
    (query) => {
      dispatch({ type: "updateQuery", value: query });
      router.push(
        { pathname: "/", query: { ...router.query, ...query } },
        undefined,
        { shallow: true }
      );
    },
    [dispatch, router]
  );
  const updateProducts = useCallback<
    GlobalContextValue["actions"]["updateProducts"]
  >(
    (products) => dispatch({ type: "updateProducts", value: products }),
    [dispatch]
  );

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        query: state.query,
        actions: { updateQuery, updateProducts },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
