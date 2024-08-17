import express from "express";
import { createUser ,bookVisit,getAllBookings,cancelBooking,toFav,getAllFavorites} from '../controller/userController.js'
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post('/register',createUser)
router.post('/bookVisit/:id', bookVisit)
router.post('/allBookings', getAllBookings)
router.post('/cancelBooking/:id', cancelBooking)
router.post('/toFav/:id', toFav)
router.post('/allFav', getAllFavorites)
export {router as userRoute}