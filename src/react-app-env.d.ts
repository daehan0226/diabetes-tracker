/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_GOOGLE_CLIENT_ID: string;
    REACT_APP_FIREBASE_API_KEY: string;
    REACT_APP_FIREBASE_AUTH_DOMAIN: string;
    REACT_APP_FIREBASE_PROJECT_ID: string;
    REACT_APP_FIREBASE_STORAGE_BUCKET: string;
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
    REACT_APP_FIREBASE_DILAY_TRACKING_COLLECTION: string;
    REACT_APP_GOOGLE_APP_ID: string;
    REACT_APP_S3_BUCKET: string;
    REACT_APP_S3_REGION: string;
    REACT_APP_S3_ACCESS_KEY_ID: string;
    REACT_APP_S3_SECRET_ACCESS_KEY: string;
    REACT_APP_API: string;
  }
}