import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { onLoading } from "../../actions";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Spinner } from "react-bootstrap";
import { API_PATH } from "../ApiPath/Apipath";
import PageHeader from "../../components/PageHeader";

function UploadFailedData() {
  const [isLoadingExit, setIsLoadingExit] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [chooseSupplierList, setChooseSupplierList] = useState([]);
  const [fileError, setFileError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  console.log("supplierError",supplierError)

  const history = useHistory();

  useEffect(() => {
    getSupplierList();
  }, []);

  const handleFileChange = () => {
    setFileError("");
  };

  const getSupplierList = async () => {
    try {
      const response = await axios.post(`${API_PATH.GET_LIST}`, {
        type: "Supplier",
      });
      const suppliers = response.data.data;
      const supplierNames = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }));

      setChooseSupplierList(supplierNames);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingExit(true);

    const file = e.target.file.files[0];
    if (!file) {
      setFileError("Please upload a file");
      setIsLoadingExit(false);
      return;
    }

    if (!supplier.label) { // Check the value property of the supplier object
      setSupplierError("Please select a supplier");
      setIsLoadingExit(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("supplierId", supplier.value);
    formData.append("supplierName", supplier.label);
    console.log("formData file:", formData.get("file"));
    console.log("formData supplierId:", formData.get("supplierId"));
    console.log("formData supplierName:", formData.get("supplierName"));

    try {
      const response = await axios.post(
        "http://localhost:8004/api/uploadcsv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { success, message, data } = response.data;
      if (success) {
        toast.success(message);
        history.push("/file-upload");
      }

      setIsLoadingExit(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoadingExit(false);
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
            HeaderText="File Upload"
            Breadcrumb={[
              { name: "File Data List", navigate: "/file-upload" },
            ]}
          />
        </div>
        <div className="tab-component">
          <div className="card mt-5">
            <div className="body">
              <form
                name="myForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div style={{ marginTop: "35px" }}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 button-class">
                      <div className="d-flex">
                        <button
                          className="btn btn-primary w-auto btn-lg mr-2"
                          type="submit"
                        >
                          {isLoadingExit ? (
                            <>
                              <Spinner animation="border" size="sm" /> Please
                              wait...
                            </>
                          ) : (
                            "Save & Exit"
                          )}
                        </button>
                        <button
                          className="btn btn-secondary w-auto btn-lg"
                          type="button"
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 mt-lg-0">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="combo-box-demo">Supplier List</label>
                        <Select
                          options={chooseSupplierList}
                          onChange={(data) => {
                            setSupplier(data);
                            setSupplierError(""); 
                          }}
                          defaultValue={{ label: "Select Supplier" }}
                        />
                        {supplierError && (
                          <span style={{ color: "red" }}>{supplierError}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Upload File <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                          className="form-control"
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                        />
                        {fileError && (
                          <span style={{ color: "red" }}>{fileError}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ LoadingReducer }) => ({
  isLoading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onLoading })(UploadFailedData);
