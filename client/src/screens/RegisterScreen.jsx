import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [isInputActive, setInputActive] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password, dob }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="position mx-auto d-flex justify-content-center">
          <h1 className="sign-in mb-3 bg-custom text-center">Register</h1>
        </div>
        <div className="text-center">
          <FaUserCircle className="profile-icon" />
        </div>{" "}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input border-0 form-control-lg"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="dob">
            <Form.Control
              type={isInputActive ? "date" : "text"}
              placeholder="Enter Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              className="input border-0 form-control-lg"
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border-0 form-control-lg"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input border-0 form-control-lg"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input border-0 form-control-lg"
            ></Form.Control>
          </Form.Group>

          <Row className="py-3 auth-link-text">
            <Col>
              Already have an account?{" "}
              <Link to={`/login`} className="auth-link">
                Login
              </Link>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="primary"
            className="auth-btn btn-lg mt-2 bg-custom d-flex justify-content-center align-items-center mx-auto custom-button border-0"
          >
            Register
          </Button>
        </Form>
      </FormContainer>
      {isLoading && <Loader />}
    </>
  );
};

export default RegisterScreen;
