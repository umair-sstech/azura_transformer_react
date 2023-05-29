const API_BASE_URL = process.env.REACT_APP_API_URL_SUPPLIER;
const PRODUCT_API_URL=process.env.REACT_APP_API_URL_PRODUCT
const API_LOG=process.env.REACT_APP_URL_API_LOG
const API_RETAILER_URL=process.env.REACT_APP_RETAILER_SERVICE


export const API_PATH = {
  GET_LIST:`${API_BASE_URL}/integration/getIntegrationInfo`,
  CREATE_INTEGRATION_INFO: `${API_BASE_URL}/integration/createIntegrationInfo`,
  UPDATE_INTEGRATION_INFO:`${API_BASE_URL}/integration/updateIntegrationInfo`,
  GET_INTEGRATION_INFO_BY_ID: `${API_BASE_URL}/integration/getIntegrationInfoById?supplierId`,
  ADD_CSV_DATA:`${API_BASE_URL}/csv/storeCSVdata`,
  GET_PRODUCT_CATALOG:`${PRODUCT_API_URL}/product/getStanderdProductCatalog`,
  DATA_FILE_MAPPING:`${API_BASE_URL}/integration/createOrUpdateSupplierFields`,
  IMAGE_RESIZE:`${API_BASE_URL}/integration/createOrUpdateSupplierImageResize`,
  IMPORT_SETTING:`${API_BASE_URL}/integration/createOrUpdateSupplierImprortSetting`,
  BARCODE:`${API_BASE_URL}/integration/barcode`,
  GET_CRON_TIME:`${API_BASE_URL}/general/getCronTime`,
  GET_IMPORT_SETTING_DATA_BY_ID:`${API_BASE_URL}/Integration/getSupplierImprortSetting?supplierId`,
  MARKET_PLACE_SYNCSETTING:`${API_BASE_URL}/integration/createOrUpdateMarketplaceIntegratorSyncSetting`,
  CHANGE_STATUS: `${API_BASE_URL}/integration/changeIntegrationStatus`,
  GET_SUPPLIER_FILE_MAPPING:`${API_BASE_URL}/Integration/getSupplierFields?supplierId`,
  GET_API_LOG:`${API_LOG}/apiLog/getAPILogs`,
  GET_ACCOUNT:`${API_RETAILER_URL}/getRetailerIntegrationById`,
  CREAT_ACCOUNT_CONFIGURATION:`${API_RETAILER_URL}/createOrUpdateRetailerAccountConfig`,
  GET_CURRENCY:`${API_RETAILER_URL}/getCurrency`,

  CREAT_CURRENCY:`${API_RETAILER_URL}/createOrUpdateRetailerIntegrationForCurrency`,
GET_RETAILER_BY_ID:`${API_RETAILER_URL}/getRetailerIntegrationById`,

GET_RETAILER_MARKETPLACE:`${API_RETAILER_URL}/getMarketplaceList`,

CREATE_RETAILER_MARKETPLACE:`${API_RETAILER_URL}/createOrUpdateRetailerMarketplace`,

GET_RETAILER_PRICE_LIST:`${API_RETAILER_URL}/getPriceList`,

CREATE_RETAILER_PRICE:`${API_RETAILER_URL}/createOrUpdateRetailerPriceCalculation`,

GET_RETAILER_PRODUCT:`${API_RETAILER_URL}/getSupplierProduct`,

CREATE_RETAILER_CATEGORY:`${API_RETAILER_URL}/createOrUpdateRetailerCategory`,

CREATE_RETAILER_IMAGE:`${API_RETAILER_URL}/createOrUpdateRetailerImage`,
GET_RETAILER_IMAGE_LIST:`${API_RETAILER_URL}/getSupplierImageList`,

GET_RETAILER_SUPPLIER_LIST:`${API_RETAILER_URL}/getSupplierList`,
CREATE_RETAILER_SUPPLIER:`${API_RETAILER_URL}/createOrUpdateRetailerIntegration`,
GET_RETAILER_INTEGRATION_LIST:`${API_RETAILER_URL}/getRetailerIntegrationList`,
CHANGE_STATUS:`${API_RETAILER_URL}/changeRetailerIntegrationStatus`,
API_LOGS:`${API_RETAILER_URL}/changeRetailerIntegrationStatus`,












};
