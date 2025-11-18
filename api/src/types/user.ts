export interface User {
  customerId: string;
  gender: "male" | "female" | "diverse" | "";
  givenName: string;
  surName: string;
  birthDate: string; // ISO date string
  isBusinessCustomer: boolean;
}
