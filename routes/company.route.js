import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getCompany, getCOmpanyById, registerCompany, updateCompany } from '../controllers/company.Controller.js'
import { singleUpload } from '../middleware/multer.js'
const router = express.Router()


router.route("/register").post(isAuthenticated, registerCompany)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCOmpanyById)    // student
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany)



export default router