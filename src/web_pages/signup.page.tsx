import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services_graphqlApp/user.connect";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSignUp = () => {
    if (email.length === 0) {
      alert("Enter Email");
    } else if (firstName.length === 0) {
      alert("Enter First name");
    } else if (lastName.length === 0) {
      alert("Enter Last Name");
    } else {
      const result = signup(email, firstName, lastName, password);
      if (result !== null) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container" style={{ width: "50%" }}>
      <div
        className="card p-3 m-5 border border-primary"
        style={{ borderRadius: "15px" }}
      >
        <h1 className="header">Sign Up</h1>
        <div className="form">
          <div className="mb-3 m-2">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              placeholder="xyz@email.com"
            />
          </div>

          <div className="mb-3 m-2">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              First Name
            </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="firstName"
              className="form-control"
              placeholder="John"
            />
          </div>
          <div className="mb-3 m-2">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Last Name
            </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="lastName"
              className="form-control"
              placeholder="the Don"
            />
          </div>

          <div className="mb-3 m-2">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="password"
            />
          </div>
          <div className="mb-3 m-2">
            <div className="m-2">
              Aleady have an account ? <Link to="/">Sign In hare</Link>
            </div>
            <div className="header">
              <button
                onClick={onSignUp}
                className="btn btn-primary btn-lg m-2"
                style={{ fontWeight: "bold" }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
