import { type FC, useEffect, useRef } from "react";
import type { TouchpointInstance, TouchpointConfiguration } from '@nlxai/touchpoint-ui';
import { useTouchpoint } from "../contexts/TouchpointContext"; // Import the hook

const touchpointConfigBase: Omit<TouchpointConfiguration, 'customModalities'> = {
    config: {
        applicationUrl: "https://bots.dev.studio.nlx.ai/c/Z5PChFXUCcLUfu2cqBMA8/JUSIkZ2CY9Yb2pFbwbYvB",
        headers: {
            "nlx-api-key": "LEdutkF7fZ1Kr/ISvQ"
        },
        languageCode: "en-US"
    },
};

export const Touchpoint: FC<unknown> = () => {
    const { setInstance } = useTouchpoint(); // Get setInstance from context
    const instanceRef = useRef<TouchpointInstance | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const initTouchpoint = async () => {
        // Prevent initialization if critical config is missing
        if (!touchpointConfigBase.config.applicationUrl || touchpointConfigBase.config.applicationUrl === "YOUR_APPLICATION_URL" ||
            !touchpointConfigBase.config.headers["nlx-api-key"] || touchpointConfigBase.config.headers["nlx-api-key"] === "YOUR_API_KEY") {
          console.warn("Touchpoint applicationUrl or nlx-api-key is not configured. Skipping Touchpoint initialization.");
          if (isMounted) {
            setInstance(null);
          }
          return;
        }
  
        if (typeof window !== 'undefined') { // Ensure this runs only on the client
            try {
                const { create } = await import('@nlxai/touchpoint-ui');
                const { ProductCardComponent, CarouselExampleComponent, ButtonExampleComponent, IconButtonExampleComponent, DateInputExampleComponent } = await import('./TouchpointComponents/TouchpointBasicExamples');

                const touchpointConfig: TouchpointConfiguration = {
                    ...touchpointConfigBase,
                    customModalities: {
                        ProductCard: ProductCardComponent,
                        CarouselExample: CarouselExampleComponent,
                        ButtonExample: ButtonExampleComponent,
                        IconButtonExample: IconButtonExampleComponent,
                        DateInputExample: DateInputExampleComponent,
                    }
                };

                const newInstance = await create(touchpointConfig);
    
                if (isMounted) {
                instanceRef.current = newInstance;
                setInstance(newInstance);
                }
            } catch (error) {
                console.error("Failed to initialize Touchpoint:", error);
                if (isMounted) {
                setInstance(null);
                }
            }
        } else {
            // In SSR, Touchpoint won't be initialized.
            if (isMounted) {
                setInstance(null);
            }
        }
      };
  
      initTouchpoint();
  
      return () => {
        isMounted = false;
        instanceRef.current?.teardown();
        // Set instance to null in context when component unmounts or effect cleans up
        if (isMounted) { // Check isMounted again, though typically setInstance should be callable
            setInstance(null);
        }
        instanceRef.current = null;
      };
    }, [setInstance]); // setInstance is stable, but good to include if its identity could change
  
    // The Touchpoint UI (launch button or embedded UI) is typically injected into the DOM by the `create` function.
    // This component doesn't render anything directly into its place in the React tree.
    return null;
  };