import { wrapper } from "@/redux/store";
import "@/styles/globals.scss";
import { Inter } from "@next/font/google";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
