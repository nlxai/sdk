import type React from "react";
import { useEffect, useState, useRef, type FC } from "react";

import "./Address.css";

interface MapProps {
  lat: number;
  lng: number;
  className?: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current != null) {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      });

      // eslint-disable-next-line no-new
      new (window as any).google.maps.Marker({
        map,
        position: { lat, lng },
      });
    }
  }, [lat, lng]);

  return <div className={className} ref={mapRef} />;
};

const AddressInput: FC<{
  onAddressChange: (address: string) => void;
  address: string;
  submitted: boolean;
  onSubmit: () => void;
}> = ({ onAddressChange, address, onSubmit, submitted }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = (): void => {
      // if already loaded
      if ((window as any).google != null) {
        return;
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleMapsLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = (): void => {
      if ((window as any).google == null || textareaRef.current == null) return;

      const autocomplete = new (window as any).google.maps.places.Autocomplete(
        textareaRef.current,
        { types: ["address"] },
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const addressComponents = place.address_components;

        let street = "";
        let city = "";
        let state = "";
        let postalCode = "";
        let country = "";

        addressComponents.forEach((component: any) => {
          const types = component.types;
          const value = component.long_name;

          // initial eslint integration
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (types.includes("street_number") || types.includes("route")) {
            street += `${value} `;
            // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          } else if (types.includes("locality")) {
            city = value;
            // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          } else if (types.includes("administrative_area_level_1")) {
            state = value;
            // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          } else if (types.includes("postal_code")) {
            postalCode = value;
            // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          } else if (types.includes("country")) {
            country = value;
          }
        });

        const location = place.geometry?.location;
        if (location != null) {
          setCoordinates({ lat: location.lat(), lng: location.lng() });
        }

        const formatted = `${street.trim()}\n${city}, ${state} ${postalCode} ${country}`;
        onAddressChange(formatted);
      });
    };

    initializeAutocomplete();
  }, [isGoogleMapsLoaded, onAddressChange]);

  return (
    <form
      className="address-container"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <textarea
        ref={textareaRef}
        value={address}
        onChange={(e) => {
          onAddressChange(e.target.value);
        }}
        placeholder="Enter address here"
        rows={5}
        className="address-textarea"
      />
      {coordinates != null && (
        <Map
          className="map-container"
          lat={coordinates.lat}
          lng={coordinates.lng}
        />
      )}
      <button disabled={coordinates == null || submitted != null} type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddressInput;
