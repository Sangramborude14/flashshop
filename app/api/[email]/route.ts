import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, email } = body;

        if (!body) {
            return NextResponse.json({ error: "could not recieve data from frontend" })
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }

        const cartItem = await prisma.cartItem.upsert({
            where: {
                userId_itemId: {
                    userId: user.id,
                    itemId: id,
                }
            },
            update: {
                quantity: { increment: 1 }
            },
            create: {
                userId: user.id,
                itemId: id,
                quantity: 1,
            }
        })
        return NextResponse.json({ message: "item added succesfully", cartItem })

    } catch (error) {
        console.error("error adding to cart")
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}
export async function GET(request : Request,{params}: { params: Promise<{email: string}>}){
    
    try{
        const {email} = await params
        const decodedEmail = decodeURIComponent(email);

        const user = await prisma.user.findUnique({
            where: {email: decodedEmail},
            include: {
                cartItems: {
                    include: {
                        item: true,
                    }
                }
            }
        })

        if(!user){
            return NextResponse.json({error: "user not found"},{status:404})
        }
        return NextResponse.json(user.cartItems)
    }catch(error){
        console.error("error fetching cart items: ",error)
        return NextResponse.json({error: "Internal server error"},{status: 500})
    }
}