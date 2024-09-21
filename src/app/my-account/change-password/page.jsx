import "@/styles/app/my-account/change-password/style.css";

const ChangePassword = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Change Password</h2>
      <form>
        <div className="form-group">
          <label htmlFor="old-password">Your Old Password</label>
          <input
            type="password"
            id="old-password"
            className="form-input"
            placeholder="Enter old password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Your New Password</label>
          <input
            type="password"
            id="new-password"
            className="form-input"
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Your New Password</label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="form-button">Update</button>
      </form>
    </div>
  )
}

export default ChangePassword