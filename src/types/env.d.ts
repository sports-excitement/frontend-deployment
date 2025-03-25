interface Env {
  FIREBASE_API_KEY: string;
}

interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  localId: string;
  emailVerified: boolean;
  error?: {
    message: string;
    code: string;
  };
}
