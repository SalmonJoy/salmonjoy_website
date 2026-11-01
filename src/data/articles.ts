export interface ArticleSection {id:string;title:string;paragraphs:string[];bullets?:string[];prompt?:string;callout?:string}
export interface Article {slug:string;title:string;description:string;topic:'Business AI'|'Engineering'|'Education';symbol:string;image:string;imageAlt:string;author:string;publishedAt:string|null;modifiedAt?:string;relatedServices:string[];relatedProjects:string[];answer:string;sections:ArticleSection[];sources:{label:string;url:string}[]}
const initialArticles:Article[]=[
  {
    "slug": "choose-corporate-ai-training",
    "title": "How to choose corporate AI training",
    "description": "A practical checklist for choosing AI training that fits your team: learning goals, useful exercises, data boundaries and evidence of progress.",
    "topic": "Business AI",
    "symbol": "↗",
    "image": "/images/choose-ai-training.png",
    "imageAlt": "A three-stage training plan: define the task, practise the work, review the outcome.",
    "author": "Salmon Joy",
    "publishedAt": null,
    "relatedServices": [
      "work",
      "build"
    ],
    "relatedProjects": [
      "enterprise-rag"
    ],
    "answer": "Choose corporate AI training by starting with a real task your team needs to perform. Match the programme to their current skills, ask what participants will practise, agree on data and tool boundaries, and define how you will review the work afterwards.",
    "sections": [
      {
        "id": "start-with-work",
        "title": "Start with the work, not the tool list",
        "paragraphs": [
          "A workshop brief such as “teach us AI” leaves too much open. A more useful brief names the audience, the task and the expected output. For an operations team, that might be turning meeting notes into an action list that can be checked against the original discussion. For engineers, it might be retrieving evidence for a customer-support answer.",
          "List two or three recurring tasks before comparing programmes. Note what makes each task difficult: missing context, repetitive formatting, fragmented sources or an unclear review process. This gives the trainer something concrete to work with."
        ],
        "bullets": [
          "Who will attend, and what do they already know?",
          "Which task should become easier or more reliable?",
          "What would a useful output look like?",
          "Who will check the result and decide whether it is usable?"
        ]
      },
      {
        "id": "match-the-track",
        "title": "Match the learning path to the audience",
        "paragraphs": [
          "Business users usually need practice in framing tasks, reviewing output and designing repeatable workflows. Developers need to understand application behaviour, data flow and evaluation. Educators need activities that expose reasoning and can be adapted to their learners.",
          "A mixed audience can still learn together, but the brief should acknowledge different starting points. Do not assume that a technical demonstration gives non-programmers a workflow they can use the next day."
        ]
      },
      {
        "id": "inspect-an-exercise",
        "title": "Ask to see the shape of an exercise",
        "paragraphs": [
          "A good exercise has a starting input, a task, a concrete output and a way to review it. Ask what participants will do themselves and what they will only watch. An impressive live demo is useful context, but independent practice reveals where learners need support.",
          "Consider this fictional exercise: a team receives a short meeting transcript and uses an AI tool to draft actions. The review checks whether every action is supported, whether owners and dates were actually stated, and whether uncertainty is visible. The learning comes from finding and correcting mistakes as well as producing the first answer."
        ],
        "callout": "Representative exercise, not a reported client result: create an action table, link each row to a source sentence, and mark unstated details as “not specified.”"
      },
      {
        "id": "agree-boundaries",
        "title": "Agree on tools, data and preparation",
        "paragraphs": [
          "Confirm the approved tool, account requirements and any usage costs before the session. Use fictional or sanitized examples unless the organization has explicitly approved the data and environment. A training exercise should not depend on participants improvising access to confidential material.",
          "For developer workshops, check the programming baseline, development environment and API access. For a business workshop, check devices, connectivity and whether participants can use the selected features. Preparation protects the time reserved for learning."
        ]
      },
      {
        "id": "review-progress",
        "title": "Define evidence of progress",
        "paragraphs": [
          "Choose a small task before the workshop and agree on a review rubric. After practice, compare outputs using the same criteria: completeness, source support, clarity and required corrections. If you measure time, compare equivalent tasks and include the time spent checking and fixing the result.",
          "An attendance count or satisfaction survey can describe participation and experience. It cannot by itself establish workplace improvement. A later follow-up with the team can show whether the workflow was actually adopted and what still needs support."
        ]
      },
      {
        "id": "training-brief",
        "title": "A short brief you can send to a trainer",
        "paragraphs": [
          "Use the questions below as a starting point. Unknown details can remain open for discussion; there is no need to invent a duration or commit to a tool before the scope is clear."
        ],
        "bullets": [
          "Audience and approximate team size.",
          "Current skill level and two representative tasks.",
          "Desired outputs and how they will be reviewed.",
          "Approved tools, data restrictions and available devices.",
          "On-site or online delivery preference.",
          "A named internal person who can clarify the workflow."
        ]
      },
      {
        "id": "choose-your-path",
        "title": "Choose a practical next step",
        "paragraphs": [
          "For everyday workflows, explore AI at Work. For applications, retrieval and evaluation, explore Build with GenAI. Share your team’s starting point and learning goal when discussing a programme; the scope should follow the work you need to improve."
        ]
      }
    ],
    "sources": [
      {
        "label": "NIST AI Risk Management Framework: organizing AI risk management",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "label": "Salmon Joy: training paths and workshop approach",
        "url": "/training/"
      }
    ]
  },
  {
    "slug": "chatgpt-workflows-for-business-teams",
    "title": "Practical ChatGPT workflows for business teams",
    "description": "Three reviewable ChatGPT workflows for meeting notes, document summaries and drafts, with example prompts and a checklist for checking the output.",
    "topic": "Business AI",
    "symbol": "Aa",
    "image": "/images/chatgpt-workflows.png",
    "imageAlt": "An AI workflow with four steps: brief, draft, verify and revise.",
    "author": "Salmon Joy",
    "publishedAt": null,
    "relatedServices": [
      "work"
    ],
    "relatedProjects": [
      "banking-document-automation"
    ],
    "answer": "A useful ChatGPT workflow combines an explicit brief, approved source material, a structured output and human review. Start with bounded tasks such as meeting actions, document summaries or first drafts, and check the result before sharing or acting on it.",
    "sections": [
      {
        "id": "workflow-pattern",
        "title": "Use a four-step pattern",
        "paragraphs": [
          "Start with a brief that names the task, audience and expected output. Provide the source material the tool is allowed to use. Ask for a draft in a format that makes checking easy, then review and revise it.",
          "This pattern makes responsibilities visible. The model drafts or organizes material; a person checks whether the result is supported and suitable for the task. The examples below use fictional inputs and are starting points for practice, not promises of accuracy or time savings."
        ],
        "bullets": [
          "Brief: what should the result help someone do?",
          "Draft: which source and output format should the tool use?",
          "Verify: what must be checked against the source?",
          "Revise: what needs correction before the result is used?"
        ]
      },
      {
        "id": "meeting-actions",
        "title": "Workflow 1: meeting notes into an action table",
        "paragraphs": [
          "Use notes that clearly distinguish decisions, proposals and questions. Ask for an action table rather than a polished narrative so missing information is easy to spot.",
          "Check each row against the original notes. A proposed action should not quietly become an agreed commitment. A missing owner or date should remain missing until a person confirms it."
        ],
        "prompt": "Using only the fictional meeting notes below, draft an action table with columns: action, owner, due date, source quote, and uncertainty. Separate agreed actions from proposals. Write “not specified” when an owner or date is missing. Do not infer agreement.\\n\\nNotes: [insert approved or fictional notes]",
        "callout": "Review question: can someone trace every claimed commitment to a specific statement in the notes?"
      },
      {
        "id": "document-summary",
        "title": "Workflow 2: a summary that keeps its evidence",
        "paragraphs": [
          "For an internal briefing, define the question the summary should answer. Ask for source references and unresolved points. A request for “a summary” alone may produce a broad overview that misses the reader’s decision.",
          "A reference is useful only if it supports the sentence beside it. Open the source and check the passage, especially for exceptions, conditions and dates. If the provided material is incomplete, say so in the briefing."
        ],
        "prompt": "Summarize the supplied document for [audience] answering [specific question]. Use only the provided text. Return: key points, supporting section or quote, conditions and exceptions, and unanswered questions. Flag claims that the supplied material cannot establish.\\n\\nDocument: [insert approved or fictional text]"
      },
      {
        "id": "first-draft",
        "title": "Workflow 3: a first draft from an explicit brief",
        "paragraphs": [
          "Use AI to explore structure and wording for an announcement or internal note. Give it a factual brief with the intended audience, tone, required information and things it must not assume.",
          "Compare the draft with the brief before polishing the language. Confirm names, dates, promises and any numerical claims. A fluent sentence is not evidence that a detail is correct."
        ],
        "prompt": "Draft an internal announcement from this brief. Audience: [team]. Purpose: [purpose]. Confirmed facts: [facts]. Tone: clear and direct. Required sections: what changes, what the reader needs to do, and where to ask questions. Do not add dates, benefits or commitments not present in the brief. List missing information separately."
      },
      {
        "id": "quality-check",
        "title": "Make review part of the workflow",
        "paragraphs": [
          "Use the same small checklist each time. Add task-specific criteria where necessary, such as an approved template or a required reviewer. Keep examples of recurring mistakes so the team can improve the brief and review process."
        ],
        "bullets": [
          "Source: does each factual claim follow from the supplied material?",
          "Completeness: are important conditions or exceptions missing?",
          "Uncertainty: are unknowns clearly separated from confirmed facts?",
          "Suitability: is the output appropriate for its audience and purpose?",
          "Permission: is the data approved for the tool and intended use?",
          "Handover: has the responsible person reviewed the result?"
        ]
      },
      {
        "id": "repeatable-practice",
        "title": "Turn one good exercise into a repeatable practice",
        "paragraphs": [
          "Save the prompt together with an example input, a reviewed output and the checklist. Reuse the structure on a new approved example and inspect what changes. If the task varies significantly, revise the workflow rather than assuming the old prompt will cover it.",
          "For team training, choose one real workflow and practise the complete process, including checking and revision. AI at Work is the training path for business teams that want to build this habit."
        ]
      }
    ],
    "sources": [
      {
        "label": "OpenAI Academy: learning resources for working with AI",
        "url": "https://academy.openai.com/"
      },
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "label": "Banking document automation: a related engineering case",
        "url": "/projects/banking-document-automation/"
      }
    ]
  }
];
const releaseDate=import.meta.env.ARTICLE_PUBLISH_DATE;
if(releaseDate && (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)||new Date(releaseDate).toISOString().slice(0,10)!==releaseDate))throw new Error('ARTICLE_PUBLISH_DATE must be a real YYYY-MM-DD date.');
export const insights:Article[]=initialArticles.map(a=>({...a,publishedAt:releaseDate||a.publishedAt}));
