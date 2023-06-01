export const validateIntegrationInfoForm = (formData) => {

  let errors = {};
  const name = formData.get("name");
  if (!name) {

    errors.name = "Name is required";

  } else if (name.trim().length === 0) {

    errors.name = "Name cannot be whitespace only";

  } else if (name.length > 15) {

    errors.name = "Name must be less than or equal to 15 characters";

  } else if (!/^[a-zA-Z\s]+$/.test(name)) {

    errors.name = "Name can only contain alphabetic characters";

  }

  const logo = formData.get("logo");

  if (logo) {

    if (logo.size > 10 * 1024 * 1024) {

      errors.logo = "Image file size must be less than 10MB";

    } else if (!/\.(jpg|jpeg|png)$/i.test(logo.name)) {

      errors.logo = "Please select a logo file with a .jpg, .jpeg, or .png extension";

    }

  } else {

    errors.logo = "Please select a logo";

  }

  return errors;
};

export const validateSftpForm = (formData) => {
  const errors = {};

  const hostName = formData.get("hostName")
  const userName = formData.get("userName")
  const password = formData.get("password")
  const port = formData.get("port")
  const protocol = formData.get("protocol")
  const urlPath = formData.get("urlPath");
  const syncFrequency = formData.get("syncFrequency")
  const timeZone = formData.get("timeZone")
  
  if (!hostName) {

    errors.hostName = "Host Name is required";

  } else if (hostName.trim().length === 0) {

    errors.hostName = "Host Name cannot be whitespace only";

  } else if (hostName.length > 40) {

    errors.hostName = "Host Name must be less than or equal to 40 characters";

  }

  if (!userName) {

    errors.userName = "User Name is required";

  } else if (userName.trim().length === 0) {

    errors.userName = "User Name cannot be whitespace only";

  } else if (userName.length > 40) {

    errors.userName = "User Name must be less than or equal to 40 characters";

  }

  if (!password) {

    errors.password = "Password is required";

  } else if (password.trim().length === 0) {

    errors.password = "Password cannot be whitespace only";

  } 
  // else if (password.length < 8) {

  //   errors.password = "Password must be atleast 8 characters long";

  // } else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
    
  //   errors.password = "Password have at least one character uppercase, atleast one character lowercase, at least one digit and at least one special character."
  
  // }

  if(!port) {
    
    errors.port = "Port is required";
  
  } else if(!/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(port)) {

    errors.port = "Port must be a number between 1 and 65535";

  }

  if (!protocol) {
    errors.protocol = "Protocol is required";
  }

  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if(urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if(!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
  }


  if (!syncFrequency) {
    errors.syncFrequency = "Please Enter Frequency";
  }
  if (!timeZone) {
    errors.timeZone = "Please Select TimeZone";
  }

  return errors;
};
export const validateHttpForm = (formData) => {
  const errors = {};
  const urlPath = formData.get("urlPath")
  const syncFrequency = formData.get("syncFrequency")

  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if(urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if(!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
  }


  if (!syncFrequency) {
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
export const validateMarketPlaceProductSync = (formData) => {
  const errors = {};
 
  if (!formData.productTimeZone) {
    errors.productTimeZone = "Please Select TimeZone";
  }
  return errors;
};

export const validateMarketPlaceOrderSync = (formData) => {
  const errors = {};

  if (!formData.orderTimeZone) {
    errors.orderTimeZone = "Please Select TimeZone";
  }
  return errors;
}

export const validateMarketPlaceTrackingSync = (formData) => {
  const errors = {};
 
  if (!formData.trackingTimeZone) {
    errors.trackingTimeZone = "Please Select TimeZone";
  }
  return errors;
}

//Retailer Setting Validation
export const validateRetailerAccount = (formData) => {
  const errors = {};
  const storeName = formData.get("storeName")
  const endpointURL = formData.get("endpointURL")
  const authorizationToken = formData.get("authorizationToken")

  if (!storeName) {
    errors.storeName = "URL is required";
  } else if(storeName.trim().length === 0) {
    errors.storeName = "URL cannot be whitespace only";
  }

  if(!endpointURL) {
    errors.endpointURL = "API Endpoint is required";
  } else if(endpointURL.trim().length === 0) {
    errors.endpointURL = "API Endpoint cannot be whitespace only";
  }

  if (!authorizationToken) {
    errors.authorizationToken = "Authorization Token is required";
  } else if(authorizationToken.trim().length === 0) {
    errors.authorizationToken = "Authorization Token cannot be whitespace only";
  }
  return errors;
}

export const validatePriceCalculation = (formData) => {
  const errors = {}
 
  const multipleValue = formData.get("multipleValue")
  const fixedValue = formData.get("fixedValue")
  const taxValue = formData.get("taxValue")
  const discountValue = formData.get("discountValue")


  if(!multipleValue) {
    errors.multipleValue = "Multiple Value is required";
  } else if(multipleValue < 0) {
    errors.multipleValue = "Multiple Value cannot be negative";
  }

  if(!fixedValue) {
    errors.fixedValue = "Fixed Value is required";
  } else if(fixedValue < 0) {
    errors.fixedValue = "Fixed Value cannot be negative";
  }

  if(!taxValue) {
    errors.taxValue = "Tax Value is required";
  } else if(taxValue < 0) {
    errors.taxValue = "Tax Value cannot be negative";
  }

  if(!discountValue) {
    errors.discountValue = "Discount Value is required";
  } else if(discountValue < 0) {
    errors.discountValue = "Discount Value cannot be negative";
  }

  return errors;
}

//Profile Validation
export const validateProfile = (formData) => {
  const errors = {}
 
  const name = formData.get("name")
  const country = formData.get("country");
  const email = formData.get("email");
  const password = formData.get("password");

  if(!name) {
    errors.name = "Name is required";
  } else if(name.trim().length === 0) {
    errors.name = "Name can not be whitespace only";
  }  else if (name.length > 25) {
    errors.name = "Name must be less than or equal to 15 characters";
  }

  if(!email) {
    errors.email = "Email is required";
  } else if(email.trim().length === 0) {
    errors.email = "Email can not be whitespace only";
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Email is not valid";
  }

  if(!password) {
    errors.password = "Password is required";
  } else if(password.trim().length === 0) {
    errors.password = "Password can not be whitespace only";
  } else if(password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if(!country) {
    errors.country = "Country is required";
  }

  return errors;
}