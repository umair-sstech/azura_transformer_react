import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function SupplierPage6() {
  const [isChecked, setIsChecked] = useState(false);
  const history=useHistory()

  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure, <br> you want to exit ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/supplier");
      }
    });
  };
  return (
    <>
    <hr className="hr"/>
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12 button-class">
        <div className="d-flex">
          <button className="btn btn-primary w-auto btn-lg mr-2" type="submit">
            Save & Next
          </button>

          <button className="btn btn-primary w-auto btn-lg mr-2" type="submit">
            Save & Exit
          </button>

          <button className="btn btn-secondary w-auto btn-lg" type="submit" onClick={handleCancel}>
            Exit
          </button>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <div className="form-group">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" checked={isChecked} onChange={handleCheckChange} />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Would you like to search data in barcodelookup.com?
            </label>
          </div>
        </div>
      </div>
    </div>

    {isChecked && (
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Row 1, Column 1</td>
                <td>Row 1, Column 2</td>
                <td>Row 1, Column 3</td>
              </tr>
              <tr>
                <td>Row 2, Column 1</td>
                <td>Row 2, Column 2</td>
                <td>Row 2, Column 3</td>
              </tr>
              <tr>
                <td>Row 3, Column 1</td>
                <td>Row 3, Column 2</td>
                <td>Row 3, Column 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}
  </>
);
}

export default SupplierPage6
