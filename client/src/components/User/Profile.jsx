import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useGetUserQuery } from "../../store/services/userApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import DeleteUserModal from "./DeleteUserModal";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  //get user data query for getting user n address info
  const { data, isLoading } = useGetUserQuery(user?.userId, {
    skip: !user?.userId,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <>
      <Container>
        <Card className="p-3">
          <Card.Header className="d-flex justify-content-between align-items-center mb-4">
            <h3>Your profile</h3>
            <Button
              className="ms-auto"
              variant="primary"
              onClick={openEditModal}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              className="ms-2"
              onClick={openDeleteModal}
            >
              Delete My Account
            </Button>
          </Card.Header>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column w-50 justify-content-center">
              {data?.user &&
                Object.entries(data.user).map(([key, value]) => {
                  return (
                    <Row key={key}>
                      <Col xs className="col-4 text-end">
                        {key}
                      </Col>
                      : <Col className="">{value}</Col>
                    </Row>
                  );
                })}
              {data?.address &&
                Object.entries(data.address).map(([key, value]) => {
                  return (
                    <Row key={key}>
                      <Col xs className="col-4 text-end">
                        {key}
                      </Col>
                      : <Col className="">{value}</Col>
                    </Row>
                  );
                })}
            </div>
          </div>
        </Card>
      </Container>

      <UpdateProfileModal
        userId={user?.userId}
        user={data?.user}
        address={data?.address}
        isUserLoading={isLoading}
        show={showEditModal}
        handleClose={closeEditModal}
      />

      <DeleteUserModal
        userId={user?.userId}
        show={showDeleteModal}
        handleClose={closeDeleteModal}
      />
    </>
  );
}
