import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import CommentPlaceHolder from "../Comment/CommentPlaceHolder";

export default function BlogDetailPlaceHolder() {
  return (
    <>
      <Container>
        <div className="m-4">
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <div className="d-flex gap-2 mt-2 align-items-center">
            <Image
              as="div"
              style={{ backgroundColor: "grey" }}
              width="50"
              height="50"
              roundedCircle
            />

            <Placeholder as={Card.Body} animation="glow">
              <Placeholder xs={3} /> <Placeholder xs={2} />{" "}
            </Placeholder>
          </div>
          <br />
          <Placeholder
            xs={12}
            className="mb-3"
            style={{ height: "300px", width: "500px" }}
          />
          <Placeholder as={Card.Text} animation="glow">
            {Array.from({ length: 3 }, (_, id) => id + 1).map((num) => {
              return (
                <span key={num}>
                  <Placeholder xs={6} />
                  <Placeholder className="w-75" />{" "}
                  <Placeholder style={{ width: "25%" }} /> <br />
                </span>
              );
            })}
          </Placeholder>
        </div>

        <CommentPlaceHolder />
      </Container>
    </>
  );
}
