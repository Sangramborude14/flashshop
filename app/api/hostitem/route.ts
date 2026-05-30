import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(request : Request){
    try{
        const session = await auth.api.getSession({
            headers: request.headers
        })

        if(!session){
            return new Response("Unauthorized",{status: 401});
        }
        if(session.user.role !== "SELLER"){
            return new Response("Forbidden: Admin Only",{status: 403})
        }

        const items = await prisma.item.findMany({
            where: {hostName: session.user.name}
        })
        
        if(!items) return NextResponse.json({error:"could not find items in DB"});

        return NextResponse.json(items);
    }catch(error){
        console.error(`error fetching data from db `,error);
        return NextResponse.json({error: `error fetching data from DB`})
    }
}