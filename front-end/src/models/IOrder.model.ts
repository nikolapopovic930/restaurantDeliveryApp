export default interface IOrder {
    _id?: string;
    status: string
    cartId: string
    deliveryInfo: {
        address: string
        city: string
        country: string
        phoneNumber: string
        note: string
    }
}