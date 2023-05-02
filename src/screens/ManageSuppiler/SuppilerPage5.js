// import React, { useContext, useEffect, useState } from "react";
// import Select from "react-select";
// import "./SupplierPage.css";
// import SupplierSftpForm from "./SupplierSftpForm";
// import SupplierHttpForm from "./SupplierHttpForm";
// import { useHistory } from "react-router-dom";
// import timeZoneData from "../../Data/timeZone";

// import axios from "axios";
// import { API_PATH } from "../ApiPath/Apipath";
// import { toast } from "react-toastify";
// import { validateHttpForm, validateSftpForm } from "../Validations/Validation";
// import { FormContext } from "./ManageSuppiler";

// function SupplierPage5(props) {
//   const { setPage } = props;

//   const { processCancel, formData, setFormData } = useContext(FormContext);

//   const options = [
//     { value: "SFTP", label: "SFTP" },
//     { value: "HTTP", label: "HTTP" },
//   ];

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       width: 200,
//       margin: "8px 16px",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       width: 200,
//       margin: "8px 16px",
//     }),
//     input: (provided) => ({
//       ...provided,
//       width: "100%",
//     }),
//   };

//   const [selectedValue, setSelectedValue] = useState(null);
//   const [sftpformData, setSftpFormData] = useState({
//     supplierId: "",
//     supplierName: "",
//     settingType: "",
//     password: "",
//     hostName: "",
//     userName: "",
//     password: "",
//     port: "",
//     protocol: "",
//     urlPath: "",
//     syncFrequency: "",
//     timeZone:null
//   });
//   const [initFormData, setInitFormData] = useState({
//     urlPath: "",
//     syncFrequency: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const history = useHistory();
//   const [syncFrequencyOptions, setSyncFrequencyOptions] = useState([]);


//   useEffect(() => {
//     const supplierId = localStorage.getItem("supplierId");

//     if (supplierId) {
//       axios
//         .get(`${API_PATH.GET_IMPORT_SETTING_DATA_BY_ID}=${supplierId}`)
//         .then((response) => {
//           const supplierData = response.data.data;
//           let timeZone = timeZoneData.find((tz) => tz.abbr == supplierData.timeZone);
//           console.log("timezone",timeZone)
//           setFormData(supplierData);  
//           setSftpFormData({
//             protocol: supplierData.protocol,
//             syncFrequency: supplierData.syncFrequency,
//             timeZone: {
//               value: timeZone.abbr,
//               label: timeZone.text,
//             },
//           });
//         })
//         .catch((error) => {
//           console.log("error", error);
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (formData) {
//       setSftpFormData(formData);
//       setInitFormData(formData);
//     }
//   }, [props]);

//   useEffect(() => {
//     if (formData && formData.settingType) {
//       setSelectedValue(
//         options.find((option) => option.value === formData.settingType)
//       );
//     }
//   }, [formData]);
  

//   useEffect(() => {
//     getCronTimeData();
//   }, []);

//   const handleSelectChange = (selectedOption) => {
//     setSelectedValue(selectedOption);
//     setSftpFormData({
//       ...formData,
//       settingType: selectedOption.value,
//     });
//   }
 
//   const getCronTimeData = () => {
//     try {
//       axios
//         .get(`${API_PATH.GET_CRON_TIME}`)
//         .then((response) => {
//           const options = response.data.data.map((item) => ({
//             label: item.name,
//             value: item.value,
//           }));
//           console.log("item", options);
//           setSyncFrequencyOptions(options);
//         })
//         .catch((error) => console.log(error));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setFormErrors({ ...formErrors, [e.target.name]: "" });
//   };

//   const handleProtocolChange = (selectedOption) => {
//     setFormData({ ...formData, protocol: selectedOption.value });
//     setFormErrors({ ...formErrors, protocol: "" });
//   };
//   const handleSyncFrequency = (selectedOption) => {
//     setFormData({ ...formData, syncFrequency: selectedOption.value });
//     setFormErrors({ ...formErrors, syncFrequency: "" });
//   };
//   const handleTimeZoneChange = (selectedOption) => {
//     setFormData({ ...formData, timeZone: selectedOption });
//     setFormErrors({ ...formErrors, timeZone: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateSftpForm(sftpformData);
//     setFormErrors(errors);
  
//     if (Object.keys(errors).length === 0) {
//       const supplierId = localStorage.getItem("supplierId");
//       const supplierName = localStorage.getItem("supplierName");
  
//       const { value, label } = sftpformData.timeZone;
  
//       const timeZoneString = `${value}`;
  
//       const payload = {
//         ...sftpformData,
//         timeZone: timeZoneString,
//         supplierId,
//         supplierName,
//         settingType: selectedValue.value // set settingType to selected dropdown option value
//       };
//       axios
//         .post(`${API_PATH.IMPORT_SETTING}`, payload)
//         .then((response) => {
//           const { success, message, data } = response.data;
//           console.log("response", response);
//           if (success) {
//             toast.success(message);
//             setSftpFormData({}); // clear form data
//             setSelectedValue(null); // clear selected dropdown option
//             setPage(6);
//           } else {
//             toast.error(message);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   const httpHandleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateHttpForm(initFormData);
//     setFormErrors(errors);
  
//     if (Object.keys(errors).length === 0) {
//       const supplierId = localStorage.getItem("supplierId");
//       const supplierName = localStorage.getItem("supplierName");
  
  
//       const payload = {
//         ...initFormData,
//         supplierId,
//         supplierName,
//         settingType: selectedValue.value 
//       };
//       axios
//         .post(`${API_PATH.IMPORT_SETTING}`, payload)
//         .then((response) => {
//           const { success, message, data } = response.data;
//           console.log("response", response);
//           if (success) {
//             toast.success(message);
//             setInitFormData({}); 
//             setSelectedValue(null); 
//             setPage(6);
//           } else {
//             toast.error(message);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   const handleOnClick = (e) => {
//     e.preventDefault();
//     const errors = validateSftpForm(formData);
//     setFormErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const supplierId = localStorage.getItem("supplierId");
//       const supplierName = localStorage.getItem("supplierName");

//       const { value, label } = formData.timeZone;

//       const timeZoneString = `${value} `;

//       const payload = {
//         ...formData,
//         timeZone: timeZoneString,
//         supplierId,
//         supplierName,
//       };
//       axios
//         .post(`${API_PATH.IMPORT_SETTING}`, payload)
//         .then((response) => {
//           console.log("responsedaa", response.data);
//           const { success, message, data } = response.data;
//           if (success) {
//             history.push("/supplier");
//             toast.success(message);
//             localStorage.removeItem("supplierId");
//             localStorage.removeItem("supplierName");
//           } else {
//             toast.error(message);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   const option = [
//     { value: "SFTP", label: "SFTP" },
//     { value: "FTP", label: "FTP" },
//   ];

//   const sftpForm = () => {
//     return (
//       <>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginTop: "35px" }}>
//             <div className="row">
//               <div className="col-lg-12 col-md-12 col-12 button-class">
//                 <div className="d-flex">
//                   <button
//                     className="btn btn-primary w-auto btn-lg mr-2"
//                     type="submit"
//                   >
//                     Save & Next
//                   </button>
//                   <button
//                     className="btn btn-primary w-auto btn-lg mr-2"
//                     type="submit"
//                     onClick={handleOnClick}
//                   >
//                     Save & Exit
//                   </button>
//                   <button
//                     className="btn btn-secondary w-auto btn-lg"
//                     type="button"
//                     onClick={processCancel}
//                   >
//                     Exit
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     Host Name <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="hostName"
//                     placeholder="Enter Host Name"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       sftpformData && sftpformData.hostName
//                         ? sftpformData.hostName
//                         : ""
//                     }
//                   />
//                   {formErrors.hostName && (
//                     <span className="text-danger">{formErrors.hostName}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="form-group">
//                   <label>
//                     User Name <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="userName"
//                     placeholder="Enter User Name"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       sftpformData && sftpformData.userName
//                         ? sftpformData.userName
//                         : ""
//                     }
//                   />
//                   {formErrors && formErrors.userName && (
//                     <span className="text-danger">{formErrors.userName}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="form-group">
//                   <label>
//                     Password <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="password"
//                     placeholder="Enter Password"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       sftpformData && sftpformData.password
//                         ? sftpformData.password
//                         : ""
//                     }
//                   />
//                   {formErrors.password && (
//                     <span className="text-danger">{formErrors.password}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="form-group">
//                   <label>
//                     Port <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="port"
//                     placeholder="Enter Port"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       sftpformData && sftpformData.port ? sftpformData.port : ""
//                     }
//                   />
//                   {formErrors.port && (
//                     <span className="text-danger">{formErrors.port}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="form-group">
//                   <label>
//                     Protocol <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Select
//                     placeholder="Select Protocol"
//                     name="protocol"
//                     options={option}
//                     onChange={handleProtocolChange}
//                     value={option.find(
//                       (option) => option.value === sftpformData.protocol
//                     )}
//                   />
//                   {formErrors.protocol && (
//                     <span className="text-danger">{formErrors.protocol}</span>
//                   )}
//                 </div>
//               </div>

//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     URL/Path <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     placeholder="Enter URL"
//                     name="urlPath"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       sftpformData && sftpformData.urlPath
//                         ? sftpformData.urlPath
//                         : ""
//                     }
//                   />
//                   {formErrors.urlPath && (
//                     <span className="text-danger">{formErrors.urlPath}</span>
//                   )}
//                   <small className="form-text text-muted csv-text">
//                     Please Enter Full Name With File. &nbsp;&nbsp;&nbsp; Ex:
//                     /var/www/html/abc.csv
//                   </small>
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     Sync Frequency <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Select
//                     placeholder="Select Frequency"
//                     options={syncFrequencyOptions}
//                     value={syncFrequencyOptions.find(
//                       (option) => option.value === sftpformData.syncFrequency
//                     )}
//                     onChange={handleSyncFrequency}
//                   />
//                   {formErrors.syncFrequency && (
//                     <span className="text-danger">
//                       {formErrors.syncFrequency}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     TimeZone <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Select
//                     options={timeZoneData?.map((data) => {
//                       return {
//                         value: data.abbr,
//                         label: data.text,
//                       };
//                     })}
//                     placeholder="Select TimeZone"
//                     onChange={handleTimeZoneChange}
//                     value={sftpformData.timeZone}
                  
//                   />

//                   {formErrors.timeZone && (
//                     <span className="text-danger">{formErrors.timeZone}</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </>
//     );
//   };

//   const httpForm = () => {
//     return (
//       <>
//         <form onSubmit={httpHandleSubmit}>
//           <div style={{ marginTop: "35px" }}>
//             <div className="row">
//               <div className="col-lg-12 col-md-12 col-12 button-class">
//                 <div className="d-flex">
//                   <button
//                     className="btn btn-primary w-auto btn-lg mr-2"
//                     type="submit"
//                   >
//                     Save & Next
//                   </button>
//                   <button
//                     className="btn btn-primary w-auto btn-lg mr-2"
//                     type="submit"
//                     onClick={handleOnClick}
//                   >
//                     Save & Exit
//                   </button>
//                   <button
//                     className="btn btn-secondary w-auto btn-lg"
//                     type="button"
//                     onClick={processCancel}
//                   >
//                     Exit
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     URL/Path <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     placeholder="Enter URL"
//                     name="urlPath"
//                     onChange={handleInputChange}
//                     defaultValue={
//                       initFormData && initFormData.urlPath
//                         ? initFormData.urlPath
//                         : ""
//                     }
//                   />
//                   {formErrors.urlPath && (
//                     <span className="text-danger">{formErrors.urlPath}</span>
//                   )}
//                   <small className="form-text text-muted csv-text">
//                     Please Enter Full Name With File. &nbsp;&nbsp;&nbsp; Ex:
//                     /var/www/html/abc.csv
//                   </small>
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className="form-group">
//                   <label>
//                     Sync Frequency <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <Select
//                     placeholder="Select Frequency"
//                     options={syncFrequencyOptions}
//                     onChange={handleSyncFrequency}
//                     value={syncFrequencyOptions.find(
//                       (option) => option.value === initFormData.syncFrequency
//                     )}
//                   />
//                   {formErrors.syncFrequency && (
//                     <span className="text-danger">
//                       {formErrors.syncFrequency}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </>
//     );
//   };

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ marginRight: "32px", width: "200px" }}>
//           <label htmlFor="combo-box-demo" style={{ marginBottom: "8px" }}>
//             Type
//           </label>
//           <Select
//             options={options}
//             styles={customStyles}
//             onChange={handleSelectChange}
//             className="select-option"
//             value={selectedValue}
//           />
//         </div>
//         <div>{selectedValue?.value === "SFTP" ? sftpForm() : ""}</div>
//         <div>{selectedValue?.value === "HTTP" ? httpForm() : ""}</div>
//       </div>
//     </>
//   );
// }

// export default SupplierPage5;




import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./SupplierPage.css";
import SupplierSftpForm from "./SupplierSftpForm";
import SupplierHttpForm from "./SupplierHttpForm";
import { useHistory } from "react-router-dom";
import timeZoneData from "../../Data/timeZone";
import axios from "axios";
import { API_PATH } from "../ApiPath/Apipath";
import { toast } from "react-toastify";
import { validateSftpForm } from "../Validations/Validation";
import { FormContext } from "./ManageSuppiler";

function SupplierPage5(props) {
  const { setPage } = props;

  const { processCancel, formData, setFormData } = useContext(FormContext);

  const options = [
    { value: "SFTP", label: "SFTP" },
    { value: "HTTP", label: "HTTP" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
      margin: "8px 16px",
    }),
    menu: (provided) => ({
      ...provided,
      width: 200,
      margin: "8px 16px",
    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginRight: "32px", width: "200px" }}>
          <label htmlFor="combo-box-demo" style={{ marginBottom: "8px" }}>
            Type
          </label>
          <Select
            options={options}
            styles={customStyles}
            onChange={handleSelectChange}
            className="select-option"
          />
        </div>
        <div>{selectedValue?.value === "SFTP" ? <SupplierSftpForm/> : ""}</div>
        <div>{selectedValue?.value === "HTTP" ?<SupplierHttpForm/> : ""}</div>
      </div>
    </>
  );
}

export default SupplierPage5;
