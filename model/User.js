const {Shema, model } = require ("mongoose")

const UserShema = new Shema (

    {
        name: {
            type: String,
            require: [true, "El nombre es requerido"],
            default: "Usuario sin nombre",
            uppercase: true,
            trim: true,
            minLenght: [2, "Debe tener al menos dos caraceres"],
            maxLenght:[30, "Debe tener como maximo treinta caracteres"]
        },

        email: {
            type: String
        },
        age: {
            type: Number
        },
        lastname: {
            type: String
        },
        admin: {
            type: Boolean
        },
        password: {
            type: String,
            tris: true,
            require: [true, "Contraseña Obligatoria"]
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

    UserShema.methods.toJSON = function () {
        const {password, ...user} = this.toOBject(); 
        return user;
    }

    module.exports = model ("User", UserShema)


