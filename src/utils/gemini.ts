export class GeminiCommandError extends Error {
  exitCode: number;

  constructor(message: string, exitCode: number) {
    super(message);
    this.exitCode = exitCode;
  }
}

interface GeminiCommandOptions {
  captureOutput?: boolean;
  env?: Record<string, string>;
}

export async function ensureGeminiAvailable(): Promise<void> {
  let proc: Bun.Subprocess | undefined;

  try {
    proc = Bun.spawn(['gemini', '--help'], {
      stdout: 'pipe',
      stderr: 'pipe',
    });
  } catch (error) {
    throw new Error('Gemini CLI not found. Install it and ensure it is accessible on your PATH.');
  }

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    throw new Error('Gemini CLI is installed but returned an error. Check your installation and try again.');
  }
}

export async function executeGeminiCommand(prompt: string, options: GeminiCommandOptions = {}): Promise<string | void> {
  const { captureOutput = false, env } = options;
  const model = process.env.SKETCH_GEMINI_MODEL || 'gemini-2.5-flash';
  const stdinMode = 'pipe' as const; // Avoid raw TTY mode to prevent EIO issues

  const proc = Bun.spawn(['gemini', '-m', model, '--yolo', prompt], {
    stdout: captureOutput ? 'pipe' : 'inherit',
    stderr: 'inherit',
    stdin: stdinMode,
    env: {
      ...process.env,
      ...env,
    },
  });

  const outputPromise = captureOutput ? new Response(proc.stdout).text() : Promise.resolve('');
  const exitCode = await proc.exited;
  const output = await outputPromise;

  if (exitCode !== 0) {
    throw new GeminiCommandError(`Gemini command failed with exit code ${exitCode}`, exitCode);
  }

  return captureOutput ? output.trim() : undefined;
}
