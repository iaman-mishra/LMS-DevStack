import {clerkClient} from '@clerk/express';

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                role: 'educator',
            }
        })
        res.json({sucess: true, message: 'You can publish a course now' })
    } catch (error) {
        res.json({success: false, message: error.message })
    }
}