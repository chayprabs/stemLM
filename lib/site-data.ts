export type ProblemCard = {
  title: string;
  description: string;
  icon: "cross" | "warning";
};

export type TimelineStep = {
  title: string;
  description: string;
  tag?: string;
  code?: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  icon: "steps" | "network" | "playbook" | "download" | "select" | "tree";
};

export type AudienceCard = {
  number: string;
  title: string;
  description: string;
};

export type TrustInstitution = {
  short: string;
  name: string;
  region: "India" | "USA" | "China";
};

export type DiagramKey =
  | "circuit-original"
  | "circuit-collapse"
  | "circuit-equivalent"
  | "optics-setup"
  | "optics-rays"
  | "optics-image"
  | "mechanics-setup"
  | "mechanics-fbd"
  | "mechanics-equation";

export type DemoStep = {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  takeaway: string;
  diagram: DiagramKey;
};

export type QuickCheck = {
  prompt: string;
  answer: string;
  tip: string;
};

export type StudyTool = {
  label: string;
  prompt: string;
};

export type DemoScenario = {
  id: string;
  label: string;
  domain: string;
  topicKey: string;
  defaultQuestion: string;
  outputLabel: string;
  difficulty: "Foundational" | "Core" | "Exam-style";
  revisionSummary: string;
  commonMistake: string;
  quickChecks: QuickCheck[];
  followUpPrompts: StudyTool[];
  tags: string[];
  steps: DemoStep[];
};

export const problemCards: ProblemCard[] = [
  {
    title: "No intermediate diagrams",
    description:
      "The AI says 'after combining R1 and R2 in parallel' but never shows what the circuit looks like at that moment.",
    icon: "cross",
  },
  {
    title: "Steps get skipped",
    description:
      "AI jumps from the problem statement to a near-final answer, cutting the 3 or 4 stages where students actually get confused.",
    icon: "warning",
  },
  {
    title: "No domain awareness",
    description:
      "A circuit problem, an optics question, and a mechanics FBD each need a different solution structure. Raw AI treats them like plain prose.",
    icon: "cross",
  },
  {
    title: "Solutions you cannot reuse",
    description:
      "You cannot export the work cleanly, select a step and ask about it, or save it for revision. It disappears into chat history.",
    icon: "warning",
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    title: "Type your question into any AI",
    description:
      "stemLM is designed to fit on top of tools like ChatGPT, Claude, and Gemini without changing your normal study workflow.",
    tag: "Platform agnostic",
  },
  {
    title: "Activate stemLM mode",
    description:
      "One tap applies a subject-aware solving framework before the answer is generated.",
    tag: "One click workflow",
  },
  {
    title: "stemLM identifies the exact topic",
    description:
      "The app maps the question into a chapter, topic, and subtopic key so the answer structure matches the problem type.",
    code: "PHY -> Circuits -> Parallel Networks -> PHY_EL_RC_001",
  },
  {
    title: "The AI follows the playbook",
    description:
      "Instead of loose prose, the model returns steps, formulas, and the right diagram at each point of the solution.",
  },
  {
    title: "The guided panel opens",
    description:
      "The study workspace organizes the response into cards so the student can move through the reasoning without losing context.",
  },
  {
    title: "Each step gets its own visual",
    description:
      "The diagram changes as the reasoning changes. Students see the exact state of the circuit, ray path, or force diagram at that moment.",
  },
  {
    title: "Interact, ask follow-ups, and export",
    description:
      "Students can focus on a single step, save the session, and export a clean outline for revision.",
  },
];

export const featureCards: FeatureCard[] = [
  {
    title: "Step-synced diagrams",
    description:
      "Every stage of the solution gets the matching visual, not only the final state.",
    icon: "steps",
  },
  {
    title: "Works with any AI",
    description:
      "The workflow is platform agnostic so students do not need to switch their preferred assistant.",
    icon: "network",
  },
  {
    title: "Subject-aware playbooks",
    description:
      "Circuits, optics, mechanics, and chemistry can all follow different solving structures.",
    icon: "playbook",
  },
  {
    title: "Clean exports",
    description:
      "Students can turn a session into a neat outline instead of losing it inside a conversation thread.",
    icon: "download",
  },
  {
    title: "Select and ask",
    description:
      "Any step can become a focused follow-up prompt for deeper clarification.",
    icon: "select",
  },
  {
    title: "Growing knowledge tree",
    description:
      "New topics can plug into the same framework without rebuilding the student experience each time.",
    icon: "tree",
  },
];

export const audienceCards: AudienceCard[] = [
  {
    number: "01",
    title: "JEE and NEET aspirants",
    description:
      "The product is strongest where visual step-by-step reasoning is the difference between solving and guessing.",
  },
  {
    number: "02",
    title: "B.Tech and B.Sc students",
    description:
      "Assignments, revision, lab work, and exam prep benefit from structured explanations more than from raw answers.",
  },
  {
    number: "03",
    title: "Anyone learning STEM with AI",
    description:
      "If the AI often skips the part where you are confused, stemLM is built for that gap.",
  },
];

export const domainPills = [
  "Circuits",
  "Free body diagrams",
  "Ray diagrams",
  "Organic chemistry",
  "Thermodynamics",
  "Cell biology",
];

export const trustInstitutions: TrustInstitution[] = [
  { short: "BITS", name: "BITS Pilani", region: "India" },
  { short: "IITD", name: "IIT Delhi", region: "India" },
  { short: "IITB", name: "IIT Bombay", region: "India" },
  { short: "IITM", name: "IIT Madras", region: "India" },
  { short: "IIITH", name: "IIIT Hyderabad", region: "India" },
  { short: "MAHE", name: "Manipal", region: "India" },
  { short: "STAN", name: "Stanford", region: "USA" },
  { short: "UPENN", name: "UPenn", region: "USA" },
  { short: "MIT", name: "MIT", region: "USA" },
  { short: "HARV", name: "Harvard", region: "USA" },
  { short: "TSING", name: "Tsinghua", region: "China" },
  { short: "PKU", name: "Peking University", region: "China" },
];

export const demoScenarios: DemoScenario[] = [
  {
    id: "circuits",
    label: "Parallel resistor reduction",
    domain: "Physics",
    topicKey: "PHY -> Circuits -> Parallel Networks -> PHY_EL_RC_001",
    defaultQuestion:
      "A 12V source powers R3 = 4 ohm in series with a branch containing R1 = 6 ohm and R2 = 3 ohm in parallel. Find the equivalent resistance and total current.",
    outputLabel: "Equivalent circuit walkthrough",
    difficulty: "Core",
    revisionSummary:
      "Spot the parallel branch first, reduce it to a single equivalent resistor, then combine the remaining series path before applying Ohm's law.",
    commonMistake:
      "Students often add 6 ohm and 3 ohm directly even though the resistors are in parallel, which breaks the rest of the solution.",
    quickChecks: [
      {
        prompt: "Why do R1 and R2 count as parallel instead of series?",
        answer:
          "They share the same two nodes, so the voltage across both resistors is identical.",
        tip: "Look at the connection points before choosing the formula.",
      },
      {
        prompt: "What would the total current be if the source were 18V instead of 12V?",
        answer: "The equivalent resistance stays 6 ohm, so the total current would be 18 / 6 = 3A.",
        tip: "Once the network is reduced, reuse the same Req.",
      },
      {
        prompt: "Which quantity must be found before the final current?",
        answer:
          "The equivalent resistance of the full network must be found first.",
        tip: "Current is the last step here, not the first.",
      },
    ],
    followUpPrompts: [
      {
        label: "Explain the branch logic",
        prompt:
          'Explain how to identify a parallel branch in the question "A 12V source powers R3 = 4 ohm in series with a branch containing R1 = 6 ohm and R2 = 3 ohm in parallel." Keep it beginner friendly.',
      },
      {
        label: "Create a similar practice problem",
        prompt:
          "Create one new parallel-plus-series resistor problem with different values, then provide the final answer separately.",
      },
      {
        label: "Check my own working",
        prompt:
          "Give me a short checklist for verifying a resistor-reduction solution before I trust the final current value.",
      },
    ],
    tags: ["Series + parallel", "Equivalent resistance", "Current"],
    steps: [
      {
        id: "c-step-1",
        title: "Draw the original network",
        explanation:
          "Start with the untouched circuit so the student knows exactly which two resistors share the same pair of nodes.",
        formula: "Known values: R1 = 6 ohm, R2 = 3 ohm, R3 = 4 ohm, V = 12V",
        takeaway:
          "R1 and R2 are in parallel because both ends connect to the same two nodes.",
        diagram: "circuit-original",
      },
      {
        id: "c-step-2",
        title: "Collapse the parallel branch",
        explanation:
          "Replace the R1 and R2 branch with one resistor Rp before touching the series part of the problem.",
        formula: "1 / Rp = 1 / 6 + 1 / 3, so Rp = 2 ohm",
        takeaway:
          "Solving the parallel portion first turns the circuit into a simpler series network.",
        diagram: "circuit-collapse",
      },
      {
        id: "c-step-3",
        title: "Finish the series reduction",
        explanation:
          "Once the branch becomes Rp, the total resistance is just the sum of R3 and Rp.",
        formula: "Req = R3 + Rp = 4 + 2 = 6 ohm, I = V / Req = 12 / 6 = 2A",
        takeaway:
          "The full circuit draws 2A because the equivalent resistance is 6 ohm.",
        diagram: "circuit-equivalent",
      },
    ],
  },
  {
    id: "optics",
    label: "Convex lens image formation",
    domain: "Physics",
    topicKey: "PHY -> Optics -> Thin Lens -> PHY_OP_LN_014",
    defaultQuestion:
      "An object is placed between f and 2f of a convex lens. Describe where the image forms and whether it is real or virtual.",
    outputLabel: "Ray diagram walkthrough",
    difficulty: "Foundational",
    revisionSummary:
      "Mark the focal points first, trace the standard rays carefully, and then read image position, orientation, and size from the ray intersection.",
    commonMistake:
      "A common slip is stating only that the image is real without also mentioning that it forms beyond 2f and is enlarged.",
    quickChecks: [
      {
        prompt: "Which ray passes straight through a convex lens without bending?",
        answer:
          "The ray through the optical center continues in the same straight line.",
        tip: "This ray is the easiest anchor when the diagram gets crowded.",
      },
      {
        prompt: "If the object moves beyond 2f, would the image still be enlarged?",
        answer:
          "No. For an object beyond 2f, the image forms between f and 2f and becomes diminished.",
        tip: "Changing the object region changes all three image properties.",
      },
      {
        prompt: "What three properties should the final statement include?",
        answer:
          "Position, orientation, and size of the image should all be stated.",
        tip: "Avoid one-word answers in optics summaries.",
      },
    ],
    followUpPrompts: [
      {
        label: "Slow down the ray tracing",
        prompt:
          'Walk me through the standard convex-lens rays for the case "object between f and 2f" as if I am drawing them by hand.',
      },
      {
        label: "Compare with concave lens",
        prompt:
          "Compare the same setup with a concave lens and explain how the image properties change.",
      },
      {
        label: "Turn this into revision notes",
        prompt:
          "Convert the convex-lens image-formation rule into five fast revision bullets for exam prep.",
      },
    ],
    tags: ["Convex lens", "Image position", "Ray tracing"],
    steps: [
      {
        id: "o-step-1",
        title: "Mark the object and focal points",
        explanation:
          "Set the principal axis, lens center, and focal points first so the geometry of the problem is visible.",
        formula: "Object position: f < u < 2f",
        takeaway:
          "When the object sits between f and 2f, the image should form beyond 2f on the other side.",
        diagram: "optics-setup",
      },
      {
        id: "o-step-2",
        title: "Trace the two standard rays",
        explanation:
          "One ray travels parallel to the axis and refracts through the far focal point. Another passes through the optical center without deviation.",
        formula: "Parallel ray -> through F2, central ray -> straight line",
        takeaway:
          "The image location comes from where the refracted rays intersect.",
        diagram: "optics-rays",
      },
      {
        id: "o-step-3",
        title: "Read the image properties",
        explanation:
          "The ray intersection lies beyond 2f, giving an image that is real, inverted, and magnified.",
        formula: "Image beyond 2f -> real, inverted, enlarged",
        takeaway:
          "The final statement should include position, orientation, and size, not only one of them.",
        diagram: "optics-image",
      },
    ],
  },
  {
    id: "mechanics",
    label: "Block on an incline",
    domain: "Mechanics",
    topicKey: "PHY -> Mechanics -> Inclined Plane -> PHY_ME_FBD_009",
    defaultQuestion:
      "A 5 kg block slides down a frictionless 30 degree incline. Find the acceleration and identify the force components along and perpendicular to the plane.",
    outputLabel: "Free body diagram walkthrough",
    difficulty: "Exam-style",
    revisionSummary:
      "Choose axes along and perpendicular to the incline, resolve weight into components, and then apply Newton's second law only along the motion direction.",
    commonMistake:
      "Many students use mg cos(theta) as the driving force down the slope, but the component along the plane is mg sin(theta).",
    quickChecks: [
      {
        prompt: "Which force component actually causes the block to accelerate?",
        answer:
          "The component parallel to the plane, mg sin(theta), drives the motion.",
        tip: "Motion direction tells you which component matters for ma.",
      },
      {
        prompt: "What does the normal force balance in the frictionless case?",
        answer:
          "The normal force balances the perpendicular component mg cos(theta).",
        tip: "No acceleration means no imbalance on that axis.",
      },
      {
        prompt: "If the angle increased to 60 degrees, would the acceleration rise or fall?",
        answer:
          "It would rise because sin(theta) increases, so mg sin(theta) becomes larger.",
        tip: "Think about how the parallel component changes with angle.",
      },
    ],
    followUpPrompts: [
      {
        label: "Explain the force split",
        prompt:
          'Explain why the weight becomes mg sin(theta) and mg cos(theta) for a block on an incline, using simple geometry and no skipped steps.',
      },
      {
        label: "Add friction to the problem",
        prompt:
          "Extend the incline problem to include kinetic friction and show how the acceleration equation changes.",
      },
      {
        label: "Quiz me on common errors",
        prompt:
          "Ask me three short questions about incline-force diagrams and then grade my answers.",
      },
    ],
    tags: ["Incline", "Force components", "Acceleration"],
    steps: [
      {
        id: "m-step-1",
        title: "Sketch the incline and the block",
        explanation:
          "Before writing equations, place the block on the plane and define axes parallel and perpendicular to the surface.",
        formula: "m = 5 kg, theta = 30 deg, friction = 0",
        takeaway:
          "Choosing axes along the incline makes the later equations much cleaner.",
        diagram: "mechanics-setup",
      },
      {
        id: "m-step-2",
        title: "Resolve the weight into components",
        explanation:
          "The weight splits into one component along the plane and one component into the plane.",
        formula: "mg sin(theta) along the plane, mg cos(theta) normal to the plane",
        takeaway:
          "Only the component along the plane drives the motion in the frictionless case.",
        diagram: "mechanics-fbd",
      },
      {
        id: "m-step-3",
        title: "Apply Newton's second law",
        explanation:
          "Set the net force along the plane equal to ma, then solve for acceleration.",
        formula: "ma = mg sin(theta), so a = g sin(30 deg) = 9.8 x 0.5 = 4.9 m/s^2",
        takeaway:
          "The block accelerates down the plane at 4.9 m/s^2 while the normal balances mg cos(theta).",
        diagram: "mechanics-equation",
      },
    ],
  },
];

export function findScenarioById(id: string): DemoScenario {
  return demoScenarios.find((scenario) => scenario.id === id) ?? demoScenarios[0];
}

export function matchScenario(question: string): DemoScenario {
  const normalized = question.toLowerCase();

  if (/lens|mirror|image|ray|focal|convex|concave/.test(normalized)) {
    return findScenarioById("optics");
  }

  if (/incline|block|force|friction|newton|acceleration|plane/.test(normalized)) {
    return findScenarioById("mechanics");
  }

  if (/circuit|resistor|voltage|current|parallel|series|ohm/.test(normalized)) {
    return findScenarioById("circuits");
  }

  return demoScenarios[0];
}
