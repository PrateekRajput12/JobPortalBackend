import { Company } from '../Models/company.Model.js'
import cloudinary from '../utils/cloudinary.js'
import getDataUri from '../utils/datauri.js'

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body

        if (!companyName) {
            return res.status(400).json({
                message: "Company name required",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(400).json({
                message: "You cannot add register comapny again",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })



        return res.status(200).json({
            message: "COmpany registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log("error in register compnay ", error);
    }
}



export const getCompany = async (req, res) => {
    try {

        const userId = req.id


        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true

        })


    } catch (error) {
        console.log("Error ", error);
    }


}



export const getCOmpanyById = async (req, res) => {
    try {
        const companyId = req.params.id

        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log("Err", error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body

        // console.log(req.file);
        const file = req?.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url

        const updateData = { name, description, location, website, logo }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "Comapny not found",
                success: false

            })
        }

        return res.status(200).json({
            message: "COmpany info updated",

            success: true
        })
    } catch (error) {
        console.log("Err", error);
    }
}