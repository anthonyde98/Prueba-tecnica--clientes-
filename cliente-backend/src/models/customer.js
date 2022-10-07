const mongoose = require("mongoose");
const validator = require('validator');
const message = 'Por favor, coloque ';

const customerSchema = mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: [true, `${message}un nombre`],
    },
    last_name: {
        trim: true,
        type: String,
        required: [true, `${message}un apellido`]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `${message}un correo valido`,
        }
    },
    birth_date: {
        type: Date,
        required: true
    },
    telephone: {
        type: String,
        required: [true, `${message}un número de telefono`],
        trim: true
    },
    identity_document: {
        type: String,
        required: [true, `${message}un número de identificación`],
        unique: true,
        trim: true
    },
    addresses: [
        {
            street: {
                type: String,
                required: [true, `${message}una calle`],
                trim: true
            },
            building: {
                type: String,
                required: [true, `${message}una casa o edificio`],
                trim: true
            },
            sector: {
                type: String,
                required: [true, `${message}un sector`],
                trim: true
            },
            city: {
                type: String,
                required: [true, `${message}una ciudad`],
                trim: true
            },
            municipality: {
                type: String,
                required: [true, `${message}un municipio`],
                trim: true
            },
            postal_code: {
                type: String,
                required: [true, `${message}un código postal`],
                trim: true
            },
            _id: false
        }
    ],
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);