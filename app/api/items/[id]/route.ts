import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request,{params}: {params: Promise<{id: string}>}){
    try{
        const {id} = await params

        const cacheKey = `items:${id}`
        const cachedItem = await redis.get(cacheKey)

        if(cachedItem){
            console.log(`serving items details from redis`)
            return NextResponse.json(JSON.parse(cachedItem))
        }

        console.log(`Cache Miss. Fetching from postgreSQL`)
        const item = await prisma.item.findUnique({
            where: {id},  

        })
        if(!item){
            return NextResponse.json({error: "item not found"},{status: 404})
        }

        await redis.set(cacheKey,JSON.stringify(item),"EX",300)

        return NextResponse.json(item);
    }catch(error){
        console.log(`error fetching item details`)
        return NextResponse.json({error: "error fetching item"})
    }
}