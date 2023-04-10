import React, { useEffect } from "react";
import "./SupplierPage.css";

function SuppilerPage4(props) {
  const { setPage } = props;

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

  return (
    <>
      <hr className="hr" />
      <div>
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
      >
        Exit
      </button>
      
    </div>
  </div>
</div>

        <div className="row">
          <div className="table-responsive">
            <table className="table w-25">
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
        </div>
      </div>
    </>
  );
}

export default SuppilerPage4;
