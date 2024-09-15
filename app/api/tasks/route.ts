import { CreateTaskRequest, Task } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server"
import { findByCreatedAtBetween, save } from "./(repository)/task-repo";

export async function GET(request: NextRequest){
    const startTimeParam = request.nextUrl.searchParams.get('startTime');
    const endTimeParam = request.nextUrl.searchParams.get('endTime');

    if (!startTimeParam || !endTimeParam) {
        return NextResponse.json({ error: 'Missing startTime or endTime parameters' }, { status: 400 });
    }
    const startTime = parseInt(startTimeParam);
    const endTime = parseInt(endTimeParam);
    try {
        const result = await findByCreatedAtBetween(startTime, endTime);
        return NextResponse.json({ 
            'data': result,
            'status': 200,
            'message': 'success'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest){
    try {
        const body: CreateTaskRequest = await request.json();
        const response = await save(body)
        return NextResponse.json({message: 'task created', status : 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
    }
}