"use client";

import '@/styles/page/user/deleteaccout/DeleteAccount.css'; // Import the CSS file
import { useState } from 'react';

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');

  const handleInputChange = (e) => {
    setConfirmText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmText === 'DELETE') {
      // Proceed with the account deletion
      alert('Account deleted successfully.');
    } else {
      alert('Please type DELETE to confirm.');
    }
  };

  return (
    <div className="delete-account-container">
      <h2 className="delete-account-title">Delete Account</h2>
      <p className="delete-account-text">
        Are you sure you want to delete your account? This action is irreversible. 
        Please type <strong>DELETE</strong> in the field below to confirm.
      </p>
      <form className="delete-account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            id="confirmText" 
            className="form-input" 
            placeholder="Type DELETE to confirm" 
            value={confirmText} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="form-button delete-button">Delete Account</button>
      </form>
    </div>
  );
};

export default DeleteAccount;