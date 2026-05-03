import { Recommendation } from '@/lib/types';

export function PlanCard({ rec }: { rec: Recommendation }) {
  return (
    <article className="card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{rec.category}</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{rec.urgencyTag}</span>
      </div>
      <p className="mb-3 text-sm text-slate-600">{rec.whyFit}</p>
      <p className="text-sm font-semibold">Next actions</p>
      <ul className="mb-3 list-disc pl-5 text-sm text-slate-700">{rec.nextActions.map((a) => <li key={a}>{a}</li>)}</ul>
      <p className="text-sm font-semibold">Checklist</p>
      <ul className="list-disc pl-5 text-sm text-slate-700">{rec.checklist.map((c) => <li key={c}>{c}</li>)}</ul>
    </article>
  );
}
