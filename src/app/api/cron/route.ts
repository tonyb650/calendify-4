import { NextResponse } from 'next/server';
import { deleteGuestData } from './functions/deleteGuestData';
import { checkCronAuthorization } from './functions/checkCronAuthorization';

export async function GET(request: Request): Promise<Response> {
  if (!checkCronAuthorization(request)) {
    return NextResponse.json({ status: false });
  }

  try {
    const result = await deleteGuestData()
    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    return NextResponse.json({ error });
  }
}