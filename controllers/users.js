const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const User = require("../model/User");
const CustomError = require ("../utils/CustomError");


const login = async (req, res) => {

try {
    const {email, password } = req.body;
    if (!email || !password )
    throw new CustomError ("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne ({email});

    if (!user) throw new CustomError ("Usuario no encontrado", 400)
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError ("Contraseña incorrecta", 400)
    const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h" ,
})

res
    .status (200)
    .json ({message : "Ingreso correcto", user, token});

} catch (error) {
    res
        .status (error.code || 500)
        .json ({message: error.message || "algo exploto : |" })
}
};

const register = async(req, res) => {

try {
    const { name, lastname, age, email,password} = 

    req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        lastname,
        email,
        age,
        admin: false,
        password: passwordEncrypted
    });

    const userSaved = await newUser.save();
    res
        .status(200)
        .json({message: "El Usuario se agrego con exito", user: userSaved})

} catch (error) {
    res.status(error.code || 500 )
        .json({message: error.message || "algo exploto :(" 
    })
}

}

module.exports = {login, register}