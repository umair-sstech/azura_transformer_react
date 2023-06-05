import { createContext } from "react";

export const ProductContext = createContext({
  product: {},
  customFields: [], // Add customFields property to the initial context value
});


