import Col from "react-bootstrap/Col";

function ToppingOption({ name, imagePath }) {
  
  
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <div>
        <img
          style={{ width: "75%" }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} topping`}
        />
      </div>
    </Col>
  );
}

ToppingOption.defaultProps = {
  name: "Cherries topping",
  imagePath: "http://localhost:3030/images/cherries.png",
};

export default ToppingOption;
