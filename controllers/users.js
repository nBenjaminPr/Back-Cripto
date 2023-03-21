const CustomError = require ("../utils/CustonError");


const login = async (req, res) => {

try {
    const {email, password } = req.body;
    if (!email || !password )
    throw new CustomError ("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne ({email});

    if (!user) throw new CustomError ("Usuario no encontrado", 400)
    const passOk = await bcrupt.compare(password, user.password);
    if (!passOk) throw new CustomError ("Contraseña incorrecta", 400)
    const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h" ,
})

res
    .status (200)
    .json ({message : "Ingreso correcto", ok: true, user, token});

} catch (error) {
    res
        .status (error.code || 500)
        .json ({message: error.message || "algo exploto : |" })
}

}