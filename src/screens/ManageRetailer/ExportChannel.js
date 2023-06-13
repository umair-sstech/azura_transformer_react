import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Select from "react-select";
import { toast } from 'react-toastify';
import { FormContext } from "../ManageRetailer/ManageRetailerSetting";
import { useHistory } from 'react-router-dom';
import { API_PATH } from '../ApiPath/Apipath';



function ExportChannel(props) {
  const {setPage}=props
  const {
    processCancel,
  } = useContext(FormContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [channel,setChannel]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const history=useHistory()


  useEffect(() => {
    getMarketPlaceList();
    getRetailerIntegrationData();
  }, []);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  
  const getMarketPlaceList = () => {
    try {
      axios
        .get(`${API_PATH.GET_RETAILER_MARKETPLACE}`)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            const options = Object.keys(data).map((channelName) => ({
              value: data[channelName],
              label: channelName,
            }));
            setChannel(options);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve supplier list:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  const getRetailerIntegrationData = () => {
    try {
      const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");
      axios
        .post(`${API_PATH.GET_RETAILER_BY_ID}`, { id: retailerIntegrationId })
        .then((response) => {
          const { success, data } = response.data;
          if (success && data.length > 0) {
            const selectedMarketPlaceOption = {
              value: data[0].marketPlaceId,
              label: data[0].marketPlaceNames[0],
            };
            console.log("selectedMarketPlaceOption",selectedMarketPlaceOption)
            setSelectedOptions(selectedMarketPlaceOption);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve retailer integration data:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
      marketPlaceId: selectedOptions.value
    };
    if(!payload.marketPlaceId) {
      toast.error("Must select atlease one account.")
      return;
    }
    setIsLoading(true);
  
    axios.post(`${API_PATH.CREATE_RETAILER_MARKETPLACE}`, payload)
      .then(response => {
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          localStorage.setItem("marketPlaceSettingId",selectedOptions.value)
          localStorage.setItem("marketPlaceSettingName",selectedOptions.label)

          setPage(7)
        } else {
          toast.error(message);
        }
      })
      .catch(error => {
        console.error("Failed to submit data:", error);
        toast.error("Failed to submit data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
 const handleOnClick=async(e)=>{
  e.preventDefault()
  const retailerIntegrationId = localStorage.getItem("retailerIntegrationId");

    const payload = {
      id: retailerIntegrationId,
      marketPlaceId: selectedOptions.value
    };
    if(!payload.marketPlaceId) {
      toast.error("Must select atlease one account.")
      return;
    }
    setIsLoadingExit(true);
  
    axios.post(`${API_PATH.CREATE_RETAILER_MARKETPLACE}`, payload)
      .then(response => {
        const { success, message } = response.data;
        if (success) {
          localStorage.removeItem("supplierSettingId");
          localStorage.removeItem("selectedSupplierName");
          localStorage.removeItem("retailerIntegrationId");
        localStorage.removeItem("currentPage");

          toast.success(message);
          history.push("/setting-retailer-list")
        } else {
          toast.error(message);
        }
      })
      .catch(error => {
        console.error("Failed to submit data:", error);
        toast.error("Failed to submit data");
      })
      .finally(() => {
        setIsLoadingExit(false);
      });
 }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 button-class">
            <div className="d-flex">
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Next"
                )}
              </button>
              <button
                className="btn btn-primary w-auto btn-lg mr-2"
                type="submit"
                onClick={handleOnClick}
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>

              <button className="btn btn-secondary w-auto btn-lg" type="button" onClick={processCancel}>
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3 mt-sm-0">
          <div className="col-12">
            <label>Type of Integration</label>
            <Select
            options={channel}
            onChange={handleSelectChange}
            value={selectedOptions}
            placeholder="Select accounts"
          />
          </div>
        </div>
      </form>
    </>
  );
}

export default ExportChannel
