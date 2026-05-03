import { getPlan } from '@/lib/storage';
import { notFound } from 'next/navigation';
import { PlanCard } from '@/components/PlanCard';

export default async function PlanPage({ params }: { params: { id: string } }) {
  const plan = await getPlan(params.id);
  if (!plan) return notFound();

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-bold">Personalized Action Plan</h1>
        <p className="mt-2 text-slate-700">{plan.profileSummary}</p>
        <p className="mt-2 text-sm">Priority Score: <span className="font-bold">{plan.priorityScore}/100</span></p>
        <p className="mt-2 text-xs text-slate-500">{plan.disclaimer}</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">{plan.categories.map((rec) => <PlanCard key={rec.category} rec={rec} />)}</section>
      <section className="card">
        <h2 className="font-semibold">Follow-up Plan</h2>
        <ul className="list-disc pl-5 text-sm">{plan.followUpPlan.map((s) => <li key={s}>{s}</li>)}</ul>
        <h2 className="mt-4 font-semibold">Progress Tracker</h2>
        <ul className="mt-2 space-y-1">{plan.progress.map((p) => <li key={p.label}>• {p.done ? '✅' : '⬜'} {p.label}</li>)}</ul>
      </section>
    </div>
  );
}
