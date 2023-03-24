import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
