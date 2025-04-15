declare global {
  // Needs a type parameter because of the way it's used in `livekit-client`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type FinalizationRegistry<T> = any;
}

export {};
