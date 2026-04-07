import Container from "react-bootstrap/Container";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function CommentPlaceHolder() {
  const buttonStyle = {
    width: "80px",
    margin: 3,
    backgroundColor: "grey",
    border: "none",
  };

  const CommentSection = () => {
    return (
      <Container className="d-flex flex-column border border-dark-subtle rounded p-2 mb-3">
        <div className="d-flex gap-2 m-0">
          <div className="d-flex gap-2 mt-2 align-items-center">
            <Image
              as="div"
              style={{ backgroundColor: "grey" }}
              width="50"
              height="50"
              roundedCircle
            />
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={5} style={{ width: "300px" }} />
            </Placeholder>
          </div>

          <div className="ms-auto mt-2">
            <Placeholder.Button xs={8} style={buttonStyle} />
            <Placeholder.Button xs={8} style={buttonStyle} />
          </div>
        </div>
        <br />
        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={3} /> <Placeholder xs={2} />
          <br />
          <Placeholder xs={6} />
        </Placeholder>
      </Container>
    );
  };

  return (
    <>
      <br />
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={3} style={{ height: "30px" }} />
      </Placeholder>
      <br />

      {Array.from({ length: 2 }, (_, id) => id + 1).map((num) => (
          <CommentSection key={num} />
      ))}
    </>
  );
}
