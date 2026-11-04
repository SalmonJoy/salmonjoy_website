// Owner-confirmed profile facts, reviewed 4 November 2026.
// Study status and expected completion are maintained explicitly, never auto-awarded.
export const profile = {
  positioning: 'Enterprise AI Trainer · AI Engineer',
  jobTitle: 'Enterprise AI Trainer and AI Engineer',
  introduction: 'I’m Salmon, an enterprise AI trainer and engineer based in Mumbai. My experience spans building banking and compliance AI systems and helping professionals apply AI in their work.',
  engineering: {
    title: 'Senior AI Engineer',
    organization: 'DTBX Innovate Pvt. Ltd.',
    period: 'May 2025–September 2026',
    work: 'My work covered retrieval systems, banking and compliance document automation, model deployment and governance.'
  },
  programme: {
    title: 'OpenAI Programme Master Trainer',
    period: 'October 2026–present',
    partners: 'VMS Group APAC and Channel Partners Solutions, LLC',
    description: 'Master Trainer for the OpenAI Programme in India, delivered through VMS Group APAC and Channel Partners Solutions, LLC.'
  },
  education: {
    pathway: 'MS + DBA pathway',
    institution: 'Walsh College',
    provider: 'Great Learning',
    status: 'Studies underway',
    stage: 'My first year is underway',
    duration: 'three-year',
    expectedCompletion: 'end of 2029'
  }
} as const;

export const engineeringSummary = `I served as ${profile.engineering.title} at ${profile.engineering.organization} (${profile.engineering.period}). ${profile.engineering.work}`;
export const educationSummary = `I am enrolled in the ${profile.education.duration} ${profile.education.pathway} with ${profile.education.institution} through ${profile.education.provider}. ${profile.education.stage}, with completion expected by the ${profile.education.expectedCompletion} under the current programme timeline.`;
export const trainerIntroduction = `Salmon Joy is an enterprise AI trainer and engineer with 8+ years of experience and 10,000+ learners trained. He previously served as ${profile.engineering.title} at ${profile.engineering.organization} (${profile.engineering.period}).`;
export const currentProgrammeSummary = `${profile.programme.title} (${profile.programme.period}). ${profile.programme.description}`;
export const profileDescription = `${trainerIntroduction} ${currentProgrammeSummary} Enrolled in the ${profile.education.pathway} with ${profile.education.institution} through ${profile.education.provider}; studies underway, with completion expected by the ${profile.education.expectedCompletion} under the current programme timeline.`;
