const {Router} = require ("express")
const { check } = require ("express-validator");
const { register } = require("../controllers/users");
const validateFields = require ("../middlewares/validateFields")

const { login } = require 


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

router.post ("/register", register)

module.exports = router;