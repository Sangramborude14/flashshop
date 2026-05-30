import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export async function GET(){
    let cachedItems: string | null = null;
    try{
        cachedItems = await redis.get("dashboard-items")
        }catch(error){
        console.warn("Redis read error, bypassing cache:", error);
    }

    if(cachedItems){
        console.log(`serving items from redis`)
        return NextResponse.json(JSON.parse(cachedItems))
    }
    console.log(`Cache Miss, fetching from postgreSQL`)

    try{
        const items: any =   await prisma.item.findMany({
            orderBy: {
                id: "asc",
            },
        })

        if(!items){
        return NextResponse.json({error: "items not found"})
         }

        try{  await redis.set("dashboard-items",JSON.stringify(items),"EX",300);
        return NextResponse.json(items);}
        catch(error){
            console.warn("Redis write error, skipping cache update:", error);
        }
        return NextResponse.json(items)
               
    }catch(error){
        console.error(`error fetching items from database`);
        return NextResponse.json({error: "Internal server error"})
    }
    }

    