// Eve tool: a file under tools/ becomes a callable tool (filename = tool name).
import { z } from 'zod';

export const inputSchema = z.object({
  channel: z.string().describe('Slack channel id or name'),
  text: z.string().describe('Message text to post'),
});

export default async function run(input: { channel: string; text: string }) {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) throw new Error('SLACK_BOT_TOKEN is not set');
  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ channel: input.channel, text: input.text }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error('Slack error: ' + data.error);
  return { ok: true, ts: data.ts };
}
