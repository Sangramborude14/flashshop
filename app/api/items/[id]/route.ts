import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request,{params}: {params: Promise<{id: string}>}){
    try{
        const {id} = await params
        const item = await prisma.item.findUnique({
            where: {id},  

        })
        if(!item){
            return NextResponse.json({error: "item not found"},{status: 404})
        }
        return NextResponse.json(item);
    }catch(error){
        console.log(`error fetching item details`)
        return NextResponse.json({error: "error fetching item"})
    }
}