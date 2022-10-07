export interface Icliente {
    _id: string,
    name: string,
    last_name: string,
    email: string,
    birth_date: Date,
    telephone: string,
    identity_document: string,
    addresses: [
        {
            street: string,
            building: string,
            sector: string,
            city: string,
            municipality: string,
            postal_code: string
        }
    ],
    status: boolean
}
