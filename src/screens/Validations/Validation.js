export const validateIntegrationInfoForm = (formData) => {
  let errors = {};

  if (!formData.get("name")) {
    errors.name = "Name is required";
  }


  const logo = formData.get("logo");
  if (logo) {
    if (!logo.type.startsWith("image/")) {
      errors.logo = "Please select an image file";
    } else if (logo.size > 50 * 1024) {
      errors.logo = "Image file size must be less than 50kb";
    }
  }


  return errors;
};

export const validateSftpForm = (formData) => {
  const errors = {};
  if (!formData.hostName) {
    errors.hostName = "Host Name is required";
  }
  if (!formData.userName) {
    errors.userName = "User Name is required";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  }
  if (!formData.port) {
    errors.port = "Port is required";
  }
  if (!formData.protocol) {
    errors.protocol = "Protocol is required";
  }
  if (!formData.urlPath) {
    errors.urlPath = "URL is required";
  }
  if (!formData.syncFrequency) {
    errors.syncFrequency = "Please Select Sync Frequency";
  }
  if (!formData.timeZone) {
    errors.timeZone = "Please Select TimeZone";
  }
  return errors;
};

export const validateHttpForm = (formData) => {
  const errors = {};

  if (!formData.urlPath) {
    errors.urlPath = "URL is required";
  }
  if (!formData.syncFrequency) {
    errors.syncFrequency = "Please Select Sync Frequency";
  }
  return errors;
};

export const validateMarketPlaceInfoForm = (formData) => {
  let errors = {};

  if (!formData.get("name")) {
    errors.name = "Market Place name is required";
  }

  const logo = formData.get("logo");
  if (logo && !logo.type.startsWith("image/")) {
    errors.logo = "Please select file";
  }

  return errors;
};
export const validateMarketPlaceProductSync=(formData)=>{
  const errors={};
  if (!formData.productSyncFrequency) {
    errors.productSyncFrequency = "Please Select Sync Frequency";
  }
  if (!formData.productTimeZone) {
    errors.productTimeZone = "Please Select TimeZone";
  }
  return errors;
};

export const validateMarketPlaceOrderSync=(formData)=>{
  const errors={};
  if (!formData.orderSyncFrequency) {
    errors.orderSyncFrequency = "Please Select Sync Frequency";
  }
  if (!formData.orderTimeZone) {
    errors.orderTimeZone = "Please Select TimeZone";
  }
  return errors;
}

export const validateMarketPlaceTrackingSync=(formData)=>{
  const errors={};
  if (!formData.trackingSyncFrequency) {
    errors.trackingSyncFrequency = "Please Select Sync Frequency";
  }
  if (!formData.trackingTimeZone) {
    errors.trackingTimeZone = "Please Select TimeZone";
  }
  return errors;
}