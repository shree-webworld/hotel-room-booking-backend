import mongoose from 'mongoose';

const RoomsSchema = new mongoose.Schema({
   _id:{
          type: String
       },
    roomName: {
        type: String,
        required: true
    },
    maxCount: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: String,
        required: true
    },
    imageurls:[],
    currentBookings:[],
    type: {
        type: String,
        required: true
    },
    description:{
      type: String,
      required: true
    }
},
{
        timestamps: true
});

const rooms = mongoose.model('rooms', RoomsSchema);

export default rooms;
