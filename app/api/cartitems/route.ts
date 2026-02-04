import { prisma } from '@/prisma/prisma-client';
import { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
    const userId = req.id
    const cartItems = await prisma.cart.findUnique({ where: { userId: 1 }, include: { items: true } })

}