export const validateIntegrationInfoForm = (formData) => {
  let errors = {};
  const name = formData.get("name");
  if (!name) {
    errors.name = "Name is required";
  } else if (name.trim().length === 0) {
    errors.name = "Name cannot be whitespace only";
  } else if (name.length > 50) {
    errors.name = "Name must be less than or equal to 50 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.name = "Name can only contain alphabetic characters";
  }

  const logo = formData.get("logo");

  if (logo) {
    if (logo.size > 10 * 1024 * 1024) {
      errors.logo = "Image file size must be less than 10MB";
    } else if (!/\.(jpg|jpeg|png)$/i.test(logo.name)) {
      errors.logo =
        "Please select a logo file with a .jpg, .jpeg, or .png extension";
    }
  } else {
    errors.logo = "Please select a logo";
  }

  return errors;
};

export const validateSftpForm = (formData) => {
  const errors = {};

  const hostName = formData.get("hostName");
  const userName = formData.get("userName");
  const password = formData.get("password");
  const port = formData.get("port");
  const protocol = formData.get("protocol");
  const urlPath = formData.get("urlPath");
  // const timeZone = formData.get("timeZone");

  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter week between 100 characters";
  }

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

  if (!port) {
    errors.port = "Port is required";
  } else if (
    !/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(
      port
    )
  ) {
    errors.port = "Port must be a number between 1 and 65535";
  }

  if (!protocol) {
    errors.protocol = "Protocol is required";
  }

  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if (urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if (!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
  }

  // if (!timeZone) {
  //   errors.timeZone = "Please Select TimeZone";
  // }

  return errors;
};

export const validateHttpForm = (formData) => {
  const errors = {};
  const urlPath = formData.get("urlPath");
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute =
      "Minute must contain only digits, '*', or '*/' followed by digits";
  } else if (minute.length > 100) {
    errors.minute = "Please enter minute within 100 characters";
  }
  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please enter hour up to 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Month is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please enter month up to 100 characters";
  }

  if (!week) {
    errors.week = "Day (Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please enter week up to 100 characters";
  }

  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if (urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if (!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
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

  const hostName = formData.get("hostName");
  const userName = formData.get("userName");
  const password = formData.get("password");
  const port = formData.get("port");
  const protocol = formData.get("protocol");
  const urlPath = formData.get("urlPath");
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const productTimeZone = formData.get("productTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }


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

  if (!port) {
    errors.port = "Port is required";
  } else if (
    !/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(
      port
    )
  ) {
    errors.port = "Port must be a number between 1 and 65535";
  }

  if (!protocol) {
    errors.protocol = "Protocol is required";
  }

  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if (urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if (!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
  }

  // if (!productTimeZone) {
  //   errors.productTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

export const validateMarketPlaceOrderSync = (formData) => {
  const errors = {};
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const orderTimeZone = formData.get("orderTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  // if (!orderTimeZone) {
  //   errors.orderTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

export const validateMarketPlaceTrackingSync = (formData) => {
  const errors = {};
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const trackingTimeZone = formData.get("trackingTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  // if (!trackingTimeZone) {
  //   errors.trackingTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

//Retailer Setting Validation
export const validateRetailerAccount = (formData) => {
  const errors = {};
  const storeName = formData.get("storeName");
  const endpointURL = formData.get("endpointURL");
  const authorizationToken = formData.get("authorizationToken");

  if (!storeName) {
    errors.storeName = "URL is required";
  } else if (storeName.trim().length === 0) {
    errors.storeName = "URL cannot be whitespace only";
  }

  if (!endpointURL) {
    errors.endpointURL = "API Endpoint is required";
  } else if (endpointURL.trim().length === 0) {
    errors.endpointURL = "API Endpoint cannot be whitespace only";
  }

  if (!authorizationToken) {
    errors.authorizationToken = "Authorization Token is required";
  } else if (authorizationToken.trim().length === 0) {
    errors.authorizationToken = "Authorization Token cannot be whitespace only";
  }
  return errors;
};

export const validatePriceCalculation = (formData) => {
  const errors = {};

  const multipleValue = formData.get("multipleValue");
  const fixedValue = formData.get("fixedValue");
  const taxValue = formData.get("taxValue");
  const discountValue = formData.get("discountValue");

  if (!multipleValue) {
    errors.multipleValue = "Multiple Value is required";
  } else if (multipleValue < 0) {
    errors.multipleValue = "Multiple Value cannot be negative";
  }

  if (!fixedValue) {
    errors.fixedValue = "Fixed Value is required";
  } else if (fixedValue < 0) {
    errors.fixedValue = "Fixed Value cannot be negative";
  }

  if (!taxValue) {
    errors.taxValue = "Tax Value is required";
  } else if (taxValue < 0) {
    errors.taxValue = "Tax Value cannot be negative";
  }

  if (!discountValue) {
    errors.discountValue = "Discount Value is required";
  } else if (discountValue < 0) {
    errors.discountValue = "Discount Value cannot be negative";
  }

  return errors;
};

//Profile Validation
export const validateProfile = (formData) => {
  const errors = {};

  const name = formData.get("name");
  const country = formData.get("country");
  const email = formData.get("email");
  // const password = formData.get("password");

  if (!name) {
    errors.name = "Name is required";
  } else if (name.trim().length === 0) {
    errors.name = "Name can not be whitespace only";
  } else if (name.length > 25) {
    errors.name = "Name must be less than or equal to 25 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (email.trim().length === 0) {
    errors.email = "Email can not be whitespace only";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Email is not valid";
  }

  // if (!password) {
  //   errors.password = "Password is required";
  // } else if (password.trim().length === 0) {
  //   errors.password = "Password can not be whitespace only";
  // } else if (password.length < 6) {
  //   errors.password = "Password must be at least 6 characters";
  // }

  if (!country) {
    errors.country = "Country is required";
  }

  return errors;
};

//Integrator Page - 3
export const validateIntegratorProductSync = (formData) => {
  const errors = {};
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const productTimeZone = formData.get("productTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  // if (!productTimeZone) {
  //   errors.productTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

export const validateIntegratorOrderSync = (formData) => {
  const errors = {};
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const orderTimeZone = formData.get("orderTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  // if (!orderTimeZone) {
  //   errors.orderTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

export const validateIntegratorTrackingSync = (formData) => {
  const errors = {};
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  // const trackingTimeZone = formData.get("trackingTimeZone");

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  // if (!trackingTimeZone) {
  //   errors.trackingTimeZone = "Please Select TimeZone";
  // }
  return errors;
};

export const validateHttpBucket = (formData) => {
  const errors = {};
  const bucketName = formData.get("bucketName");
  const secretKey = formData.get("secretKey");
  const secretPassword = formData.get("secretPassword");
  const awsRegion = formData.get("awsRegion");
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");

  if (!bucketName) {
    errors.bucketName = "Bucket Name is Required.";
  } else if (bucketName.trim().length === 0) {
    errors.bucketName = "Bucket name can not be whitespace only";
  }

  if (!secretKey) {
    errors.secretKey = "Secret Key is Required.";
  } else if (secretKey.trim().length === 0) {
    errors.secretKey = "Secret Key can not be whitespace only";
  }

  if (!secretPassword) {
    errors.secretPassword = "Password is required.";
  } else if (secretPassword.trim().length === 0) {
    errors.secretPassword = "Password can not be whitespace only";
  } else if (secretPassword.length > 50) {
    errors.secretPassword = "Password must be less than 50 characters.";
  }
  if (!awsRegion) {
    errors.awsRegion = "AWS Region Name is Required.";
  } else if (awsRegion.trim().length === 0) {
    errors.awsRegion = "AWS Region can not be whitespace only";
  }
  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  return errors;
};

export const validateSftpFtp = (formData) => {
  const errors = {};
  const hostName = formData.get("hostName");
  const ftpUserName = formData.get("ftpUserName");
  const password = formData.get("password");
  const port = formData.get("port");
  const protocol = formData.get("protocol");
  const minute = formData.get("minute");
  const hour = formData.get("hour");
  const day = formData.get("day");
  const month = formData.get("month");
  const week = formData.get("week");
  const urlPath = formData.get("urlPath");

  if (!hostName) {
    errors.hostName = "Host Name is Required.";
  } else if (hostName.trim().length === 0) {
    errors.hostName = "Host name can not be whitespace only";
  }

  if (!ftpUserName) {
    errors.ftpUserName = "UserName is Required.";
  } else if (ftpUserName.trim().length === 0) {
    errors.ftpUserName = "User name can not be whitespace only";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.trim().length === 0) {
    errors.password = "Password can not be whitespace only";
  } else if (password.length > 50) {
    errors.password = "Password must be less than 50 characters";
  }

  if (!minute) {
    errors.minute = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(minute)) {
    errors.minute = "Minute must contain only digits or '*'";
  } else if (minute.length > 100) {
    errors.minute = "Please Enter Minute between 100 characters";
  }

  if (!hour) {
    errors.hour = "Hour is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(hour)) {
    errors.hour = "Hour must contain only digits or '*'";
  } else if (hour.length > 100) {
    errors.hour = "Please Enter Hour between 100 characters";
  }

  if (!day) {
    errors.day = "Day(Month) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(day)) {
    errors.day = "Day must contain only digits or '*'";
  } else if (day.length > 100) {
    errors.day = "Please Enter Day between 100 characters";
  }

  if (!month) {
    errors.month = "Minute is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(month)) {
    errors.month = "Month must contain only digits or '*'";
  } else if (month.length > 100) {
    errors.month = "Please Enter Month between 100 characters";
  }

  if (!week) {
    errors.week = "Day(Week) is required";
  } else if (!/^(?:\d+|\*)+(?:\/(?:\d+|\*)+)*$/.test(week)) {
    errors.week = "Week must contain only digits or '*'";
  } else if (week.length > 100) {
    errors.week = "Please Enter Week between 100 characters";
  }

  if (!protocol) {
    errors.protocol = "Protocol is required";
  }

  if (!port) {
    errors.port = "Port number is Required";
  }
  if (!urlPath) {
    errors.urlPath = "URL is required";
  } else if (urlPath.trim().length === 0) {
    errors.urlPath = "URL cannot be whitespace only";
  } else if (!/([a-zA-Z0-9\s_\\.\-\(\):])+\.[^.]+/i.test(urlPath)) {
    errors.urlPath = "URL must be a valid URL";
  }

  return errors;
};
