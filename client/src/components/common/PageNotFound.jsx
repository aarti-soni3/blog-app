import { useNavigate } from "react-router";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

export default function PageNotFound() {
  const navigate = useNavigate();

  //display page when diffrent route define on url
  return (
    <div className="container d-flex flex-column align-items-center">
      <Image
        src="/404-page.png"
        alt="404 image"
        style={{ minWidth: 200, maxWidth: 800, minHeight: 50, maxHeight: 400 }}
      />

      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
}
