'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import demoCases from '@/data/demoCases.json';
import { IntakeInput, PlanOutput } from '@/lib/types';

const initial: IntakeInput = { fullName: '', location: '', ageStatus: '', urgency: 'medium', goals: '', situation: '' };

const fieldLabels: Record<keyof IntakeInput, string> = {
  fullName: 'Name',
  location: 'Location',
  ageStatus: 'Age / student status',
  urgency: 'Urgency',
  goals: 'Goals',
  situation: 'Situation'
};

export default function Home() {
  const [form, setForm] = useState<IntakeInput>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const canSubmit = useMemo(
    () => form.fullName.trim() && form.location.trim() && form.ageStatus.trim() && form.goals.trim() && form.situation.trim(),
    [form]
  );

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({ error: 'Failed to generate plan.' }));
        throw new Error(e.error || 'Failed to generate plan.');
      }
      const data = (await res.json()) as PlanOutput;
      router.push(`/plan/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
          <label className="text-sm font-medium">{fieldLabels.fullName}</label>
          <input className="input" placeholder="Jane Doe" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <label className="text-sm font-medium">{fieldLabels.location}</label>
          <input className="input" placeholder="City, State" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <label className="text-sm font-medium">{fieldLabels.ageStatus}</label>
          <input className="input" placeholder="22, college student" value={form.ageStatus} onChange={(e) => setForm({ ...form, ageStatus: e.target.value })} />
          <label className="text-sm font-medium">{fieldLabels.urgency}</label>
          <select className="input" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value as IntakeInput['urgency'] })}>
            <option value="low">low</option><option value="medium">medium</option><option value="high">high</option><option value="critical">critical</option>
          </select>
          <label className="text-sm font-medium">{fieldLabels.goals}</label>
          <textarea className="input min-h-20" placeholder="Get food support and short-term rent help" value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} />
          <label className="text-sm font-medium">{fieldLabels.situation}</label>
          <textarea className="input min-h-24" placeholder="Describe your current situation" value={form.situation} onChange={(e) => setForm({ ...form, situation: e.target.value })} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading || !canSubmit} onClick={submit} className="btn-primary disabled:opacity-50">{loading ? 'Analyzing...' : 'Generate Action Plan'}</button>
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
