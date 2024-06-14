
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utilis/getSessionUser";


export const dynamic = 'force-dynamic';

// put /api/messages/:id
export const PUT = async (request: any, {params}:any) => {
    try {
        await connectDB();
        const {id} = params;
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.user){
            return new Response('User ID is required',{status: 401})
        }
        const {userId} = sessionUser;
        const message = await Message.findById(id);
        if(!message) return new Response('Message not found',{status: 404});
        // verify ownership
        if(message.recipient.toString() !== userId){
            return new Response('Unauthorized',{status: 401});
        }
        // update message to read/unread depending on the current status
        message.read = !message.read;
        await message.save();

        return new Response(JSON.stringify(message),{status: 200});

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status: 500});
    }
}

// delete /api/message/:id
export const DELETE = async (request: any, {params}:any) => {
    try {
        await connectDB();
        const {id} = params;
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.user){
            return new Response('User ID is required',{status: 401})
        }
        const {userId} = sessionUser;
        const message = await Message.findById(id);
        if(!message) return new Response('Message not found',{status: 404});
        // verify ownership
        if(message.recipient.toString() !== userId){
            return new Response('Unauthorized',{status: 401});
        }
        // delete
        await message.deleteOne();

        return new Response('Message deleted',{status: 200});

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status: 500});
    }
}