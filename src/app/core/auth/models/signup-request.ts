export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type SignupErrorKind = 'emailAlreadyExists' | 'unknown';
