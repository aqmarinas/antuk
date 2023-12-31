const profileModel = require('../models/profile')

const getProfileController = async (req, res) => {
    try {
        const user = await profileModel.showProfileModel(req.decodedToken)
        if (user){
            res.status(200).json({
                message: 'Get user success',
                data: {
                    idUser: user.idUser,
                    phoneNumber: user.phoneNumber,
                    fullName: user.fullName
                }
            })
        }    
    } catch (error){
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        })
    }
}

const editProfileController = async (req, res) => {
    const {body} = req
    
    try {
        const idUser = await profileModel.updateProfileModel(body, req.decodedToken)
        if (idUser){
            res.status(201).json({
                message: 'Update user success',
                data: {
                    idUser: idUser,
                    phoneNumber: body.phoneNumber,
                    fullName: body.fullName
                }
            })
        }
    } catch (error){
        if (error.message === 'Phone number already registered'){
            return res.status(400).json({
                message: error.message
            })
        }
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        })
    }
}

const resetPasswordController = async (req, res) => {
    const {body} = req
    
    try {
        const user = await profileModel.resetPasswordModel(body, req.decodedToken)
        if (user){
            res.status(201).json({
                message: 'Reset password success',
            })
        }
    } catch (error){
            res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        })

    }
}

module.exports = { getProfileController, editProfileController, resetPasswordController }