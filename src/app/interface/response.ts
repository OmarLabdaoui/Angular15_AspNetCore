export interface response<T> {
    data?: T,
    message?: String,
    isSucess?: Boolean,
    page?: Number,
    currentPage?: Number,
}