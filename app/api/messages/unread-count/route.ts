
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utilis/getSessionUser";

export const dynamic = 'force-dynamic';

// get /api/messages/unread-count
export const GET = async (request: any) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.user){
            return new Response('User Id is required',{status: 401});
        }
        const {userId} = sessionUser;
        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });
        return new Response(JSON.stringify(count),{status: 200})
    } catch (error) {
        console.log(error);
        return new Response('something went wrong',{status: 500});
    }
}