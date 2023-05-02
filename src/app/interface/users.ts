export interface Users {
    id?: string,
    fullName?: string,
    email?: string,
    password?: string,
    role?: string,
    token?: string,
    createdAT?: Date
}
export interface UserCrud<T> {
    action?: "get" | "update" | "delete" | "add",
    data?: T
    page?: number
}