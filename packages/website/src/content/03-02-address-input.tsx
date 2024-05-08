import { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import AddressInput from "../custom-components/Address";

export const content = `
The address input component is used to collect a user's address. It uses Google Maps to autocomplete the address.

~~~js
const Map = ({ lat, lng, className }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      });

      new google.maps.Marker({
        map: map,
        position: { lat, lng },
      });
    }
  }, [lat, lng]);

  return html\`<div className=\${className} ref=\${mapRef}></div>\`;
};


const AddressInput = ({ onAddressChange, address, onSubmit, submitted }) => {
  const [coordinates, setCoordinates] = useState(null);
  const textareaRef = useRef(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        return;
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + import.meta.env.VITE_GOOGLE_MAPS_API_KEY + '&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!window.google || !textareaRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(
        textareaRef.current,
        { types: ['address'] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // ... rest of the logic
      });
    };

    initializeAutocomplete();
  }, [isGoogleMapsLoaded]);

  return html\`
    <form
      className="address-container"
      onSubmit=\${(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <textarea
        ref=\${textareaRef}
        value=\${address}
        onChange=\${(e) => onAddressChange(e.target.value)}
        placeholder="Enter address here"
        rows={5}
        className="address-textarea"
      />
      \${coordinates ?
        '<Map className="map-container" lat=' + coordinates.lat + ' lng=' + coordinates.lng + ' />' :
        '<div className="map-placeholder"></div>'
      }
      <button disabled=\${!coordinates || submitted} type="submit">Submit</button>
    </form>
  \`;
};
~~~
`;

export const WebWidgetComponentsAddressInput = (): JSX.Element => {
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: (
          <AddressInput
            address={formattedAddress}
            onAddressChange={(address: string) => {
              setFormattedAddress(address);
            }}
            submitted={submitted}
            onSubmit={() => {
              setSubmitted(true);
            }}
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
