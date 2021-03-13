import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ToppingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />

      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type='checkbox'
          label={name}
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
        />
      </Form.Group>
    </Col>
  );
}

ToppingOption.defaultProps = {
  name: "Cherries topping",
  imagePath: "http://localhost:3030/images/cherries.png",
};

export default ToppingOption;
