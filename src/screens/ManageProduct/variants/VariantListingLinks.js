import React from "react";
import { Accordion, Card, Col, Image, Row, Table } from "react-bootstrap";
import airConditioner from "../../../assets/images/air-conditioner.png"

const VariantListingLinks = () => {
  return (
    <Row style={{marginBottom: "-15px"}}>
      <Col>
        <Accordion defaultActiveKey="10" className="accordian__main">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                style={{ textDecoration: "none" }}
                className="btn btn-link collapsed"
                eventKey="0"
              >
                Listing Links (Length)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Channel Name</th>
                      <th>Image</th>
                      <th>SKU</th>
                      <th>MAP</th>
                      <th>List Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="font-weight-normal">
                    <tr>
                      <td>CA AU - FTP Orders</td>
                      <td><Image src={airConditioner} alt="Image" width={40} height={40} /></td>
                      <td className="text-primary">GU7761-D_32F</td>
                      <td>(empty)</td>
                      <td>$12.51</td>
                      <td>38</td>
                    </tr>
                    <tr>
                    <td>CA UK PID - Master UK Orders</td>
                      <td><Image src={airConditioner} alt="air conditioner" width={40} /></td>
                      <td className="text-primary">GU7761-D_32F</td>
                      <td>(empty)</td>
                      <td>$12.51</td>
                      <td>38</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default VariantListingLinks;
