import React, { type ReactNode } from "react";

export const MinimizeIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M6 19h12v2H6z" />
  </svg>
);

export const CloseIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const ChatIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

export const SendIcon = (): ReactNode => (
  <svg viewBox="0 0 360 360" stroke="none" fill="currentColor">
    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const DownloadIcon = (): ReactNode => (
  <svg viewBox="0 0 360 360" stroke="none" fill="currentColor">
    <path d="M320,320.496l-280,0l0,-40l280,0l0,40Zm-120,-148.284l40,-40c9.428,9.428 18.856,18.856 28.284,28.284l-88.284,88.284l-28.284,-28.284l0,0l-60,-60l28.284,-28.284l40,40l0,-131.716l40,0l0,131.716Z" />
  </svg>
);

export const ErrorOutlineIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);
