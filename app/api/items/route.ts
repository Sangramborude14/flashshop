import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const items: any =   await prisma.item.findMany({
            orderBy: {
                id: "asc",
            },  
    })
    if(!items){
        return NextResponse.json({error: "items not found"})
    }
    return NextResponse.json(items)
    }catch(error){
        console.error(`error fetching items from database`);
        return NextResponse.json({error: "Internal server error"})
    }
}