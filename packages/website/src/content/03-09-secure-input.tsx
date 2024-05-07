import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import SecureInput from "../custom-components/SecureInput";

export const content = `
This component allows you to create a secure input field. The input field is rendered in an iframe, and the inputted data is sent to the bot via a secure channel. This means that the inputted data is not accessible to the website owner.

~~~js
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
    } catch (error) {}

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
~~~
`;

export const WebWidgetComponentsSecureInput = (): JSX.Element => {
  const [submitted] = useState(false);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: <SecureInput />,
      },
    ],
  ];

  if (submitted) {
    items.push([
      {
        type: "bot",
        message: `Thank you! You're now logged in.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="Secure input" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
