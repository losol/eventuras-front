export type AccessTokenType = string | null | undefined;

export type UserType = {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  accessToken: string;
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
