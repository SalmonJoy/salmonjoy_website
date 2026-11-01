import type {TrackId} from './training';
export interface Service { id:TrackId; slug:string; title:string; description:string; answer:string; audience:string; prerequisites:string; modules:{title:string;body:string}[]; exercise:{title:string;steps:string[];output:string}; faqs:{q:string;a:string}[]; project:string; evidence:{label:string;url:string}; }
export const services:Service[]=[
  {
    "id": "work",
    "slug": "chatgpt-for-business",
    "title": "ChatGPT training for business teams",
    "description": "Practical ChatGPT training for business teams in India. Build repeatable prompts, review AI output and improve everyday workflows with Salmon Joy.",
    "answer": "Learn how to use ChatGPT for useful, reviewable work: clearer briefs, structured drafts, document summaries and repeatable workflows. Start with the tasks your team already performs, then practise checking the result.",
    "audience": "Business teams, managers, HR, operations and learning & development teams.",
    "prerequisites": "No coding background is needed. Bring an everyday workflow and approved, non-confidential sample material. Access requirements are agreed before the workshop.",
    "modules": [
      {
        "title": "Ask with purpose",
        "body": "Turn a vague request into a brief with a task, audience, relevant context, output format and review criteria."
      },
      {
        "title": "Build a repeatable workflow",
        "body": "Break a task into stages: prepare the source, draft, check, revise and hand over. Decide where a person needs to review the output."
      },
      {
        "title": "Use AI responsibly",
        "body": "Recognize unsupported claims and sensitive information. Practise source checks and work within your organization’s approved tools and policies."
      }
    ],
    "exercise": {
      "title": "From meeting notes to an action brief",
      "steps": [
        "Use a fictional meeting transcript with explicitly stated decisions.",
        "Ask for an action table with owner, deadline and supporting quote.",
        "Mark missing owners or dates as unknown; compare every action with the source."
      ],
      "output": "A reusable prompt, a reviewed action table and a short checklist for the next meeting."
    },
    "faqs": [
      {
        "q": "Can the training use our team’s workflows?",
        "a": "Yes. Discuss the audience and learning goal in your enquiry. Suitable exercises can be scoped around your work using approved or fictional examples."
      },
      {
        "q": "Do participants need a paid ChatGPT account?",
        "a": "Tool and account requirements depend on the agreed exercises. Confirm access before the session; no subscription is included or assumed."
      },
      {
        "q": "Can we use confidential company documents?",
        "a": "Use only data and tools approved by your organization. Fictional or sanitized examples let participants practise without exposing confidential information."
      },
      {
        "q": "Is this available on-site or online?",
        "a": "Training is available on-site across India and live online for Indian and international teams. Dates, format and scope are agreed through an enquiry."
      }
    ],
    "project": "ai-productivity",
    "evidence": {
      "label": "Recent enterprise training engagement with Techanzy",
      "url": "https://www.linkedin.com/feed/update/urn:li:activity:7521572079490707458/"
    }
  },
  {
    "id": "build",
    "slug": "generative-ai-engineering",
    "title": "Generative AI engineering workshops",
    "description": "Hands-on GenAI workshops covering RAG, agents, Codex, APIs and evaluation. Technical team training in India and live online with AI engineer Salmon Joy.",
    "answer": "Build a useful AI application and learn how to judge it. Connect a model to relevant knowledge, define its boundaries, inspect failures and plan how to deploy and monitor it.",
    "audience": "Software engineers, AI teams, technical leads and developers moving from prototypes to maintainable systems.",
    "prerequisites": "Basic programming experience and familiarity with APIs are useful. The environment, account access and any usage costs are agreed before training.",
    "modules": [
      {
        "title": "Build with models and tools",
        "body": "Explore API-based applications, coding assistants and tool-using agents. Define inputs, outputs and the boundary between a model suggestion and an executed action."
      },
      {
        "title": "Ground answers with RAG",
        "body": "Work through ingestion, chunks, embeddings, retrieval and source references. Compare a retrieved passage with the answer it supports."
      },
      {
        "title": "Evaluate before expanding",
        "body": "Create representative test questions, inspect failure cases and separate retrieval quality from answer quality. Discuss latency, deployment and monitoring tradeoffs."
      }
    ],
    "exercise": {
      "title": "A small handbook assistant",
      "steps": [
        "Start with a fictional handbook and a handful of answerable and unanswerable questions.",
        "Retrieve relevant passages and produce answers with source references.",
        "Compare results against expected evidence; record incorrect answers and missing information."
      ],
      "output": "A small working example, a test set and a failure-review checklist—not a claim of production readiness."
    },
    "faqs": [
      {
        "q": "Does the workshop cover RAG and agents?",
        "a": "Both are available topics. The scope is selected around your team’s baseline and learning goal rather than treating every topic as mandatory."
      },
      {
        "q": "Is coding experience required?",
        "a": "This track is designed for developers. Share your team’s programming and API experience so exercises and setup can be matched to their starting point."
      },
      {
        "q": "Will we build a production-ready system?",
        "a": "Exercises teach the engineering approach. Production readiness depends on your data, security, evaluation, operations and requirements; a workshop prototype is not a production guarantee."
      },
      {
        "q": "Can our team attend remotely?",
        "a": "Yes. Live online training is available alongside on-site workshops across India. Required environments and access are agreed in advance."
      }
    ],
    "project": "enterprise-rag",
    "evidence": {
      "label": "Enterprise RAG engineering case study",
      "url": "/projects/enterprise-rag/"
    }
  },
  {
    "id": "teach",
    "slug": "faculty-development",
    "title": "AI faculty development and workshops",
    "description": "Hands-on AI faculty development and institutional workshops with Salmon Joy. Practical examples, guided exercises and responsible AI use, on-site in India or online.",
    "answer": "Help educators turn AI concepts into learning experiences. Combine clear explanations, guided practice and discussion of limitations so participants can adapt useful activities for their own classrooms.",
    "audience": "Faculty members, academic departments, institutions and student learning communities.",
    "prerequisites": "The starting level is agreed with the institution. Introductory sessions can use non-coding activities; technical exercises require the appropriate programming background and lab setup.",
    "modules": [
      {
        "title": "Make the concepts tangible",
        "body": "Connect models, prompts and retrieval to examples learners can inspect. Separate what a tool can demonstrate from what it can reliably establish."
      },
      {
        "title": "Design hands-on learning",
        "body": "Build activities with a clear learning objective, instructions, examples and a review rubric. Allow time to compare answers and discuss mistakes."
      },
      {
        "title": "Teach responsible use",
        "body": "Discuss source checking, attribution and institutional policy. Design assessment activities that reveal a learner’s reasoning rather than only a polished AI-generated answer."
      }
    ],
    "exercise": {
      "title": "Turn an AI answer into a teaching activity",
      "steps": [
        "Choose a fictional policy question or a topic appropriate to the class.",
        "Compare an unsupported answer with an answer grounded in an identified source.",
        "Create a rubric for source quality, explanation and acknowledgement of uncertainty."
      ],
      "output": "An adaptable activity outline and assessment rubric for discussion with your department."
    },
    "faqs": [
      {
        "q": "Can the programme suit non-computing faculty?",
        "a": "Yes. The starting level and examples can be selected for the department. Coding is not required for every introductory activity."
      },
      {
        "q": "Can students join the workshops?",
        "a": "Student workshops and faculty development have different learning goals. Identify the audience in your enquiry so the exercises can be scoped appropriately."
      },
      {
        "q": "What infrastructure does an institution need?",
        "a": "Requirements depend on the activities. Confirm connectivity, devices, approved tools and accounts before the session; technical labs may need additional setup."
      },
      {
        "q": "Are certificates or accreditation included?",
        "a": "No certification or accreditation is promised on this website. Any institutional arrangements must be discussed and confirmed separately."
      }
    ],
    "project": "skill-matrix",
    "evidence": {
      "label": "AI and machine learning workshop at A C Patil College",
      "url": "https://www.linkedin.com/feed/update/urn:li:activity:7164637706701029376/"
    }
  }
];
