// const validator = require('validator')


// const validateSignUpData = (req) => {
//     const { name, email, password } = req.body
//     if (!name) {
//         throw new Error("Please Enter Valid Name")
//     }
//     else if (!validator.isEmail(email)) {
//         throw new Error("Please Enter Valid Email")
//     }
//     else if (!validator.isStrongPassword(password)) {
//         throw new Error("Please Enter Valid Password")
//     }
// }




// const validateEditProfile = (req) => {
//     const allowedEditFileData = [
//         "age", "skills"
//     ]

//     const isEditAllowed = Object.keys(req.body).every((field) => {
//         allowedEditFileData.includes(field)
//     })

//     return isEditAllowed
// }


// module.exports = {
//     validateEditProfile,
//     validateSignUpData
// }