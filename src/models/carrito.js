const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre_articulo:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    cantidad:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    imagen:{
        data: Buffer,
        contentType: String
    },
    cuenta:[{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
},
    {
        timestamps: true,
        versionKey: false
    }

);

module.exports = mongoose.model('carrito', userSchema);