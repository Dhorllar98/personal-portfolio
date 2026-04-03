import type { BlogPost } from '../../types'

// Add new posts here. The content field is markdown.
// Longer posts can be imported with ?raw from .md files in src/content/blog/.
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-clean-architecture',
    title: 'Why I Use Clean Architecture (Even for Small Projects)',
    date: '2026-04-02',
    excerpt:
      'Clean architecture is often criticised as over-engineering for small apps. Here is why I think the upfront cost pays off even at small scale.',
    tags: ['Architecture', 'C#', 'ASP.NET Core'],
    content: `
# Why I Use Clean Architecture (Even for Small Projects)

Clean architecture is often criticised as over-engineering for small apps.
The four-layer split — Domain, Application, Infrastructure, Api — can feel like a lot of ceremony
when all you need is a contact form and a couple of GET endpoints.

Here is why I think the upfront cost pays off even at small scale.

## The real cost of skipping it

When you skip the layers, you end up with controllers that do everything:
query the database, apply business rules, format responses.
That is fine until the rules change — and they always change.

## What each layer actually does

- **Domain** — your entities and value objects. No dependencies.
- **Application** — your use cases. Depends only on Domain interfaces.
- **Infrastructure** — your EF Core, email clients, file storage. Implements those interfaces.
- **Api** — your controllers. Thin. Delegates to Application.

The payoff is that swapping Supabase for Neon, or adding a CLI runner,
does not touch your business logic.
    `.trim(),
  },
]
