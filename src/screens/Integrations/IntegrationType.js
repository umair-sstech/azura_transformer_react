
import React, { useState } from "react";
import Select from "react-select";
import PageHeader from "../../components/PageHeader";
import { Link, useHistory } from "react-router-dom";

function IntegrationType(props) {
  const options = [
    { value: "Supplier", label: "Supplier" },
    { value: "market_place", label: "Market Place" },
    { value: "Shopping Cart", label: "Shopping Cart", isDisabled: true },
    { value: "Carrier", label: "Carrier", isDisabled: true },
    { value: "TMS", label: "TMS", isDisabled: true },
    { value: "WMS", label: "WMS", isDisabled: true },
    { value: "Integrator", label: "Integrator" },
  ];
  
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();
  
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value === "Supplier") {
      history.push("/supplier");
    }
    if (selectedOption.value === "market_place") {
      history.push("/market-place");
    }
    if (selectedOption.value === "Integrator") {
      history.push("/integrator");
    }
  };
  
  return (
    <>
      <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText={"Integration List"}
              Breadcrumb={[
                { name: "Integrations List", navigate: "#" },
              ]}
              className="page-header"
            />
            <div className="tab-component">
              <div className="card">
                <div className="body">
                  {props.updateFormLoading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
  
                  <div
                    className="select__container"
                  >
                    <label htmlFor="combo-box-demo">
                      Select Integration
                    </label>
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                      isDisabled={false}
                      className="select-option"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntegrationType;
