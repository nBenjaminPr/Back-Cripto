const {Router} = require ("express")
const { check } = require ("express-validator");
const validateFields = require ("../middlewares/validateFields")
const {login, register} = require ("./../controllers/users")


const router = Router ();

router.post (
    "/login",
    [
        check ("email").isEmail().isLength ({min:5, max: 50}),
        check ("password").not().isEmpty(),
        validateFields,
    ],
    login

);

router.post ("/register", [
    check (
        "name",
        "El formato debe contener Minimo 8 caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minucula, Al menos un dígito, No espacios en blanco Al menos 1 caracter especial"
    )
    .isString()
    .isLength({min: 2, max: 30}),
    check("lastname").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check ("email").isEmail(),
    check ("age").isFloat({min:0, max: 150}),
    check ("password")
    .not()
    .isEmpty()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/),
    validateFields,

], 

register),

module.exports = router;