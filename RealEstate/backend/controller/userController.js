import asyncHandler from "express-async-handler";
import {prisma} from '../config/prismaConfig.js'

export const createUser = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const userExists = await prisma.user.findUnique({where: {email: email}});
    if(!userExists){
        const user = await prisma.user.create({data: req.body});
        res.send(user);
    }else{
        res.status(201).send({message:"User already exists"});
    }
} )

export const bookVisit = asyncHandler(async(req,res)=>{
    const {email, date} = req.body;
    const {id} = req.params;

    try{
        const alreadyBooked = await prisma.user.findUnique({where: {email: email}, select: {bookedVisits: true}})
        if(alreadyBooked.bookedVisits.some((visit)=> visit.id == id)){
            res.status(400).send({message: "This Residence is already booked by you"})
        }else{
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: {push: {id: id, date: date}}
                }
            })
            res.send({message: "Your Visit is booked successfully"})
        }
    }
    catch(err){
        res.status(500).send({message: "Something went wrong"})
    }
})

export const getAllBookings = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    try{
        const bookings = await prisma.user.findUnique({where: {email: email}, select: {bookedVisits: true}})
        res.status(200).send({bookings})
    }catch(err){
        res.status(500).send({message: "Something went wrong"})
    }
})

export const cancelBooking  = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({where:{email:email},select:{bookedVisits:true}});
        const index = user.bookedVisits.findIndex(visit => visit.id == id);
        if(index  == -1)
        {
            res.status(404).send({message:"Booking not found"});
        }
        else{
            user.bookedVisits.splice(index,1);
            await prisma.user.update(
                {
                    where:{email:email},
                    data:{bookedVisits:user.bookedVisits}
                }
            )
            res.send({message:"Booking cancelled successfully"});
        }

    }
    catch(err){
        res.status(500).send({message:"Something went wrong"});
    }

})

export const toFav = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({where:{email:email}, select:{favResidenciesID:true}});
        if(user.favResidenciesID.includes(id))
        {
            const updatedUser = await prisma.user.update({
                where:{email:email},
                data:{favResidenciesID:{
                    set:user.favResidenciesID.filter((itemId)=> itemId != id)
                }}
            })
            res.send({message:"Removed from favorites", user:updatedUser});
        }
        else
        {
            const updatedUser = await prisma.user.update({
                where:{email:email},
                data:{favResidenciesID:{
                    push:id
                }}
            })
            res.send({message:"Added to favorites", user:updatedUser});
        }
        
    }catch(err){
        res.status(404).send({message:"Residency not found"});
    }
})

export const getAllFavorites = asyncHandler(async(req, res)=>{
    const {email} = req.body;
    try{
        const favResidencies = await prisma.user.findUnique({where:{email:email}, select:{favResidenciesID:true}});
        res.status(200).send({favResidencies});
    }catch(err){
        res.status(500).send({message:"Request failed"});
    }
})