import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request: any, {params}: any) => {
    try {
      await connectDB();
      const userId = params.userid;

      if(!userId) {
        return new Response('User Id is requires',{status: 400})
    };
      
      const properties = await Property.find({owner: userId});
      return new Response(JSON.stringify(properties), {
        status: 200
      })
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {
            status: 500
        })
    }
}