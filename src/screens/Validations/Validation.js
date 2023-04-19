export const validateSupplierInfoForm = (formData) => {
  let errors = {};

  if (!formData.get("suplirName")) {
    errors.suplirName = "Supplier name is required";
  }

  const logo = formData.get("supplireLogo");
  if (logo && !logo.type.startsWith("image/")) {
    errors.supplireLogo = "Please select file";
  }

  return errors;
};

export const validateSftpForm=(formData) =>{
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
  }
  
export const   validateHttpForm=(formData) =>{
    const errors = {};
  
    if (!formData.urlPath) {
      errors.urlPath = "URL is required";
    }
    if (!formData.syncFrequency) {
      errors.syncFrequency = "Please Select Sync Frequency";
    }
    return errors;
  }