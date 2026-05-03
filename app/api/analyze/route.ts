import { NextResponse } from 'next/server';
import { generatePlan } from '@/lib/engine';
import { savePlan } from '@/lib/storage';
import { IntakeInput, PlanOutput } from '@/lib/types';

export async function POST(req: Request) {
  const input = (await req.json()) as IntakeInput;
  const plan = await generatePlan(input);
  const full: PlanOutput = {
    ...plan,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  await savePlan(full);
  return NextResponse.json(full);
}
