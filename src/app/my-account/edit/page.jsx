import "./style.css";

const EditAccount = () => {
  return (
    <div className="edit-account-container">
      <h2 className="edit-account-title">Edit Account</h2>
      <form className="edit-account-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="form-input" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" className="form-input" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-input" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" className="form-input" placeholder="Enter your country" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" className="form-input" placeholder="Enter your city" />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input type="text" id="contact" className="form-input" placeholder="Enter your contact number" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" className="form-input" placeholder="Enter your address"></textarea>
        </div>
        <button type="submit" className="form-button">Save Changes</button>
      </form>
    </div>
  )
}

export default EditAccount