

import express from "express";
import asyncHandler from "express-async-handler";
import {getRooms, getRoomById} from "../controllers/roomsController.js";
import {postSignup, getSignup} from "../controllers/registerController.js";
import {postSignin} from "../controllers/loginController.js";
import {postBooking, getBooking, getBookingsByUserId, cancelbooking} from "../controllers/bookingController.js";





const router = new express.Router();


router.get("/api/rooms/getallrooms", asyncHandler(getRooms) );
router.get("/api/rooms/:id", asyncHandler(getRoomById) );

  //User register
router.post("/api/register", asyncHandler(postSignup) );
router.get("/api/register", asyncHandler(getSignup) );

//User Login
router.post("/api/login", asyncHandler(postSignin) );

//bookingDetails
router.post("/api/bookings/bookroom", asyncHandler(postBooking) );
router.get("/api/bookings/bookroom", asyncHandler(getBooking) );
router.post("/api/bookings/getbookingsbyuserid", asyncHandler(getBookingsByUserId) );
router.post("/api/bookings/cancelbooking", asyncHandler(cancelbooking) );



export default router;
