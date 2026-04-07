import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export default function BlogCardPlaceHolder() {
  return (
    <Col>
      <Card className="m-2 shadow-sm h-100">
        <Placeholder
          xs={12}
          style={{ height: "200px" }}
        />
        <Card.Body className="pb-1">
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={11} />
          </Placeholder>
          <Card.Text as='div'>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={9} /> <Placeholder xs={5} />{" "}
              <Placeholder xs={1} /> <br />
              <Placeholder xs={4} />
            </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
