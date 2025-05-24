import { Application } from "../Models/application.Model.js"
import { Job } from "../Models/job.Model.js"


export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id


        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })

        if (existingApplication) {
            return res.status(400).json({
                message: "You Have already applied for this jobs",
                success: false
            })
        }

        // check if job exist

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({
                message: "Job Not Found",
                success: false
            })
        }
        // create new application

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message: "Job Applied successfully",
            success: true
        })
    } catch (error) {
        console.log("Err", error);
    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate(
            {
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } }
                }
            }
        )

        if (!application) {
            return res.status(404).json({
                message: "Not Applicarion ", success: false
            })
        }

        return res.status(200).json({
            application, success: true
        })
    } catch (error) {
        console.log("err", error);
    }
}


// admin dekhega kitne user ne apply kiya h 
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        })


        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id


        if (!status) {
            return res.status(404).json({
                message: "Status required",
                success: false
            })
        }

        // find applicarion by applicant id

        const application = await Application.findOne({ _id: applicationId })

        if (!application) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // update the status


        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status Updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}