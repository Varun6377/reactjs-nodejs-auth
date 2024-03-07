import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaUser, FaLock, FaUserCircle } from "react-icons/fa";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        <div className="position mx-auto">
          <h1 className="sign-in bg-custom text-center">Sign In</h1>
        </div>
        <div className="text-center">
          <FaUserCircle className="profile-icon" />
        </div>{" "}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <InputGroup>
              <InputGroup.Text className="input border-0">
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input border-0 form-control-lg"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <InputGroup>
              <InputGroup.Text className="input  border-0">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input border-0 form-control-lg"
              />
            </InputGroup>
          </Form.Group>
          <Row className="auth-link-text">
            <Col>
              New User?{" "}
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </Col>
          </Row>
          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="auth-btn btn-lg mt-4 bg-custom d-flex justify-content-center align-items-center mx-auto custom-button border-0"
          >
            Login In
          </Button>
        </Form>
      </FormContainer>
      {isLoading && <Loader />}
    </>
  );
};

export default LoginScreen;
