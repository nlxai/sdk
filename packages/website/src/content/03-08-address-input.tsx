import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import { addressInputSnippet, mapSnippet } from "../snippets";
import AddressInput from "../custom-components/Address";

export const content = `
The address input component is used to collect a user's address. It uses Google Maps to autocomplete the address.

~~~js
${mapSnippet}

${addressInputSnippet}
~~~
`;

export const WebWidgetComponentsAddressInput = () => {
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: (
          <AddressInput
            address={formattedAddress}
            onAddressChange={(address: string) => { setFormattedAddress(address); }}
            submitted={submitted}
            onSubmit={() => { setSubmitted(true); }}
          />
        ),
      },
    ],
  ];

  if (submitted) {
    items.push([
      {
        type: "bot",
        message: `Thank you! The address you submitted was ${formattedAddress.replace(
          "\n",
          ", ",
        )}.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="Address input" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
