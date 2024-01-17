import React, { useState, ChangeEvent, FormEvent } from "react";
import "./SecureInput.css";
import checkmarkIcon from "./checkmark.svg";

const SecureInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="success-container">
        <img className="checkmark-icon" src={checkmarkIcon} alt="checkmark" />
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={handleEmailChange}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={handlePasswordChange}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SecureInput;
