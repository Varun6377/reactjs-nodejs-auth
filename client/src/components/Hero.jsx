import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Authentication</h1>
          <p className="text-center mb-4">
            This website facilitates, secure storage of a JSON Web Token (JWT)
            in an HTTP-only cookie. It utilizes Redux Toolkit and bootstrap.
          </p>
          {!userInfo ? (
            <div className="d-flex">
              <Button variant="primary" href="/login" className="me-3">
                Login In
              </Button>
              <Button variant="secondary" href="/register">
                Register
              </Button>
            </div>
          ) : (
            <LinkContainer to="/profile">
              <div className="d-flex">
                <Button variant="primary" className="me-3">
                  Profile Screen
                </Button>
              </div>
            </LinkContainer>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
