import Booking from "../models/Bookings.js";
import Room from "../models/Rooms.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";


dotenv.config();
const stripe = Stripe(process.env.SECRET_KEY);
// console.log(stripe);

const postBooking = async (req, res) =>{

                      const {
                                room,
                                roomId,
                                userId,
                                fromDate,
                                toDate,
                                totalAmount,
                                totalDays,
                                transactionId

                             } = req.body;

                  try
                  {
                    /*const customer = await stripe.customers.create({ email: token.email, source: token.id});

                    const payment = await stripe.charges.create(
                                                        {
                                                          amount: totalAmount * 100,
                                                          customer: customer.id,
                                                          currency: 'inr',
                                                          receipt_email: token.email,
                                                        },{
                                                            idempotencyKey : uuidv4()
                                                          }
                                                    );

                    if(payment)
                    {*/
                      const bookingDetails = new Booking({room, roomId, userId, fromDate,
                                                          toDate, totalAmount, totalDays, transactionId });

                      const newBooking  = await bookingDetails.save();

                      const roomtemp = await Room.findOne({ _id: roomId });
                          roomtemp.currentBookings.push({
                            bookingId: newBooking._id,
                            fromDate : fromDate,
                            toDate : toDate,
                            userId : userId,
                            status: newBooking.status,
                          });
                          await roomtemp.save();
                    //}

                    console.log("Payment is successfully completed, your room is booked");
                    return res.status(201).json("Payment is successfully completed, your room is booked");

                    }catch(e)
                     {
                       console.log("bookingController errors- ", e);
                       return res.status(500).json({error: "⚠️Payment is unsuccessfull and room booking failed"});
                     }
                  }



const getBooking = async (req, res) =>{
                                    try {
                                            let bookingDetails = await Booking.find();
                                            return res.status(201).json(bookingDetails);
                                        }catch (e)
                                        {
                                          console.log(e);
                                          return res.status(500).json(e);
                                        }
                                     }



let getBookingsByUserId = async (req, res) =>{
                                    let {userId} = req.body;
                                    console.log("bookingController ", userId);

                                    try
                                    {
                                      const bookingsByUserId = await Booking.find({ userId: userId });
                                      return res.status(201).json(bookingsByUserId);
                                    } catch (e)
                                     {
                                       console.log("bookingController -", e);
                                       return res.status(500).json(e);
                                     }
                                }



let cancelbooking = async (req, res) =>{
                            let { bookingId , roomId} = req.body
                            // console.log("booking ", bookingId, roomId);
                            try
                            {
                              let bookingItem = await Booking.findOne({_id : bookingId});
                              bookingItem.status = 'cancelled';
                              await bookingItem.save();

                              let room = await Room.findOne({_id : roomId});
                              let bookings = room.currentBookings;
                              let temp = bookings.filter(booking => booking.bookingId.toString() !== bookingId);
                              room.currentBookings = temp;
                              await room.save();

                              return res.status(201).json('Your room booking cancelled successfully');

                            } catch (e)
                             {
                               console.log("cancelbooking -", e);
                               return res.status(500).json(e);
                             }
                          }



export {postBooking, getBooking, getBookingsByUserId, cancelbooking};
