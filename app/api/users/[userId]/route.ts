import { db } from "@/app/_utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}) {
    const {userId} = params;
    const user = await db.user.findUnique({
        where: {id: Number(userId)},
    });
    return NextResponse.json(user);
}