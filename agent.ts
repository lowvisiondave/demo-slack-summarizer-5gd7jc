// agent.ts — selects the model/runtime for this Eve agent.
// Eve reads instructions.md as the agent's role; this file is optional config.
export const config = {
  name: "Demo Slack Summarizer",
  model: "anthropic/claude-sonnet-4.6",
  invocation: "scheduled",
};

export default config;
