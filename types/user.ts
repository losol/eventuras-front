export type AccessTokenType = string | null | undefined;

export type UserType = {
  id: number | null;
  email: string | null;
  name: string | null;
  phoneNumber?: string | null;
  accessToken: string | null;
};

// From next-auth
// export interface DefaultSession {
//   user?: {
//     name?: string | null
//     email?: string | null
//     image?: string | null
//   }
//   expires: ISODateString
// }
