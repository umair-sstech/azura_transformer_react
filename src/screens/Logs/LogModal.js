import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./LogModal.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const LogModal = ({ showModal, setShowModal, selectedId }) => {
  const [apiData, setApiData] = useState({});

  const fetchApiLogData = async () => {
    if (showModal) {
      const response = await axios.get(
        `http://localhost:9000/apiLog/getAPIDetails?id=${selectedId}`
      );
      if (response.status === 200) {
        setApiData(response.data.apiLog);
      }
    }
  };

  useEffect(() => {
    fetchApiLogData();
  }, [showModal]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal__main"
        aria-labelledby="example-custom-modal-styling-title"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            API Trace Event Details
          </Modal.Title>
        </Modal.Header>
        {apiData && (
          <Modal.Body>
            <div className="p-3" style={{ marginTop: "-20px" }}>
              <div className="row">
                <div className="col-2">
                  <strong>URL</strong>
                </div>
                <div className="col-1"> : </div>
                <div className="col-9 info">{apiData.url}</div>
              </div>
              <div className="row mt-2">
                <div className="col-2">
                  <strong>Created Time</strong>
                </div>
                <div className="col-1"> : </div>
                <div className="col-9 info">
                  {/* {JSON.parse(apiData.responseBody)?.createdAt !== undefined
                    ? moment(JSON.parse(apiData.responseBody).createdAt).format(
                        "MM/DD/YYYY hh:mm a"
                      )
                    : "--"} */}
                </div>
              </div>
            </div>

            <h5>Request Headers : </h5>
            <Card className="cards__main">
              <Card.Body>
                <Card.Text>
                  {apiData?.requestHeaders
                    ? apiData.requestHeaders
                    : "--"}
                </Card.Text>
              </Card.Body>
            </Card>

            <h5>Request Body : </h5>
            <Card className="cards__main">
              <Card.Body>
                <Card.Text>
                  {apiData?.requestBody ? apiData.requestBody : "--"}
                </Card.Text>
              </Card.Body>
            </Card>

            <h5>Response Headers : </h5>
            <Card className="cards__main">
              <Card.Body>
                <Card.Text>
                  {apiData?.responseHeaders
                    ? apiData.responseHeaders
                    : "--"}
                </Card.Text>
              </Card.Body>
            </Card>

            <h5>Response Body : </h5>
            <Card className="cards__main">
              <Card.Body>
                <Card.Text>
                  {apiData?.responseBody ? apiData.responseBody : "--"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
        )}

        <Modal.Footer>
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-outline-info"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogModal;
