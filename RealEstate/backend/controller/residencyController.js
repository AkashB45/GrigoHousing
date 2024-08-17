import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data.propertyDetails;
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(409).send({ message: "Residency already exists" });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
});
export const getAllResidency = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send({ residencies });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
});
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({ where: { id: id } });
    res.send({ residency });
  } catch (err) {
    res.status(404).send({ message: "Residency not found" });
  }
});

export const removeResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const residency = await prisma.residency.delete({ where: { id: id } });
      res.send({ message: "Residency deleted successfully", residency });
    } catch (err) {
      res.status(404).send({ message: "Residency not found" });
    }
});
