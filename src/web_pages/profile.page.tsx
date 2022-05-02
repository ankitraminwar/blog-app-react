import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileDel, profileUpdate } from "../services_graphqlApp/user.connect";

const ProfilePage = (props: any) => {
  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const { email, firstName, lastName } = profile;
  const onInputchange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
console.log(email)
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await profileDel();
    console.log(result.data);
    if (result.data) {
      setProfile(result.data.profile);
    }
  };

  const updatePro = async () => {
    const result = await profileUpdate(email, firstName, lastName);
    console.log(result)
    if (result) {
      navigate('/Home')
    }
  };

  sessionStorage['firstName'] =firstName
  sessionStorage['lastName'] =lastName
  return (
    <div className="container_b" >
      <h1 className="header">Profile</h1>

      <div className="form">
        <div className="mb-3">
          <label className="form-label">User Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {onInputchange(e)}}
            className="form-control"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => onInputchange(e)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            value={lastName}
            onChange={e => onInputchange(e)}
            type="text"
            className="form-control"
            
          />
        </div>

        <div className="header mb-3 m-2">
          <button className="btn btn-primary" onClick={updatePro}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
