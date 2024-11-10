import React, { useState } from "react";
import "./App.css";

function defineRule() {
  // State hooks to store user input and encrypted password
  const [password, setPassword] = useState("");
  const [shiftValue, setShiftValue] = useState(3); // Default shift value of 3
  const [encryptedPassword, setEncryptedPassword] = useState("");

  // Function to apply Caesar Cipher encryption
  const encryptPassword = (password, shift) => {
    let encryptedPassword = "";

    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      let charCode = char.charCodeAt(0);

      // If the character is an uppercase letter (A-Z)
      if (charCode >= 65 && charCode <= 90) {
        encryptedPassword += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      }
      // If the character is a lowercase letter (a-z)
      else if (charCode >= 97 && charCode <= 122) {
        encryptedPassword += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      }
      // If the character is not a letter, leave it unchanged
      else {
        encryptedPassword += char;
      }
    }

    return encryptedPassword;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const encrypted = encryptPassword(password, shiftValue);
    setEncryptedPassword(encrypted); // Set the encrypted password to state
  };

  return (
    <div className="App">
      <h1>Custom Password Encryption</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="passwordInput">Enter Password:</label>
          <input
            type="text"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="shiftValue">Shift Value (for Caesar Cipher):</label>
          <input
            type="number"
            id="shiftValue"
            value={shiftValue}
            min="1"
            max="26"
            onChange={(e) => setShiftValue(parseInt(e.target.value))}
            required
          />
        </div>

        <button type="submit">Encrypt Password</button>
      </form>

      <h2>Encrypted Password:</h2>
      <p>{encryptedPassword || "Your encrypted password will appear here."}</p>
    </div>
  );
}

export default App;