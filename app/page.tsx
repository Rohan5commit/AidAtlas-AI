'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import demoCases from '@/data/demoCases.json';
import { IntakeInput, PlanOutput } from '@/lib/types';

const initial: IntakeInput = { fullName: '', location: '', ageStatus: '', urgency: 'medium', goals: '', situation: '' };

export default function Home() {
  const [form, setForm] = useState<IntakeInput>(initial);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = (await res.json()) as PlanOutput;
    router.push(`/plan/${data.id}`);
  };

  return (
    <div className="space-y-8">
      <section className="card bg-gradient-to-br from-blue-50 to-indigo-100">
        <h1 className="text-3xl font-bold">AidAtlas AI</h1>
        <p className="mt-2 text-slate-700">AI social-good resource navigator for scholarships, emergency aid, mental-health support, and job pathways.</p>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card md:col-span-2 space-y-3">
          <h2 className="text-xl font-semibold">Guided Intake</h2>
          {Object.entries(form).map(([k, v]) =>
            k === 'urgency' ? (
              <select key={k} className="input" value={v} onChange={(e) => setForm({ ...form, urgency: e.target.value as IntakeInput['urgency'] })}>
                <option value="low">low</option><option value="medium">medium</option><option value="high">high</option><option value="critical">critical</option>
              </select>
            ) : (
              <input key={k} className="input" placeholder={k} value={v} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            )
          )}
          <button disabled={loading} onClick={submit} className="btn-primary">{loading ? 'Analyzing...' : 'Generate Action Plan'}</button>
        </div>
        <div className="card">
          <h3 className="font-semibold">Demo Mode</h3>
          <p className="mb-3 text-sm text-slate-600">Load a seeded case instantly.</p>
          <div className="space-y-2">{demoCases.map((c) => <button key={c.id} onClick={() => setForm(c as IntakeInput)} className="btn-secondary w-full text-left">{c.fullName}</button>)}</div>
        </div>
      </section>
    </div>
  );
}
