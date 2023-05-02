export interface Fruits {
    id: string
    name: string,
    image: string,
    price: number
}
export interface CrudAction<T> {
    action: "Add" | "Update" | "Delete",
    Data:T
}