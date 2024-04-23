export interface AuthenticationResponse {
  accessToken?: string;
  mfaEnabled?: string;
  status?: string;
  userId?: string;
  role?: string;
}
