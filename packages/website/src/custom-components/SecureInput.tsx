import React, { useState, type ChangeEvent, type FormEvent } from "react";
import "./SecureInput.css";
import checkmarkIcon from "./checkmark.svg";

const SecureInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      {/* initial eslint integration */}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
