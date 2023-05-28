import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = clientPromise;
    if(method === 'POST'){
        const {title, description, price} = req.body;
        const productDoc = await Product.create({
            title, description, price,
        })
        res.json(productDoc);

    }
}