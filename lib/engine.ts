import { IntakeInput, PlanOutput } from './types';

const disclaimer =
  'AidAtlas AI suggestions are informational only and are not official legal, medical, or government determinations.';

function fallbackPlan(input: IntakeInput): Omit<PlanOutput, 'id' | 'createdAt'> {
  return {
    profileSummary: `${input.fullName} in ${input.location} needs help for: ${input.goals}. Urgency: ${input.urgency}.`,
    priorityScore: input.urgency === 'critical' ? 95 : input.urgency === 'high' ? 82 : input.urgency === 'medium' ? 64 : 38,
    categories: [
      {
        category: 'Immediate essentials',
        whyFit: 'Situation indicates near-term stability needs (food/housing/basic bills).',
        nextActions: ['Call 2-1-1 or local helpline', 'Apply to emergency assistance portal', 'Contact nearest nonprofit intake desk'],
        checklist: ['Photo ID', 'Proof of address', 'Recent bill/notice', 'Income or job status document'],
        urgencyTag: input.urgency
      },
      {
        category: 'Longer-term advancement',
        whyFit: 'Goals mention durable outcomes such as education, skills, or steady employment.',
        nextActions: ['Enroll in one skills program', 'Set weekly follow-up reminder', 'Track all submitted applications'],
        checklist: ['Resume or student ID', 'Personal statement', 'Reference contact list'],
        urgencyTag: 'medium'
      }
    ],
    followUpPlan: ['Day 1: Submit top 2 applications', 'Day 3: Confirm document receipt', 'Day 7: Escalate if no response'],
    disclaimer,
    progress: [
      { label: 'Intake completed', done: true },
      { label: 'Applications submitted', done: false },
      { label: 'Follow-up sent', done: false },
      { label: 'Aid secured', done: false }
    ]
  };
}

export async function generatePlan(input: IntakeInput): Promise<Omit<PlanOutput, 'id' | 'createdAt'>> {
  const key = process.env.NIM_API_KEY;
  if (!key) return fallbackPlan(input);

  try {
    const prompt = `You are AidAtlas AI. Return strict JSON with keys: profileSummary, priorityScore (0-100 int), categories (array of 2-4 items with category, whyFit, nextActions[], checklist[], urgencyTag), followUpPlan[], disclaimer, progress[{label,done}]. Keep concise, practical.`;
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.NIM_MODEL || 'meta/llama-3.1-70b-instruct',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: JSON.stringify(input) }
        ]
      })
    });
    if (!res.ok) return fallbackPlan(input);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return { ...parsed, disclaimer };
  } catch {
    return fallbackPlan(input);
  }
}
