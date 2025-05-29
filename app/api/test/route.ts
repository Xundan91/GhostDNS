// app/api/test/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: "API routing works!" })
}

export async function POST() {
  return NextResponse.json({ message: "POST works too!" })
}