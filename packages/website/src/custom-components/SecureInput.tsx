import type React from "react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./SecureInput.css";

const SecureInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {}

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="success-container">
        <span>✅</span>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="form-input"
          autoComplete="email"
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
          autoComplete="current-password"
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
