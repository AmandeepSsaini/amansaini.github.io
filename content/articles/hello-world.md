---
title: Why I'm starting to write
date: 2026-10-04T12:00:00.000Z
description: Notes from ten years of shipping software — and the last two of shipping LLM agents to production.
tags:
  - Writing
  - AI Engineering
draft: false
---

I've spent the last decade building products, and the last couple of years building the agent platform at Thryv. Most of what I learned along the way lives in Slack threads and design docs nobody will read again. This is where I'll write it down properly.

## What to expect

- **Agent architecture** — orchestration, tool servers over MCP, and the boring plumbing that makes them reliable.
- **Retrieval** — what actually moves answer quality in a RAG pipeline, and what doesn't.
- **Front-end at scale** — lessons from leading teams across React and Vue 3.

> The interesting problems are rarely the model. They're everything around it.

A small taste of the kind of code you'll see here:

```python
async def run_agent(agent, task):
    async with agent.session() as s:
        return await s.run(task, tools=agent.tools)
```

More soon.
