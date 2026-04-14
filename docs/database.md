# Database Decision
**AI-Assisted Development Program · Phase 1 · Task 01**
**Developer:** Olaniran Oluwadamilola (Dhorllar98)

---

## What Claude Recommended

When asked which database to use for the portfolio backend, Claude recommended **Supabase** as the primary option, with the following reasoning:

- Managed PostgreSQL with a generous free tier (500MB, unlimited API requests)
- Dashboard with a built-in SQL editor and table viewer for direct inspection
- Connection pooling via PgBouncer (both session pooler on port 5432 and transaction pooler on port 6543)
- Compatible with EF Core via the standard Npgsql provider — no special driver needed
- No vendor lock-in: the underlying database is standard PostgreSQL, meaning the connection string is the only thing that changes if migrating to a self-hosted instance

Claude also surfaced Firebase, PlanetScale, Neon, Turso, and Cloudflare D1 as alternatives with their trade-offs noted:
- Firebase: document-based, not ideal for relational data with EF Core
- PlanetScale: MySQL-based, less natural fit for ASP.NET Core + Npgsql
- Neon: solid PostgreSQL alternative with branching, but less mature dashboard
- Cloudflare D1: SQLite-based, designed for Workers, not a good fit for a hosted ASP.NET Core API

---

## My Evaluation

I evaluated the recommendation against three criteria:

1. **EF Core compatibility.** Supabase uses standard PostgreSQL, which has the best-supported EF Core provider (Npgsql). Migration generation, schema management, and query translation all work without workarounds.

2. **Operational simplicity.** The Supabase dashboard allows direct SQL execution and row inspection without needing a separate database client. During debugging sessions, this was directly useful — I ran migration statements manually via the SQL editor when network instability caused EF Core's `MigrateAsync` to timeout.

3. **Connection pooling.** Supabase exposes both a session pooler (port 5432) and a transaction pooler (port 6543). After a production issue where Npgsql keepalive pings were hitting stale connections on the transaction pooler, I switched to port 5432 (session pooler). This is only possible because Supabase gives you explicit control over the connection mode.

---

## Decision

**Chosen: Supabase (PostgreSQL)**

The combination of standard PostgreSQL under the hood, native EF Core compatibility, a usable dashboard, and granular connection pooler control made it the right choice for this stack. The free tier is sufficient for a personal portfolio, and there is no proprietary API surface that would cause migration friction if the project scales.

**Tables in use:**
- `ContactSubmissions` — stores contact form entries (Name, Email, Subject, Message, Status, CreatedAt)
- `BlogPosts` — stores blog content (Title, Slug, Excerpt, Content, Tags, Status, DatePublished, LastSyncedAt)
- `__EFMigrationsHistory` — EF Core migration tracking
