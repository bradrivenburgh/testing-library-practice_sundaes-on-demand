import Alert from "react-bootstrap/Alert";

function AlertBanner({ message, variant }) {
  const alertMessage =
    message || "An unexpected error occurred. Please try again.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}

export default AlertBanner;
