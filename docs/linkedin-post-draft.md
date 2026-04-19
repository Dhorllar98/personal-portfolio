# LinkedIn Post Draft
**AI-Assisted Development Program · Phase 1 · Task 01**
**Status: DRAFT — Do not publish until reviewed and signed off**

---

I ran out of messages mid-build.

That was not the plan. But it became one of the most useful things that happened.

I spent the first day of this project planning before I wrote a single line of code. Seventeen prompts drafted in deliberate sequence. Every technology decision made and documented. Stack, database, hosting, architecture — settled before the terminal opened.

Then I built a full-stack developer portfolio in a week using Claude.

React 18 and TypeScript on the frontend. ASP.NET Core 9 with Clean Architecture {Domain, Application, Infrastructure, API layers}, Entity Framework Core, and Supabase on the backend. Deployed on Vercel and Render. A working contact form wired to a live database. A blog section with a published article. JWT-authenticated admin panel. The whole thing.

I started in VS Code using Claude Code. The scaffolding was clean and the architecture held up. But I hit my weekly Claude.ai allocation mid-build, and context was drifting across long sessions as I switched between tabs and copy-pasted file contents into the chat window.

So I switched to Cowork — Claude's desktop application with direct file system access, a sandboxed shell, and live MCP integrations including Supabase. No copy-pasting. No context drift. Claude reading the actual files, running TypeScript checks, executing SQL directly against the database.

Three production issues got resolved in focused single sessions:
A contact form returning 500s due to an Npgsql keepalive mismatch on the Supabase connection pooler.
Blog posts not opening because one character in vercel.json was wrong — "/" instead of "/index.html" — which meant React Router never received the route.
EF Core migrations silently blocked by a missing field in the model snapshot.

Each one had a root cause. Each one had a precise fix. Cowork found them faster because it stayed in context.

The biggest lesson: Claude fills silence. If your prompt leaves room for interpretation, Claude will interpret it — fully and immediately. Constraints are not optional. They are structural.

Claude Code and Cowork are both Claude. The difference is friction and retained context. Less friction means more cycles. More context means fewer corrections.

The site is live. The architecture is clean.

The full breakdown — including the three-layer debugging problem that kept the blog section invisible for two days after everything else was working — is on the site itself.

https://portfolio-frontend-steel-three.vercel.app/blog/building-my-portfolio-with-claude-honest-version

#AIAssistedDevelopment #ClaudeCode #Cowork #DotNet #ASPNETCore #React #TypeScript #CleanArchitecture #Supabase #FullStackDevelopment
