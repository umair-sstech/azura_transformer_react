import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Select from 'react-select';
import countryList from '../../Data/countryList';
import { Spinner } from 'react-bootstrap';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { validateProfile } from '../Validations/Validation';

const Profile = (props) => {

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [props]);

  const handleChange = (key, value) => {
    const newFormData = new FormData(document.forms.myForm);
    newFormData.set(key, value);
    const errors = validateProfile(newFormData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value.trim();
    setFormData((prevState) => ({
      ...prevState,
      name
    }))
    handleChange("name", name)
  };

  const handleSelect = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setFormData((prevState) => ({
      ...prevState,
      country: selectedCountry,
    }))
    handleChange("country", selectedCountry)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newFormData = new FormData(form);
    const errors = validateProfile(newFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Submitted")
      console.log(formData)
    }
  }

  const goToDashboard = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // setFormData();
        // setLogoData();
        history.push("/dashboard");
      }
    });
  }

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
              HeaderText="Manage Profile"
              Breadcrumb={[
                { name: "Manage Profile", navigate: "#" },
              ]}
              style={{ position: "sticky", top: 0, zIndex: 999 }}
            />
            <div className="tab-component">
              <div className="card">
                <div className="body">

                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} name='myForm'>

                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-12 button-class">
                        <div className="d-flex">

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
                          <button
                            className="btn btn-secondary w-auto btn-lg"
                            type="button"
                            onClick={goToDashboard}
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='row mt-3 mt-lg-0'>
                      <div className='col-sm-6'>
                        <div className="form-group">
                          <label>
                            {" "}
                            Profile Logo
                          </label>

                          <input
                            className="form-control"
                            type="file"
                            name="logo"
                            onChange={handleLogoChange}
                          />
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div className="form-group">
                          <label>
                            Profile Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Profile Name"
                            defaultValue={formData && formData.name ? formData.name : ""}
                            onChange={handleNameChange}
                          />
                          {formErrors.name && (
                            <span className="text-danger">{formErrors.name}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-sm-6'>
                        <div className="form-group">
                          <label>
                            Country <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            options={countryList?.map((data) => (
                              {
                                value: data.name,
                                label: data.name,
                              }
                            )
                            )}
                            name='country'
                            placeholder="Select Country"
                            // onChange={(data) => {
                            //   if (data) {
                            //     let event = {
                            //       target: { name: "country", value: data },
                            //     };
                            //     handleSelect(event);
                            //   }
                            // }}
                            onChange={handleSelect}
                          />
                          {formErrors.country &&
                            <span className="error" style={{ color: "red" }}>
                              {formErrors.country}
                            </span>
                          }
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
