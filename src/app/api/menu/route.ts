
import { NextResponse } from 'next/server';
import { MENU_ITEMS } from '@/lib/store';

export async function GET() {
    return NextResponse.json(MENU_ITEMS);
}
