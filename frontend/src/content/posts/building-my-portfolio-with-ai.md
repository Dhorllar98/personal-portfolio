---
title: "How I Built & Deployed My Personal Portfolio Using AI-Assisted Development (with Claude)"
date: 2026-04-03
excerpt: "From a blank workspace to a deployed portfolio — how I used Claude Code to build a full-stack developer site in days, and what that process honestly taught me about directing AI with intention."
tags: claude-code, ai-assisted-development, dotnet, csharp, aspnet-core, supabase, react, typescript
status: published
---

I spent an entire day planning before I wrote a single line of code.

I read both required articles — thoroughly, not just skimmed. I reviewed my existing GitHub repositories for patterns worth carrying forward. I studied the assignment brief until the requirements stopped feeling abstract and started feeling like decisions. I drafted seventeen prompts in deliberate sequence, challenged each one, rewrote the ones that were vague, and cut the ones that had already been answered before they were asked. Then, and only then, did I open VS Code.

The workspace was empty. The cursor was blinking. But I wasn't starting from zero — I was arriving with a plan, and that distinction changed everything about how the build went.

I connected the Claude extension — VS Code Extensions panel, search Claude, install, then the Claude icon appears in the top right activity bar — opened a new chat, and sent my first prompt. What followed was one of the most instructive weeks I've had as a developer.

---

## What I Was Building

This portfolio is my Phase 1 cohort assignment for the AI-Assisted Development Program — a structured program that asks you to build real things with Claude Code, not demo projects. The deliverable: a full personal portfolio site with five sections (Hero, About, Projects, Blog, Contact), a contact form wired to a live database, a working API, and a blog post published on the site itself. Two days to build. One day to breathe.

My stack is React 18, TypeScript, Vite, and Tailwind CSS on the frontend — ASP.NET Core 9, C#, clean architecture, EF Core, and Supabase on the backend. The same foundations I'd already built across my `fashion-and-lifestyle-v1` site (live on Vercel and Render, still in progress) and my `clinical-task-management-api`. The portfolio wasn't going to diverge from those patterns. It was going to extend them.

---

## The Setup

The technical setup on Day 2 was a sequence of small walls, each one solvable, none of them comfortable.

CoWork needed virtualization that VTx alone in BIOS couldn't provide — Hyper-V also had to be enabled inside Windows. Git pushed to a remote that didn't exist yet. EF Core packages that NuGet silently upgraded to .NET 10 when my project targets .NET 9. A Supabase hostname that my ISP's DNS flat-out refused to resolve, requiring a switch to Google DNS and then to Supabase's connection pooler. An esbuild binary incompatible with Node v24 that needed updating before the frontend would start.

Each issue had a fix. None of the fixes were obvious until they were. And in my environment, there's a layer that no tutorial mentions: the electricity supply in my vicinity is genuinely unreliable. Power cuts mid-session aren't rare events — they're a workflow reality I've built muscle memory around. You learn to save and commit constantly. You document state clearly before you stop, because you might not choose when you stop.

When EF Core's migration kept timing out at the `CREATE TABLE` step — network instability between my machine and the Supabase pooler in eu-west-3 — I didn't wait for the connection to cooperate. I opened Supabase's SQL editor, wrote the migration statements by hand, and ran them directly. Both tables appeared immediately. The lesson: knowing what the tool does underneath is what makes the workaround possible. Abstractions fail. The SQL doesn't lie.

I had Prompts 2 and 3 prepared for database and hosting evaluation respectively — but after Claude's Prompt 1 response, I sat with every option it surfaced, critically evaluated the pros and cons of each one, and made firm decisions: stack, database, hosting, architecture, all of it. By the time I was done with that evaluation, Prompts 2 and 3 had nothing left to ask. I skipped them both. Sending a prompt you've already answered isn't thoroughness. It's noise.

---

## Three Moments That Changed How I Think About This

**1. Claude built the entire application when I told it not to.**

Prompt 4 was clear: scaffold the monorepo structure, no feature code yet. Claude delivered the full application in one run — domain entities, application handlers, repository implementations, controllers, full routing, EF Core context. Everything. I had to decide whether to roll it back or verify it against my standards and accept it. I chose verification. The architecture held — clean separation, repository pattern matching my `clinical-task-management-api`, JWT consistent with my existing APIs, rate limiting correctly scoped. So I accepted it. But the moment was instructive: Claude will fill every silence you leave it. Constraints aren't optional — they're structural.

**2. The scaffold ran ahead, but the output still had to earn its place.**

When the frontend loaded locally at `localhost:5173` with all five sections rendering, my first instinct was relief. My second instinct was to actually look at what had been built. The hero tagline was *"I build things for the web."* The About section listed Docker as a skill I don't use. The Projects section had "Project One" and "Project Two" as placeholders. The design was basic light-mode Tailwind with no identity. I rejected it. Every section was re-prompted with explicit, personal specifications — typewriter animation on my name, credential pill badges, Space Grotesk headings, cyan and violet accent tokens, animated gradient blobs, a precise first-person bio. The rebuild took additional hours. It was non-negotiable. This portfolio determines professional trajectory. "It rendered" is not the same as "it's ready."

**3. Claude's usage limits taught me to work smarter, not just faster.**

Mid-session "out of messages" pauses are a real part of this workflow. At first they felt like interruptions. Now I treat them as enforced commit checkpoints. The Contact section implementation was cut mid-way by a usage limit — but because I'd been saving and committing throughout, the resumption prompt was clean: *"Review what exists, complete what was started, fill the gaps."* The limit isn't the enemy. Undocumented state is.

---

## What I Learned About Prompting

The prompts that produced exactly what I needed had three things in common: they named the specific layer or component being touched, they referenced an existing pattern from my codebase by name, and they declared a constraint. "Add authentication" produces something generic. "Add JWT bearer authentication using the existing `AuthenticationExtensions` pattern in the Infrastructure layer, do not modify the Domain layer" produces something I can use.

I also learned that pushing back is part of the prompt. When Claude recommended removing JWT and simplifying the clean architecture, I documented my counterarguments, made decisions, and locked them in the README. When Claude's Node v24 troubleshooting suggested downgrading the runtime, I corrected it — Node v24 is current LTS, the package needed updating, not the runtime. Claude's first answer is a starting position, not a verdict.

---

## What I'm Also Building in Parallel

Alongside the project work, I've completed two Anthropic courses this week and I'm currently midway through a third. Moving gradually from the introductory courses toward the more advanced ones, building a foundation in how Anthropic thinks about AI, not just how its tools behave. The distinction matters. Understanding the thinking behind Claude — not just the prompts that make it go — is what I'm investing in for the long run.

---

## What This Means

The `fashion-and-lifestyle-v1` site is live and still being finished. The portfolio is running locally, deployment pending. Both are real projects, not controlled demos — and both have battle logs full of DNS failures, power cuts, package mismatches, and sessions cut short by things outside my control.

That's what AI-assisted development actually looks like in practice: not a clean sequence of prompts and perfect outputs, but a discipline of knowing when to trust the tool, when to push back on it, when to go under the hood, and when to simply document the current state and pick it up again when the lights come back on.

For a backend developer, where the value has always been in the decisions behind the code rather than the typing of it, that discipline is the whole job. Claude accelerates the output. It doesn't replace the judgment.

I'm one week in. There is more to build. The cursor is still blinking.
