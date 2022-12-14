const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        require: true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        require: true,
        unique: false,
        trim: true

    },
    name:{
        type: String,
        require: true,
        unique:false,
        trim:true

    },
    phone:{
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    status:{
        type: String,
        require: false,
        unique: false,
        trim: true
    },
    cuenta:{
        type: String,
        require: true,
        unique: false,
        trim: true 
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);