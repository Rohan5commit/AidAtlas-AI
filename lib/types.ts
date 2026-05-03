export type IntakeInput = {
  fullName: string;
  location: string;
  ageStatus: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  goals: string;
  situation: string;
};

export type Recommendation = {
  category: string;
  whyFit: string;
  nextActions: string[];
  checklist: string[];
  urgencyTag: string;
};

export type PlanOutput = {
  id: string;
  profileSummary: string;
  priorityScore: number;
  categories: Recommendation[];
  followUpPlan: string[];
  disclaimer: string;
  createdAt: string;
  progress: { label: string; done: boolean }[];
};
