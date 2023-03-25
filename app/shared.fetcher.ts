import axios from "axios";

export const fetcher = <T = any>(url: string) =>
  axios.get<T>(url).then((r) => r.data);
