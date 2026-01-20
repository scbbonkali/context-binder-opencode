import { tool } from "@opencode-ai/plugin";
import fs from "fs";
import os from "os";
import path from "path";

// ------------------------- STATE PATH (PORTABLE) -------------------------
// Prefer XDG_STATE_HOME, fallback to ~/.local/share/opencode, then OS temp as last resort
const BASE_STATE_DIR =
  process.env.XDG_STATE_HOME ||
  path.join(os.homedir(), ".local", "share", "opencode");

interface ContextBindingState {
  enabled: boolean;
  maxMessages: number;
}

function getStateFile(): string {
  try {
    fs.mkdirSync(BASE_STATE_DIR, { recursive: true });
    return path.join(BASE_STATE_DIR, "context-binding-state.json");
  } catch {
    return path.join(os.tmpdir(), "context-binding-state.json");
  }
}

function loadState(): ContextBindingState {
  try {
    const file = getStateFile();
    if (fs.existsSync(file)) {
      return JSON.parse(
        fs.readFileSync(file, "utf8")
      ) as ContextBindingState;
    }
  } catch {
    // ignore
  }

  return { enabled: false, maxMessages: 100 };
}

function saveState(state: ContextBindingState): void {
  try {
    fs.writeFileSync(
      getStateFile(),
      JSON.stringify(state, null, 2)
    );
  } catch (e) {
    console.error("Context Binding: failed to save state", e);
  }
}

export const contextBindingPlugin = async () => {
  console.log("🔒 Context Binding Plugin loaded");

  return {
    tool: {
      bindContext: tool({
        description: "Enable or disable message-count based context binding",
        args: {
          enabled: tool.schema.boolean(),
          maxMessages: tool.schema.number().min(0).optional()
        },
        async execute(args: { enabled: boolean; maxMessages?: number }) {
          const current = loadState();

          const next: ContextBindingState = {
            ...current,
            enabled: args.enabled
          };

          if (args.maxMessages !== undefined) {
            next.maxMessages = args.maxMessages;
          }

          saveState(next);

          return next.enabled
            ? `🔒 Context bound to ${next.maxMessages} messages`
            : `🔓 Context binding disabled`;
        }
      }),

      contextStatus: tool({
        description: "Show current context binding status",
        args: {},
        async execute() {
          const state = loadState();

          return state.enabled
            ? `🔒 Context binding ON\n📊 Max messages: ${state.maxMessages}`
            : "🔓 Context binding OFF";
        }
      })
    },

    "experimental.chat.messages.transform": async (
      _input: unknown,
      output: { messages?: unknown[] }
    ) => {
      try {
        const state = loadState();
        if (!state.enabled) return;
        if (!Array.isArray(output?.messages)) return;

        const max = state.maxMessages || 100;
        if (output.messages.length <= max) return;

        output.messages = output.messages.slice(-max);
      } catch (e) {
        console.error("Context Binding: trim failed", e);
      }
    }
  };
};

export default contextBindingPlugin;
