import type { DiagramKey } from "@/lib/site-data";

type SvgProps = {
  className?: string;
};

export function HeroWorkspacePreview({ className }: SvgProps) {
  return (
    <div className={className}>
      <div className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs font-medium text-[#0EA5A0]">
            stemLM workspace
          </span>
          <span className="rounded-sm border border-[#E2E8F0] px-2 py-1 text-xs text-[#64748B]">
            Physics
          </span>
          <span className="rounded-sm border border-[#E2E8F0] px-2 py-1 text-xs text-[#64748B]">
            Guided mode
          </span>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] p-4">
          <p className="mb-1 text-xs font-medium text-[#64748B]">Question</p>
          <p className="text-sm text-[#0F1117]">
            Reduce the mixed resistor network and explain each transformation before
            solving for current.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-[#0EA5A0] bg-[#0EA5A015] p-4">
            <p className="text-xs font-medium text-[#0EA5A0]">Step 1</p>
            <p className="mt-1 text-sm font-medium text-[#0F1117]">
              Identify the parallel branch between A and B.
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-4">
            <p className="text-xs font-medium text-[#64748B]">Step 2</p>
            <p className="mt-1 text-sm font-medium text-[#0F1117]">
              Collapse R1 and R2 into one equivalent resistor.
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-4">
            <p className="text-xs font-medium text-[#64748B]">Step 3</p>
            <p className="mt-1 text-sm font-medium text-[#0F1117]">
              Use the simplified circuit to solve total current.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroCircuit({ className }: SvgProps) {
  return (
    <div className={className}>
      <svg
        className="w-full"
        viewBox="0 0 420 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Circuit diagram showing parallel and series reduction"
      >
        <line x1="50" y1="90" x2="50" y2="190" className="diagram-wire" />
        <line x1="38" y1="125" x2="62" y2="125" className="diagram-battery-major" />
        <line x1="42" y1="135" x2="58" y2="135" className="diagram-battery-minor" />
        <text x="26" y="162" className="diagram-label">
          12V
        </text>

        <line x1="50" y1="90" x2="140" y2="90" className="diagram-wire" />
        <rect x="140" y="75" width="70" height="30" rx="6" className="diagram-resistor" />
        <text x="153" y="95" className="diagram-label">
          R3 = 4 ohm
        </text>
        <line x1="210" y1="90" x2="270" y2="90" className="diagram-wire" />

        <circle cx="270" cy="90" r="4" className="diagram-node" />
        <text x="261" y="78" className="diagram-label small">
          A
        </text>

        <line x1="270" y1="90" x2="270" y2="45" className="diagram-wire" />
        <line x1="270" y1="45" x2="310" y2="45" className="diagram-wire" />
        <rect x="310" y="30" width="60" height="30" rx="6" className="diagram-resistor" />
        <text x="318" y="50" className="diagram-label">
          R1 = 6 ohm
        </text>
        <line x1="370" y1="45" x2="390" y2="45" className="diagram-wire" />
        <line x1="390" y1="45" x2="390" y2="90" className="diagram-wire" />

        <line x1="270" y1="90" x2="270" y2="135" className="diagram-wire" />
        <line x1="270" y1="135" x2="310" y2="135" className="diagram-wire" />
        <rect x="310" y="120" width="60" height="30" rx="6" className="diagram-resistor" />
        <text x="318" y="140" className="diagram-label">
          R2 = 3 ohm
        </text>
        <line x1="370" y1="135" x2="390" y2="135" className="diagram-wire" />
        <line x1="390" y1="135" x2="390" y2="90" className="diagram-wire" />

        <circle cx="390" cy="90" r="4" className="diagram-node" />
        <text x="382" y="78" className="diagram-label small">
          B
        </text>

        <line x1="390" y1="90" x2="390" y2="190" className="diagram-wire" />
        <line x1="390" y1="190" x2="50" y2="190" className="diagram-wire" />
      </svg>
    </div>
  );
}

export function ShowcaseOriginalDiagram() {
  return (
    <svg viewBox="0 0 290 180" xmlns="http://www.w3.org/2000/svg" aria-label="Original circuit">
      <line x1="35" y1="55" x2="35" y2="135" className="diagram-wire" />
      <line x1="25" y1="80" x2="45" y2="80" className="diagram-battery-major" />
      <line x1="28" y1="88" x2="42" y2="88" className="diagram-battery-minor" />
      <text x="15" y="108" className="diagram-label">
        12V
      </text>
      <line x1="35" y1="55" x2="90" y2="55" className="diagram-wire" />
      <rect x="90" y="43" width="50" height="24" rx="6" className="diagram-resistor" />
      <text x="96" y="59" className="diagram-label">
        R3 = 4
      </text>
      <line x1="140" y1="55" x2="175" y2="55" className="diagram-wire" />
      <circle cx="175" cy="55" r="3" className="diagram-node" />
      <text x="168" y="46" className="diagram-label small">
        A
      </text>
      <line x1="175" y1="55" x2="175" y2="30" className="diagram-wire" />
      <line x1="175" y1="30" x2="205" y2="30" className="diagram-wire" />
      <rect x="205" y="18" width="45" height="24" rx="6" className="diagram-resistor" />
      <text x="210" y="34" className="diagram-label">
        R1 = 6
      </text>
      <line x1="250" y1="30" x2="265" y2="30" className="diagram-wire" />
      <line x1="265" y1="30" x2="265" y2="55" className="diagram-wire" />
      <line x1="175" y1="55" x2="175" y2="80" className="diagram-wire" />
      <line x1="175" y1="80" x2="205" y2="80" className="diagram-wire" />
      <rect x="205" y="68" width="45" height="24" rx="6" className="diagram-resistor" />
      <text x="210" y="84" className="diagram-label">
        R2 = 3
      </text>
      <line x1="250" y1="80" x2="265" y2="80" className="diagram-wire" />
      <line x1="265" y1="80" x2="265" y2="55" className="diagram-wire" />
      <circle cx="265" cy="55" r="3" className="diagram-node" />
      <text x="258" y="46" className="diagram-label small">
        B
      </text>
      <line x1="265" y1="55" x2="265" y2="135" className="diagram-wire" />
      <line x1="265" y1="135" x2="35" y2="135" className="diagram-wire" />
    </svg>
  );
}

export function ShowcaseCollapsedDiagram() {
  return (
    <svg viewBox="0 0 290 150" xmlns="http://www.w3.org/2000/svg" aria-label="Parallel branch collapsed">
      <line x1="35" y1="45" x2="35" y2="115" className="diagram-wire" />
      <line x1="25" y1="68" x2="45" y2="68" className="diagram-battery-major" />
      <line x1="28" y1="76" x2="42" y2="76" className="diagram-battery-minor" />
      <text x="15" y="95" className="diagram-label">
        12V
      </text>
      <line x1="35" y1="45" x2="90" y2="45" className="diagram-wire" />
      <rect x="90" y="33" width="50" height="24" rx="6" className="diagram-resistor" />
      <text x="96" y="49" className="diagram-label">
        R3 = 4
      </text>
      <line x1="140" y1="45" x2="175" y2="45" className="diagram-wire" />
      <circle cx="175" cy="45" r="3" className="diagram-node" />
      <line x1="175" y1="45" x2="200" y2="45" className="diagram-wire" />
      <rect x="200" y="31" width="55" height="28" rx="6" className="diagram-amber-box" />
      <text x="209" y="49" className="diagram-amber-label">
        Rp = 2
      </text>
      <line x1="255" y1="45" x2="270" y2="45" className="diagram-wire" />
      <circle cx="270" cy="45" r="3" className="diagram-node" />
      <line x1="270" y1="45" x2="270" y2="115" className="diagram-wire" />
      <line x1="270" y1="115" x2="35" y2="115" className="diagram-wire" />
      <text x="206" y="74" className="diagram-amber-label small">
        R1 || R2
      </text>
    </svg>
  );
}

export function ShowcaseEquivalentDiagram() {
  return (
    <svg viewBox="0 0 290 140" xmlns="http://www.w3.org/2000/svg" aria-label="Equivalent circuit">
      <line x1="70" y1="35" x2="70" y2="105" className="diagram-wire" />
      <line x1="58" y1="58" x2="82" y2="58" className="diagram-battery-major" />
      <line x1="62" y1="66" x2="78" y2="66" className="diagram-battery-minor" />
      <text x="55" y="88" className="diagram-label">
        12V
      </text>
      <line x1="70" y1="35" x2="130" y2="35" className="diagram-wire" />
      <rect x="130" y="21" width="65" height="28" rx="6" className="diagram-resistor" />
      <text x="138" y="39" className="diagram-label">
        Req = 6
      </text>
      <line x1="195" y1="35" x2="230" y2="35" className="diagram-wire" />
      <line x1="230" y1="35" x2="230" y2="105" className="diagram-wire" />
      <line x1="230" y1="105" x2="70" y2="105" className="diagram-wire" />
    </svg>
  );
}

export function StepDiagram({ diagram }: { diagram: DiagramKey }) {
  switch (diagram) {
    case "circuit-original":
      return <ShowcaseOriginalDiagram />;
    case "circuit-collapse":
      return <ShowcaseCollapsedDiagram />;
    case "circuit-equivalent":
      return <ShowcaseEquivalentDiagram />;
    case "optics-setup":
      return <OpticsSetupDiagram />;
    case "optics-rays":
      return <OpticsRayDiagram />;
    case "optics-image":
      return <OpticsImageDiagram />;
    case "mechanics-setup":
      return <MechanicsSetupDiagram />;
    case "mechanics-fbd":
      return <MechanicsFreeBodyDiagram />;
    case "mechanics-equation":
      return <MechanicsEquationDiagram />;
    default:
      return null;
  }
}

export default StepDiagram;

function OpticsSetupDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Lens setup">
      <line x1="25" y1="85" x2="295" y2="85" className="diagram-wire" />
      <line x1="160" y1="30" x2="160" y2="140" className="diagram-axis-strong" />
      <text x="151" y="24" className="diagram-label">
        Lens
      </text>
      <line x1="100" y1="78" x2="100" y2="92" className="diagram-axis-tick" />
      <text x="92" y="108" className="diagram-label small">
        F1
      </text>
      <line x1="220" y1="78" x2="220" y2="92" className="diagram-axis-tick" />
      <text x="212" y="108" className="diagram-label small">
        F2
      </text>
      <line x1="65" y1="78" x2="65" y2="92" className="diagram-axis-tick" />
      <text x="53" y="108" className="diagram-label small">
        2F1
      </text>
      <line x1="255" y1="78" x2="255" y2="92" className="diagram-axis-tick" />
      <text x="243" y="108" className="diagram-label small">
        2F2
      </text>
      <line x1="120" y1="85" x2="120" y2="40" className="diagram-object" />
      <polygon points="120,35 116,44 124,44" className="diagram-object-fill" />
      <text x="108" y="32" className="diagram-label">
        Object
      </text>
    </svg>
  );
}

function OpticsRayDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Lens rays">
      <line x1="25" y1="85" x2="295" y2="85" className="diagram-wire" />
      <line x1="160" y1="30" x2="160" y2="140" className="diagram-axis-strong" />
      <line x1="120" y1="85" x2="120" y2="40" className="diagram-object" />
      <polygon points="120,35 116,44 124,44" className="diagram-object-fill" />
      <line x1="120" y1="40" x2="160" y2="40" className="diagram-amber-stroke" />
      <line x1="160" y1="40" x2="255" y2="120" className="diagram-amber-stroke" />
      <line x1="120" y1="40" x2="220" y2="120" className="diagram-green-stroke" />
      <line x1="220" y1="120" x2="255" y2="120" className="diagram-green-stroke" />
      <line x1="255" y1="78" x2="255" y2="92" className="diagram-axis-tick" />
      <text x="245" y="108" className="diagram-label small">
        2F2
      </text>
    </svg>
  );
}

function OpticsImageDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Lens image">
      <line x1="25" y1="85" x2="295" y2="85" className="diagram-wire" />
      <line x1="160" y1="30" x2="160" y2="140" className="diagram-axis-strong" />
      <line x1="120" y1="85" x2="120" y2="40" className="diagram-object" />
      <polygon points="120,35 116,44 124,44" className="diagram-object-fill" />
      <line x1="255" y1="85" x2="255" y2="125" className="diagram-image" />
      <polygon points="255,130 251,121 259,121" className="diagram-image-fill" />
      <text x="238" y="146" className="diagram-label">
        Real image
      </text>
      <line x1="120" y1="40" x2="160" y2="40" className="diagram-amber-stroke" />
      <line x1="160" y1="40" x2="255" y2="120" className="diagram-amber-stroke" />
      <line x1="120" y1="40" x2="255" y2="120" className="diagram-green-stroke" />
    </svg>
  );
}

function MechanicsSetupDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Incline setup">
      <line x1="40" y1="130" x2="250" y2="130" className="diagram-wire" />
      <line x1="80" y1="130" x2="250" y2="55" className="diagram-axis-strong" />
      <rect
        x="135"
        y="86"
        width="34"
        height="24"
        rx="6"
        transform="rotate(-24 152 98)"
        className="diagram-block"
      />
      <path d="M95 131 A28 28 0 0 1 122 119" className="diagram-amber-stroke" />
      <text x="110" y="122" className="diagram-label small">
        30 deg
      </text>
      <text x="148" y="78" className="diagram-label">
        5 kg block
      </text>
    </svg>
  );
}

function MechanicsFreeBodyDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Free body diagram">
      <line x1="40" y1="130" x2="250" y2="130" className="diagram-wire" />
      <line x1="80" y1="130" x2="250" y2="55" className="diagram-axis-strong" />
      <rect
        x="135"
        y="86"
        width="34"
        height="24"
        rx="6"
        transform="rotate(-24 152 98)"
        className="diagram-block"
      />
      <line x1="152" y1="98" x2="152" y2="145" className="diagram-amber-stroke" />
      <line x1="152" y1="98" x2="192" y2="81" className="diagram-green-stroke" />
      <line x1="152" y1="98" x2="120" y2="112" className="diagram-amber-stroke" />
      <text x="156" y="150" className="diagram-label small">
        mg
      </text>
      <text x="194" y="82" className="diagram-label small">
        N
      </text>
      <text x="93" y="119" className="diagram-label small">
        mg sin(theta)
      </text>
    </svg>
  );
}

function MechanicsEquationDiagram() {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" aria-label="Incline equations">
      <rect x="36" y="32" width="248" height="104" rx="20" className="diagram-equation-card" />
      <text x="58" y="68" className="diagram-amber-label">
        Along plane: ma = mg sin(theta)
      </text>
      <text x="58" y="92" className="diagram-label">
        a = g sin(30 deg)
      </text>
      <text x="58" y="116" className="diagram-label">
        a = 9.8 x 0.5 = 4.9 m/s^2
      </text>
    </svg>
  );
}
