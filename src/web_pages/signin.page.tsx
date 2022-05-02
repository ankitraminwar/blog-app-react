import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services_graphqlApp/user.connect";

const SignInPage = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSignin = async () => {
    if (email.length === 0) {
      alert("Set Email");
    } else if (password.length === 0) {
      alert("Set Password");
    } else {
      const result = await signin(email, password);
      console.log(result)
      if (result.data.errors && result.data.errors.lenght >0 ) {
        const error = result.data.errors[0].message
        alert(error)
      } else{
            if (result.data) {
        const token = result.data.data.signin.token;

        sessionStorage["token"] = token;
        sessionStorage["email"] = email;
        navigate("/Home");
      }}
    }
  };

  return (
    <div className="container" style={{ width: "50%" }}>
      <div
        className="card center p-3 m-5 border border-primary"
        style={{ borderRadius: "15px" }}
      >
        <h1 className="header font-weight-bold">Sign In</h1>
        <div className="form">
          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <div>
              Don't have an account ? <Link to="/SignUp">Sign Up here</Link>
            </div>
            <div className="header">
              <button
                type="submit"
                onClick={onSignin}
                className="btn btn-primary btn-lg m-2"
                style={{ fontWeight: "bold" }}
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
