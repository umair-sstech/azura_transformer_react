import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "./ExportCsv.css";

function ExportCsv(props) {
  useEffect(() => {}, []);

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll(
      '.exportCsv-table tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
    if (e.target.checked) {
      console.log("checked");
    }
  };

  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="ExportCsv"
            Breadcrumb={[{ name: "ExportCsv", navigate: "#" }]}
          />
          <div className="tab-component">
            <div className="card">
              <div className="body">
                <div className="mb-3 csv__header">
                  <span>Scan Item</span>
                  <input
                    type="search"
                    placeholder="Search by Barcode, Variant SKU or EAN..."
                    className="search__input"
                  />
                  <button>Search</button>
                </div>

                <div className="data-table">
                  {props.loading ? (
                    <div className="loader-wrapper">
                      <i className="fa fa-refresh fa-spin"></i>
                    </div>
                  ) : null}
                  <table className="table-responsive exportCsv-table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                          />
                        </th>
                        {/* <th>Data</th> */}
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = ({ LoadingReducer, loginReducer }) => ({
  loading: LoadingReducer.isLoading,
  user: loginReducer.user,
});
export default connect(mapStateToProps, { onLoading })(ExportCsv);
