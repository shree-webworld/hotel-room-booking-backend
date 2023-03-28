import Rooms from "../models/Rooms.js";




let getRooms = async (request, response) =>{

    try
    {
        const therooms = await Rooms.find();
        return response.status(201).json(therooms);
    } catch (error)
     {
        return response.status(500).json(error);
     }
}



let getRoomById = async (req, res) =>{
                                try
                                {
                                  // console.log("roomById - ", req.params);
                                  const roomById = await Rooms.findOne({_id:req.params.id});
                                  // console.log(roomById);
                                  res.status(200).json(roomById);
                                }catch (e)
                                  {
                                    console.log(e);
                                    return res.status(500).json({error : "Failed to fetch post data"});

                                  }
                        }


export {getRooms, getRoomById};
