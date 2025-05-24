// src/app/api/discord-sync/route.ts
import { NextResponse } from 'next/server'
import { fetchAndSync } from '@/lib/fetchSync'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await fetchAndSync()
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}