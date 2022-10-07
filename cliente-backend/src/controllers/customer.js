const customerSchema = require("../models/customer");

const createCustomer = async (req, res) => {
    const costumerElements = Object.keys(req.body);
    const allowedElements = ['name', 'last_name', 'email', 'birth_date', 'telephone', 'addresses', 'identity_document'];
    
    const isValidOperation = () => {
        let response = true;

        for(let i = 0; i < allowedElements.length; i++) {
            if(!costumerElements.includes(allowedElements[i])){
                response = false;
            }
        }

        return response;
    }

    if(!isValidOperation()) {
        return res.status(400).json({ message: 'Elementos incorrectos.' })
    }

    const customer = req.body;

    try{
        const emailAlreadyExists = await customerSchema.findOne({ email: customer.email });

        if (emailAlreadyExists) {
            return res.status(400).json({ message: 'Un cliente ya tiene este correo.' });
        }

        const identityAlreadyExists = await customerSchema.findOne({ identity_document: customer.identity_document });

        if (identityAlreadyExists) {
            return res.status(400).json({ message: 'Un cliente ya tiene este documento de identidad.' });
        }

        customer.status = true;

        const createdCustomer = await customerSchema.create(customer);

        return res.status(201).json(createdCustomer);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const findCustomer = async (req, res) => {
    const { id } = req.params;

    try{
        const customer = await customerSchema.findById(id);
        
        if(customer){
            return res.status(200).json(customer);
        }
            
        return res.status(404).json();
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const findCustomers = async (req, res) => {
    const {filterBy, filter, orderBy, order} = req.query;
    let query = {};

    if(filter && filterBy){
        if(filterBy === 'birth_date'){
            query = { birth_date: new Date(filter) } 
        }
        else{
            query[filterBy] = { $regex: filter, $options: 'i' };
        }
    }

    query.status = true;

    try{
        let customers;

        if(order && orderBy){
            customers = await customerSchema.find(query).sort([[orderBy, order === 'asc' ? 1 : -1]]);
        }
        else{
            customers = await customerSchema.find(query);
        }

        return res.status(200).json(customers);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const customer = req.body;

    try{
        const response = await customerSchema.findByIdAndUpdate(id, customer, { new: true, runValidators: true });

        if(!response){
            return res.status(404).json();
        }

        return res.status(200).json(response);
    }
    catch(error){
        return res.status(400).json(error);
    }
}

const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try{
        const response = await customerSchema.findByIdAndUpdate(id, { status: false });

        if(!response){
            return res.status(404).json();
        }

        return res.status(200).json({ message: "Cliente eliminado."});
    }
    catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    createCustomer,
    findCustomer,
    findCustomers,
    updateCustomer,
    deleteCustomer
}