import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    const result = await getView(id);
    return Response.json({ view: result })
}
export const getView = async (id: string | null): Promise<number | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (id === null) {
        return undefined
    }
    return randomInt()
}
function randomInt() {
    return Math.floor((Math.random() * 1500) + 1);
}