import { ApiClient } from "./apiClients";

export const { REACT_APP_CALCULATOR_BASE_URL } = process.env;

export const CALCULATOR_API = new ApiClient(
  REACT_APP_CALCULATOR_BASE_URL + "/api"
);
