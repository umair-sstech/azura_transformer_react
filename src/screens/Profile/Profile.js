import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Select from 'react-select';
import countryList from '../../Data/countryList';
import { Spinner } from 'react-bootstrap';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { validateProfile } from '../Validations/Validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_PATH } from '../ApiPath/Apipath';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Profile = (props) => {

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    country: "",
    email:"",
    password:""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const { updateUserProfileName } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [props]);

  const userId = localStorage.getItem('_id');

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:2704/user/${userId}`);
      const userData = response.data.data;
      setFormData(userData);
    } catch (error) {
      console.error(error);
    }
  };
  

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
  const handleNameChange = (e, key) => {
    const value = e.target.value.trim();
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    handleChange(key, value);
  };
  

  const handleSelect = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setFormData((prevState) => ({
      ...prevState,
      country: selectedCountry,
    }));
    handleChange("country", selectedCountry);
  };
  

  const updateProfile = async () => {
    try {
      setIsLoading(true);
  
      const formDataToUpdate = {
        name: formData.name,
        country: formData.country,
        email:formData.email,
        password:formData.password
      };
  
      const response = await axios.post(
`${API_PATH.UPDATE_USER_PROFILE}`,        formDataToUpdate
      );
  
      if (response.status === 200) {
        updateUserProfileName(response.data.data.name);
        toast.success("Profile updated successfully");
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newFormData = new FormData(form);
    const errors = validateProfile(newFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      updateProfile();
      history.push("/dashboard")
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
                            onChange={(e) => handleNameChange(e, "name")}
                          />
                          {formErrors.name && (
                            <span className="text-danger">{formErrors.name}</span>
                          )}
                        </div>
                      </div>

                      <div className='col-sm-6'>
                      <div className="form-group">
                        <label>
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          placeholder="Profile Name"
                          defaultValue={formData && formData.email ? formData.email : ""}
                          onChange={(e) => handleNameChange(e, "email")}
                        />
                        {formErrors.email && (
                          <span className="text-danger">{formErrors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className='col-sm-6'>
                    <div className="form-group">
                      <label>
                        Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="password"
                        defaultValue={formData && formData.password ? formData.password : ""}
                        onChange={(e) => handleNameChange(e, "password")}
                      />
                      {formErrors.password && (
                        <span className="text-danger">{formErrors.password}</span>
                      )}
                    </div>
                  </div>
                    </div>

                    <div className='row'>
                      <div className='col-12'>
                        <div className="form-group">
                          <label>
                            Country <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                          options={countryList?.map((data) => ({
                            value: data.name,
                            label: data.name,
                          }))}
                          name='country'
                          placeholder="Select Country"
                          value={formData.country ? { value: formData.country, label: formData.country } : null}
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
