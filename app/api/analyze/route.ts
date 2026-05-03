import { NextResponse } from 'next/server';
import { generatePlan } from '@/lib/engine';
import { savePlan } from '@/lib/storage';
import { IntakeInput, PlanOutput } from '@/lib/types';

const allowedUrgency = new Set(['low', 'medium', 'high', 'critical']);

function isValidInput(input: Partial<IntakeInput>): input is IntakeInput {
  return !!(
    input &&
    typeof input.fullName === 'string' && input.fullName.trim() &&
    typeof input.location === 'string' && input.location.trim() &&
    typeof input.ageStatus === 'string' && input.ageStatus.trim() &&
    typeof input.goals === 'string' && input.goals.trim() &&
    typeof input.situation === 'string' && input.situation.trim() &&
    typeof input.urgency === 'string' && allowedUrgency.has(input.urgency)
  );
}

export async function POST(req: Request) {
  const input = (await req.json()) as Partial<IntakeInput>;
  if (!isValidInput(input)) {
    return NextResponse.json({ error: 'Please complete all intake fields with valid values.' }, { status: 400 });
  }

  const plan = await generatePlan(input);
  const full: PlanOutput = {
    ...plan,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  await savePlan(full);
  return NextResponse.json(full);
}
