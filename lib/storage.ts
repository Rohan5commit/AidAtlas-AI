import { promises as fs } from 'fs';
import path from 'path';
import { PlanOutput } from './types';

const plansPath = path.join(process.cwd(), 'data', 'plans.json');

export async function getPlans(): Promise<PlanOutput[]> {
  const raw = await fs.readFile(plansPath, 'utf-8');
  return JSON.parse(raw);
}

export async function savePlan(plan: PlanOutput): Promise<void> {
  const plans = await getPlans();
  plans.unshift(plan);
  await fs.writeFile(plansPath, JSON.stringify(plans.slice(0, 50), null, 2));
}

export async function getPlan(id: string): Promise<PlanOutput | undefined> {
  const plans = await getPlans();
  return plans.find((p) => p.id === id);
}
