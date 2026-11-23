interface ProjectSource {
  label: string;
  href: string;
}

interface PortfolioProject {
  id: string;
  name: string;
  focus: string;
  status: string;
  summary: string;
  stack: readonly string[];
  approach: readonly string[];
  evidence: string;
  sources?: readonly ProjectSource[];
}

const aiDemos = "https://github.com/Gkthakare/ai-portfolio-projects";
const applyForge = "https://github.com/Gkthakare/applyforge";

export const githubProfile = "https://github.com/Gkthakare";

export const featuredProjects: readonly PortfolioProject[] = [
  {
    id: "document-rag",
    name: "Document Q&A",
    focus: "Retrieval-augmented generation",
    status: "Public code · local demo",
    summary:
      "Upload a PDF, index its text, and ask questions against the passages retrieved for that user.",
    stack: ["Python", "FastAPI", "OpenAI", "NumPy", "React"],
    approach: [
      "The upload endpoint parses text with pypdf, splits it into chunks of up to 1,200 characters with 200 characters of overlap, and stores embeddings with document and user IDs in an on-disk NumPy index.",
      "At query time, retrieval filters by user ID and ranks passages by cosine similarity. The answer prompt asks the model to rely on those passages and acknowledge missing context.",
      "The API returns the number of passages used and logs that count, so a developer can see when retrieval found no results.",
    ],
    evidence:
      "The public repo includes the upload and chat APIs, retrieval code, React UI, and local setup. The prototype accepts text-based PDFs. User IDs scope retrieval in the demo.",
    sources: [
      { label: "Architecture and setup", href: `${aiDemos}/blob/main/docs/03-RAG-SAAS.md` },
      { label: "RAG source code", href: `${aiDemos}/tree/main/rag-saas` },
    ],
  },
  {
    id: "langchain-agent",
    name: "LangChain Tool Agent",
    focus: "Agent orchestration",
    status: "Public code · CLI demo",
    summary:
      "A Python agent that calls search, a calculator, and a workspace file reader, with logs for intermediate tool steps.",
    stack: ["Python", "LangChain", "OpenAI"],
    approach: [
      "LangChain’s tool-calling executor passes a fixed tool list to the OpenAI model. The prompt directs the model to consult tools when a task needs a fact, calculation, or local note.",
      "The CLI returns the agent’s response and logs intermediate tool steps so a developer can inspect the inputs and observations.",
    ],
    evidence:
      "The repo includes the tool definitions, the executor, and instructions for running the CLI with an API key.",
    sources: [
      { label: "Agent walkthrough", href: `${aiDemos}/blob/main/docs/04-AI-AGENT-SYSTEM.md` },
      { label: "Agent source code", href: `${aiDemos}/tree/main/ai-agent-system` },
    ],
  },
  {
    id: "applyforge",
    name: "ResumeLens / ApplyForge",
    focus: "Document workflow automation",
    status: "Public code · in development",
    summary:
      "A resume analysis workflow spanning document parsing, job-description matching, and generation of tailored PDF variants.",
    stack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Celery"],
    approach: [
      "ResumeLens takes an uploaded resume through parsing and scoring, compares it with a job description, and can produce multiple PDF variants.",
      "The wider ApplyForge architecture combines FastAPI and Next.js with PostgreSQL and pgvector, Redis-backed Celery workers, and a scaffold for a five-stage LangGraph workflow.",
    ],
    evidence:
      "The public repository documents the platform architecture, ResumeLens features, and Docker Compose setup.",
    sources: [{ label: "ApplyForge repository", href: applyForge }],
  },
];

export const recentProjects: readonly PortfolioProject[] = [
  {
    id: "aethel",
    name: "AETHEL",
    focus: "Local agents and task recovery",
    status: "Local prototype",
    summary:
      "A local coding worker with fixed task contracts, saved progress, isolated checks, and resume and stop controls.",
    stack: ["TypeScript", "Electron", "Ollama", "Qwen", "FAISS"],
    approach: [
      "The local model proposes structured edits for two predefined arithmetic tasks. The host owns the file scope and the verification commands.",
      "The desktop dashboard shows proposed changes, recorded check results, and task controls. On resume, the worker checks the source hash before continuing.",
      "A separate local retrieval prototype uses FAISS and Ollama embeddings to search project documents.",
    ],
    evidence:
      "In a recorded local run, a boundary check caught an incorrect edit. The task resumed from saved state, the model revised the edit, and all nine fixed cases passed before it was applied.",
  },
  {
    id: "aether-studio",
    name: "Aether Studio",
    focus: "Desktop asset pipeline",
    status: "Local development build",
    summary:
      "A desktop workbench for importing 3D assets, inspecting rigs, and comparing animation poses with recorded job results.",
    stack: ["Electron", "Three.js", "SQLite", "Python", "Blender"],
    approach: [
      "The asset library stores a copy of each imported file and records its hash, metadata, and import status in SQLite.",
      "Character Lab records Blender inspection jobs. Motion Lab inspects clips and compares poses from a single loaded model.",
    ],
    evidence:
      "Motion Lab inspected 37 animation clips from the imported GLB. Garment validation is ongoing. The latest experimental pants mesh failed the deformation check.",
  },
  {
    id: "aetheria-vr-rpg",
    name: "Aetheria VR / Skybound",
    focus: "Quest interaction and locomotion",
    status: "Quest prototype",
    summary:
      "A Unity and OpenXR prototype with recent Skybound work on player-body alignment, snap-turn input, and rig collisions.",
    stack: ["Unity", "C#", "OpenXR", "Quest"],
    approach: [
      "Skybound work places the player body under the headset, adjusts snap-turn handling for a resting hand, and addresses the player rig colliding with itself.",
      "The wider Aetheria project explores procedural worlds and interaction on Quest. The separate world showcase describes the creative direction.",
    ],
    evidence:
      "The public repository documents the VR project and local setup. Skybound comfort work is in development.",
    sources: [
      { label: "Unity project repository", href: "https://github.com/Gkthakare/aetheria-vr-rpg" },
      { label: "Aetheria world showcase", href: "/aetheria" },
    ],
  },
];

export const portfolioProjects = [...featuredProjects, ...recentProjects];

export function getPortfolioProject(id: string) {
  return portfolioProjects.find((project) => project.id === id);
}
