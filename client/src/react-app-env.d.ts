/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_GOOGLE_MAPS_KEY: string;
    }
  }
}

export {};
