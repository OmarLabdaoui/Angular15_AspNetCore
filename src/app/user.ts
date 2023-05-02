export interface User {
    id?: string
    fullname: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    token?: string | null | undefined
}
