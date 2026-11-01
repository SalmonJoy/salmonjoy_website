export type TrackId = 'work' | 'build' | 'teach';
export interface Track { id: TrackId; number: string; audience: string; title: string; description: string; outcomes: string[]; topics: string[]; url:string; }
export const tracks: Track[] = [
  { id: 'work', url: '/training/chatgpt-for-business/', number: '01', audience: 'FOR BUSINESS TEAMS', title: 'AI at Work', description: 'Turn everyday AI tools into a genuinely useful part of your working day.', outcomes: ['Identify where AI fits your team’s work', 'Build repeatable workflows with ChatGPT', 'Evaluate answers and use AI responsibly'], topics: ['ChatGPT', 'Practical prompting', 'Workflow design'] },
  { id: 'build', url: '/training/generative-ai-engineering/', number: '02', audience: 'FOR ENGINEERS & BUILDERS', title: 'Build with GenAI', description: 'Go from an interesting prototype to an AI system you understand and can improve.', outcomes: ['Build with Codex, LLM APIs, and agents', 'Connect models to knowledge with RAG', 'Evaluate, deploy, and monitor your systems'], topics: ['Codex & agents', 'RAG', 'Evaluation & deployment'] },
  { id: 'teach', url: '/training/faculty-development/', number: '03', audience: 'FOR EDUCATORS & INSTITUTIONS', title: 'Teach AI', description: 'Give learners the confidence to explore, question, and build with AI.', outcomes: ['Connect AI concepts to practical examples', 'Develop hands-on learning experiences', 'Bring applied AI into the classroom'], topics: ['Faculty development', 'AI & ML', 'Hands-on workshops'] },
];

