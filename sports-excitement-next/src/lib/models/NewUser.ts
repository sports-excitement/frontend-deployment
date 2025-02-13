export interface NewUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
