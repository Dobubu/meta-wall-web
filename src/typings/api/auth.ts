export interface SignUpReq {
  name: string;
  email: string;
  password: string;
}

export type LoginReq = Pick<SignUpReq, 'email' | 'password'>;

export interface LoginRes {
  token: string;
  name: string;
  id: string;
}
