import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Select from "react-select";
import { toast } from 'react-toastify';


function ExportChannel(props) {
  const {setPage}=props
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [channel,setChannel]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  useEffect(()=>{getMarketPlaceList()},[])

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const getMarketPlaceList=()=>{
    try {
      axios
      .get("http://localhost:2703/retailer/getMarketplaceList")
      .then((response) => {
        const{success,message,data}=response.data
        if (success) {
          const options = Object.keys(data).map((channelName) => ({
            value: data[channelName],
            label: channelName,
          }));
          setChannel(options);
        } else {
          toast.error(message)
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve supplier list:", error);
      });
      
    } catch (error) {
      console.log(error)
    }
  }

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
  
    axios.post("http://localhost:2703/retailer/createOrUpdateRetailerMarketplace", payload)
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
              >
                {isLoadingExit ? (
                  <>
                    <Spinner animation="border" size="sm" /> Please wait...
                  </>
                ) : (
                  "Save & Exit"
                )}
              </button>

              <button className="btn btn-secondary w-auto btn-lg" type="button">
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
