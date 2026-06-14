import React from 'react';
import '../styles/styles.css';
import { Link} from 'react-router-dom';
import axios from 'axios';
 
const PartnerRegister = () => {

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");

  const handlesubmit = async (e) => {
     e.preventDafault();

     try{
     const responce = await axios.post(
      "http://localhost:3200/api/auth/food-partner/register",
      {
        businessName: businessName,
        username: firstName,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
     );
     console.log(responce.data); 
   } catch(error) {
    console.log(error.response?.data || error.message);
   }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Food Partner</span>
        <h1>Register Restaurant</h1>
        <p>Grow your business with us</p>
      </div>

      <form className="auth-form" onSubmit={handlesubmit}>


        <div className="input-group">
          <label>Restaurant Name</label>
          <input type="text" placeholder="Al-Habib Biryani" 
          value={businessName} onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Owner Name</label>
          <input type="text" placeholder="Full Name" 
          value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
        </div>

        <div className="input-group">
          <label>Business Email</label>
          <input type="email" placeholder="owner@restaurant.com" 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
 
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" 
          value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="button" className="btn">Register Restaurant</button>
      </form>

      <div className="switch-link">
        Already registered? <a href="/partner-login">Login</a>
      </div>
    </div>
  );
};

export default PartnerRegister;