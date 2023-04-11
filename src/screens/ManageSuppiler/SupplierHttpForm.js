import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import "./SupplierPage.css";
import Swal from 'sweetalert2';
import { validateHttpForm, validateSftpForm } from '../Validations/Validation';


function SupplierHttpForm() {
  const [formData, setFormData] = useState({
    url: "",
    syncFrequency: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const history=useHistory()


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateHttpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const errors = validateHttpForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    if (Object.keys(errors).length === 0) {
      history.push("/supplier");
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure, <br> you want to exit ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/supplier');
      }
    });
  };

    return (
      <>

        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "30px" }}>
          <div className="row">
              <div className="col-lg-12 col-md-12 col-12 button-class">
                <div className="d-flex">
                  <button
                    className="btn btn-primary w-auto btn-lg mr-2"
                    type="submit"
                  >
                    Save & Next
                  </button>
                  <button
                    className="btn btn-primary w-auto btn-lg mr-2"
                    type="submit"
                    onClick={handleOnClick}
                  >
                    Save & Exit
                  </button>

                  <button
                    className="btn btn-secondary w-auto btn-lg"
                    type="submit"
                    onClick={handleCancel}
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>
                    URL/Path <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="url"
                    placeholder="Enter URL"
                    onChange={handleInputChange}
                  />
                  {formErrors.url && (
                    <span className="text-danger">{formErrors.url}</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>
                    Sync Frequency <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="syncFrequency"
                    placeholder="Enter Sync Frequency"
                    onChange={handleInputChange}
                  />
                  {formErrors.syncFrequency && (
                    <span className="text-danger">{formErrors.syncFrequency}</span>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </form>
        </>
      );
}

export default SupplierHttpForm
