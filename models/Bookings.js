import mongoose from 'mongoose';

const BookingsSchema = new mongoose.Schema({
   room:{
          type: String,
          required: true,
          trim:true
       },
    roomId: {
        type: String,
        required: true,
        trim:true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    fromDate: {
        type: String,
        required: true,
        trim: true
    },
    toDate: {
        type: String,
        required: true,
        trim : true
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    },
    totalDays:{
      type: Number,
      required: true,
      trim: true
    },
    transactionId:
    {
      type: String,
      required: true,
      trim: true
    },
    status:
    {
      type: String,
      required: true,
      trim: true,
      default: 'booked'
    }
},
{
        timestamps: true
});

const bookingsModel = mongoose.model('bookings', BookingsSchema);

export default bookingsModel;
