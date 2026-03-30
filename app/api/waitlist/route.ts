import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const waitlistFile = path.join(process.cwd(), "data", "waitlist.json");

async function readEntries() {
  try {
    const content = await readFile(waitlistFile, "utf8");
    return JSON.parse(content) as WaitlistEntry[];
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? (error as { code?: string }).code
        : undefined;

    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<WaitlistEntry>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const role = body.role?.trim() ?? "Student";

    if (name.length < 2) {
      return Response.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await mkdir(path.dirname(waitlistFile), { recursive: true });
    const entries = await readEntries();
    const existingIndex = entries.findIndex((entry) => entry.email === email);

    if (existingIndex >= 0) {
      return Response.json(
        {
          existing: true,
          queueSize: existingIndex + 1,
          message: `This email is already on the waitlist. Current position: ${existingIndex + 1}.`,
        },
        { status: 409 },
      );
    }

    const nextEntry: WaitlistEntry = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    entries.push(nextEntry);
    await writeFile(waitlistFile, JSON.stringify(entries, null, 2));

    return Response.json({
      queueSize: entries.length,
      message: `You are in. Current waitlist size: ${entries.length}.`,
    });
  } catch {
    return Response.json(
      { error: "The waitlist service is unavailable right now." },
      { status: 500 },
    );
  }
}
