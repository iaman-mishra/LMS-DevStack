import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const {data ,type} = req.body;

        switch (type){
            case 'user.created':{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address, // Correct field
                    name: data.first_name + ' ' + data.last_name,
                    imageUrl: data.image_url, // Corrected key
                }
                await User.create(userData);
                res.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address, // Correct field
                    name: data.first_name + ' ' + data.last_name,
                    imageUrl: data.image_url, // Corrected key
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.json({});
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
            }
        }
    } catch (error) {
        res.json({sucess:false, message:error.message})
    }
}