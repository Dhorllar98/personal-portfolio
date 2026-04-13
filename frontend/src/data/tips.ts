export interface Tip {
  category: string
  tip: string
  code?: string   // optional inline code snippet
}

const tips: Tip[] = [
  {
    category: 'C# • Clean Code',
    tip: 'Prefer records over classes for DTOs. They give you value equality, immutability, and non-destructive mutation with `with` expressions — for free.',
    code: 'public record CreateUserDto(string Name, string Email);',
  },
  {
    category: 'ASP.NET Core • API Design',
    tip: 'Return `ProblemDetails` from your controllers instead of raw strings. It gives clients a consistent, machine-readable error contract across your entire API.',
    code: 'return Problem(detail: "Not found.", statusCode: 404);',
  },
  {
    category: 'Clean Architecture',
    tip: 'Your Application layer should never reference infrastructure. If a handler needs to send an email, it calls an interface — the Infrastructure layer provides the implementation.',
  },
  {
    category: 'TypeScript • Safety',
    tip: 'Use discriminated unions instead of boolean flags. A `status: "loading" | "success" | "error"` is self-documenting and exhaustively checkable. A `isLoading: boolean` is not.',
    code: 'type State = { status: "loading" } | { status: "success"; data: User } | { status: "error"; message: string }',
  },
  {
    category: 'React • Performance',
    tip: '`useMemo` and `useCallback` are not free. Only reach for them when a computation is genuinely expensive or when referential identity matters for a child component\'s props.',
  },
  {
    category: 'C# • Async',
    tip: 'Always pass `CancellationToken` through your async call chain. A cancelled HTTP request that still hits your DB and sends an email is wasteful — and avoidable.',
    code: 'async Task HandleAsync(Command cmd, CancellationToken ct)',
  },
  {
    category: 'EF Core • Performance',
    tip: 'Add `.AsNoTracking()` to read-only queries. When you\'re not updating entities, EF Core\'s change tracker is pure overhead — disabling it can cut query time significantly.',
    code: 'await _db.Users.AsNoTracking().ToListAsync(ct);',
  },
  {
    category: 'TypeScript • Precision',
    tip: 'The `satisfies` operator (TS 4.9+) lets you validate a value against a type without widening it. You keep the narrow type and still get the type check.',
    code: 'const config = { theme: "dark" } satisfies Partial<Config>;',
  },
  {
    category: 'React • Architecture',
    tip: 'Co-locate state as close to where it\'s used as possible. Global state that could live in a component is just hidden coupling — it makes refactors harder and bugs easier.',
  },
  {
    category: 'PostgreSQL • Indexing',
    tip: 'A query that filters on `status` will full-scan your table without an index on that column. For low-cardinality fields, a partial index is even better.',
    code: 'CREATE INDEX idx_posts_published ON "BlogPosts" ("Status") WHERE "Status" = \'published\';',
  },
  {
    category: 'C# • Patterns',
    tip: 'Pattern matching with `switch` expressions makes exhaustive, readable branching possible without the noise of if/else chains. The compiler catches missing cases.',
    code: 'var label = status switch { "published" => "Live", "draft" => "Draft", _ => "Unknown" };',
  },
  {
    category: 'Software Engineering',
    tip: 'The best architecture is the one your team can change confidently. Complexity that prevents safe modification is a liability, not an asset — no matter how elegant it looks.',
  },
]

export function getRandomTip(): Tip {
  return tips[Math.floor(Math.random() * tips.length)]
}

export default tips
