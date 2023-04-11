import React, { useEffect } from "react";
import "./SupplierPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function SuppilerPage4(props) {
  const { setPage } = props;
  const history = useHistory();

  useEffect(() => {
    const parentCheckbox = document.getElementById("parent-checkbox");
    const childCheckboxes = document.querySelectorAll(
      '.image-size-list input[type="checkbox"]:not(#parent-checkbox)'
    );

    parentCheckbox.addEventListener("change", () => {
      childCheckboxes.forEach((checkbox) => {
        checkbox.checked = parentCheckbox.checked;
      });
    });
  }, []);

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
  <hr className="hr" />
  <div className="row">
    <div className="col-lg-12 col-md-12 col-12 button-class">
      <div className="d-flex">
        <button
          className="btn btn-primary w-auto btn-lg mr-2"
          type="submit"
          onClick={() => setPage("5")}
        >
          Save & Next
        </button>

        <button
          className="btn btn-primary w-auto btn-lg mr-2"
          type="submit"
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
  <div className="d-flex flex-wrap">
  <div className="table-responsive w-50 pr-3">
    <table className="table w-50">
      <thead>
        <tr>
          <th>
            <div className="checkbox-container">
              <input type="checkbox" id="parent-checkbox" />
              <label htmlFor="parent-checkbox"></label>
            </div>
          </th>
          <th>Image Size</th>
        </tr>
      </thead>
      <tbody className="image-size-list">
        <tr>
          <td>
            <div className="checkbox-container">
              <input type="checkbox" id="checkbox-1" />
              <label htmlFor="checkbox-1">&nbsp;</label>
            </div>
          </td>
          <td>762x1100</td>
        </tr>
        <tr>
          <td>
            <div className="checkbox-container">
              <input type="checkbox" id="checkbox-2" />
              <label htmlFor="checkbox-2">&nbsp;</label>
            </div>
          </td>
          <td>1200x1600</td>
        </tr>
        <tr>
          <td>
            <div className="checkbox-container">
              <input type="checkbox" id="checkbox-3" />
              <label htmlFor="checkbox-3">&nbsp;</label>
            </div>
          </td>
          <td>1000x1000</td>
        </tr>
        <tr>
          <td>
            <div className="checkbox-container">
              <input type="checkbox" id="checkbox-4" />
              <label htmlFor="checkbox-4">&nbsp;</label>
            </div>
          </td>
          <td>1600x2000</td>
        </tr>
        <tr>
          <td>
            <div className="checkbox-container">
              <input type="checkbox" id="checkbox-5" />
              <label htmlFor="checkbox-5">&nbsp;</label>
            </div>
          </td>
          <td>Original</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="w-25 mt-3 input-p4">
    <div className="form-group mb-3">
      <label htmlFor="prefix">Prefix:</label>
      <input type="text" className="form-control" id="prefix" />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="suffix">Suffix:</label>
      <input type="text" className="form-control" id="suffix" />
    </div>
  </div>
</div>

  
</>

  );
}

export default SuppilerPage4;
