const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre_articulo:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    color:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    tamano:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    talla:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    descripcion:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    fabricante:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    material:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    categoria:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    imagen:{
        data: Buffer,
        contentType: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('producto', userSchema);