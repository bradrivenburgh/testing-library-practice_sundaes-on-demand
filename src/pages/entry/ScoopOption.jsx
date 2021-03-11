import Col from "react-bootstrap/Col";

function ScoopOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <div>
        <img
          style={{ width: "75%" }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} scoop`}
        />
      </div>
    </Col>
  );
}

ScoopOption.defaultProps = {
  name: "Vanilla scoop",
  imagePath: "http://localhost:3030/images/chocolate.png",
};

export default ScoopOption;
