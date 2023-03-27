import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const isServer = typeof window === "undefined";

export const fetcher = <T = any>(url: string) =>
  axios
    .get<T>(url, {
      baseURL: isServer ? `http://${publicRuntimeConfig.host}` : "",
    })
    .then((r) => r.data);
