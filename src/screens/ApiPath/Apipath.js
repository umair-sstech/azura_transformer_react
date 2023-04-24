const API_BASE_URL = process.env.REACT_APP_API_URL_SUPPLIER;
const PRODUCT_API_URL=process.env.REACT_APP_API_URL_PRODUCT
export const API_PATH = {
  GET_SUPPLIER_LIST:`${API_BASE_URL}/integration/getIntegrationInfo`,
  CREATE_INTEGRATION_INFO: `${API_BASE_URL}/integration/createIntegrationInfo`,
  UPDATE_INTEGRATION_INFO:`${API_BASE_URL}/integration/updateIntegrationInfo`,
  GET_INTEGRATION_INFO_BY_ID: `${API_BASE_URL}/integration/getIntegrationInfoById?supplierId`,
  ADD_CSV_DATA:`${API_BASE_URL}/csv/storeCSVdata`,
  GET_PRODUCT_CATALOG:`${PRODUCT_API_URL}/product/getStanderdProductCatalog`,
  DATA_FILE_MAPPING:`${API_BASE_URL}/integration/createOrUpdateSupplierFields`,
  IMAGE_RESIZE:`${API_BASE_URL}/integration/createOrUpdateSupplierImageResize`,
  IMPORT_SETTING:`${API_BASE_URL}/integration/createOrUpdateSupplierImprortSetting`,
  BARCODE:`${API_BASE_URL}/integration/barcod`
};
