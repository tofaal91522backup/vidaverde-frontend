# Vida Verde Website Project

## Current Status
Phase: Development

# Project Patterns & Conventions

## Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript. Path alias `@/` → `src/`
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix UI)
- **Data Fetching**: TanStack React Query v5
- **Form**: TanStack Form v1 + Zod validation
- **HTTP**: Axios via typed `request` wrapper (`lib/http/request.ts`)
- **Toasts**: Sonner
- **Auth/Session**: `jose` (JWT) in encrypted cookies
- **Table**: TanStack React Table v8

---

## API Call Pattern

| Client | File | When to use |
|--------|------|-------------|
| `apiClient` | `lib/http/api-client.ts` | Client-side authenticated |
| `apiServer` | `lib/http/api-server.ts` | Server-side authenticated (RSC, Server Actions) |
| `publicApiClient` | `lib/http/public-api-client.ts` | Unauthenticated |

- Never call Axios directly. Always use `request.get/post/put/patch/delete/postFormData`
- `apiClient` request interceptor: attaches `Authorization: Bearer <token>` from session
- `apiClient` response interceptor: on 401 → calls `destroySession()` automatically
- Build query strings with `makeEndpoint(baseUrl, paramsObj)`. Skips null/undefined/`""` values automatically

---

## Data Fetching Pattern

- Always use `useFetchData` hook. Never call `useQuery` directly in feature code
- Signature: `useFetchData<T>({ url, querykey, options })`
- Query key convention: `[SCREAMING_SNAKE_CASE_CONSTANT, paramsObject]`
- Define the key constant at the top of the query file: `export const BLOG_DETAILS_QUERY_KEY = "blog-details"`
- Pass the full params object as the second key element so React Query refetches on change

**Query defaults** (`providers/query-provider.tsx`): `staleTime` 60s · `gcTime` 10m · no refetch on focus/reconnect · no retry on 400/401/403/404

---

## Mutation Pattern

- Always use `useMutationHandler`. Never call `useMutation` directly in feature code
- Key options: `mutationFn`, `invalidateKeys` (array of QueryKeys), `successMessage`, `errorMessage`, `showSuccessToast` (default true), `showErrorToast` (default true), `debugLabel` (required), `onSuccess`, `onError`
- Success toast: `toast()` with `icon: "✅"` at `top-center`
- Error toast: `toast.error()` with `icon: "❌"` at `top-center`; message from `error.response?.data?.message` or `errorMessage`
- `invalidateKeys` is busted after every successful mutation

---

## Table Pattern

Every list screen is built the same way. Copy `admin/pages/teachers/` — it uses
all of it.

```tsx
<TableCard
  toolbar={<><TableSearchInput onSearch={setSearch} /><ReusableSelect … /></>}
  footer={<Pagination page={page} total={count} onPageChange={setPage} />}
>
  <DataTable embedded data={rows} columns={teachersColumns} loading error />
</TableCard>
```

- **`<TableCard>`** (`components/shared/table-card.tsx`) wraps filters + table +
  pagination in one card. `toolbar` is the filters, `footer` the pagination.
  Omit `footer` when the endpoint is not paginated. There is also a `meta` slot
  for right-hand text, but **do not put row counts in it** — the pagination
  already says how many there are, and a count beside every filter was noise.
- **`<DataTable embedded>`** inside a TableCard. Without `embedded` you get a
  border inside a border.
- **`<TableSearchInput onSearch>`** for search, never a bare `<Input>`. It
  debounces (400ms default), so typing does not fire a request per keystroke.
  Pass `delay={150}` when the filter is client-side and no request is involved.
- **`<ReusableSelect className="w-40 bg-background">`** for filter selects.
  `bg-background` is needed because the toolbar strip is muted.
- **Add/Create buttons go in the page's `action` prop**, not the toolbar — that
  keeps room for filters. See `admin/pages/teachers/index.tsx`.
- Offer a **Clear** button once any filter is set. Two selects with no reset
  means picking "All" on each to get back.
- Filter state is `useState` in the table component, passed to the query hook's
  params object. Reset `page` to 1 whenever a filter changes.
- `<Pagination page total onPageChange />` — `total` is the item **count**; it
  divides by 10 internally, so the endpoint's `page_size` must be 10.
- Columns live in a separate `[name]-column.tsx` exporting `ColumnDef<T>[]`.

⚠️ **Never pass a fresh array into `<DataTable data>`.** `data={x ?? []}` builds a
new array every render; TanStack rebuilds the row model, sets state, re-renders,
and loops — the page hangs. Pass the query's `data?.results` straight through, or
a `useMemo`'d value. DataTable itself handles `undefined`.

---

---

## File Structure Pattern

```
src/
├── app/                        # Thin wrappers only. Import from features/
│   ├── (auth)/                 # Unauthenticated route group
│   ├── (marketing)/            # Public route group
│   └── (protected)/            # Authenticated route group
│
├── features/                   # All business logic
│   └── [feature]/
│       ├── pages/
│       │   └── [page]/
│       │       ├── actions/    # Server Actions (auth only)
│       │       ├── components/ # Page-specific UI
│       │       ├── queries/    # useFetchData + useMutationHandler hooks
│       │       ├── schemas/    # Zod schemas
│       │       └── index.tsx   # Page entry point
│       ├── types/
│       └── utils/
│
├── components/
│   ├── layout/                 # footer/, navbar/, sidebar/
│   ├── shared/                 # DataTable, DeleteMutation, AsyncStateWrapper, Pagination, form-related/
│   └── ui/                     # shadcn/ui
│
├── hooks/                      # use-fetch-data, use-mutation-handler, use-zod-tanstack-form, use-search, use-debounced-callback
├── lib/http/                   # api-client, api-server, public-api-client, request, make-endpoint
├── providers/                  # app-providers, query-provider, theme-provider
├── types/                      # crud.type, dynamic-route-id-params.type, query.type
├── utils/                      # validate-form, error-handle, form-errors, date-format, get-error-message
└── services/                   # upload-file.service
```

- `app/` page files are single-line wrappers: `import XIndex from "@/features/..."; export default () => <XIndex />;`
- Protected layouts call `getSession()` server-side and pass session into the sidebar component, then wrap children in `<DashboardShell>`

---

## Form Pattern

**Pattern A. TanStack Form + Zod** (use for all API mutation forms):
- `useZodTanstackForm({ defaultValues, schema, mutation, fieldLabels })` returns `{ form, resetAll, submitErrors }`
- Fields use `<form.Field name="x">{(field) => <FormFieldWrapper field={field} label="X">{(p) => <Input {...p.inputProps} />}</FormFieldWrapper>}</form.Field>`
- `p.inputProps` spreads id/name/value/onBlur/onChange/aria-invalid onto the input
- `p.onChangeValue(val)` for non-native inputs (select, checkbox, etc.)
- Show validation errors with `<SubmitErrorSummary errors={submitErrors} />`
- Submit with `<SubmitButton isLoading={mutation.isPending}>`
- Zod schema lives in `schemas/[name].schema.ts`; export both schema and `type X = z.infer<typeof XSchema>`

**Pattern B. Server Actions + `useActionState`** (auth pages only. Signin, forgot-password, reset-password):
- `"use server"` action validates with `validateForm(Schema, formData)`, calls API, creates session, returns `{ success, errors }`
- Form uses `useActionState(MyAction, { errors: {} })` and binds `action={action}`

### Layout of a long form

Anything past a handful of fields is grouped into `<FormSection>` cards. Copy
`admin/pages/blogs/components/blog-form.tsx` or `packages/components/package-form.tsx`.

```tsx
<form className="space-y-5">
  <SubmitErrorSummary errors={submitErrors} />

  <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
    <div className="space-y-5">
      <FormSection title="Content" description="…" icon={FileText}>…</FormSection>
      <FormSection title="Body" …>…</FormSection>
    </div>

    <div className="space-y-5 xl:sticky xl:top-4">
      <FormSection title="Publishing" …>
        … fields …
        <SubmitButton isLoading={mutation.isPending} className="w-full">Save</SubmitButton>
      </FormSection>
      <FormSection title="SEO" …>…</FormSection>
    </div>
  </div>
</form>
```

- **Left column** is the work: names, descriptions, rich text, images.
  **Right column** is settings: status, category, SEO — plus the submit button,
  so reaching Save does not depend on how long the body is.
- `<FormSection title description icon>` (`components/shared/form-related/form-section.tsx`).
  The description is where a backend rule goes, e.g. "Drafts stay hidden from the
  public site."
- ⚠️ **The page must pass `maxWidth="max-w-6xl"` to `<DashboardPageLayout>`** when
  the form uses this two-column layout. Tailwind breakpoints read the **viewport,
  not the container**, so `xl:` fires on a wide screen even inside a narrow
  wrapper and squeezes both columns. Set the width in the page, once — never also
  wrap the form in a `max-w-*` div.
- Single-column forms (a handful of fields) skip the grid and just stack
  `FormSection`s.

### Detail pages

Not a form — a read-only record (`admin/pages/students/student-detail-page.tsx`).
Plain `<Card>` from `components/ui/card`, in this order: an identity card
(avatar, name, status badges, key fields), a row of stat cards, then the related
lists. `<CardAction>` holds a header-right button.

---

---

## Coding Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Files & folders | kebab-case | `use-fetch-data.ts`, `blog-details-table.tsx` |
| Components | PascalCase | `function BlogForm()` |
| Hooks | camelCase, `use` prefix | `useFetchData` |
| Query key constants | SCREAMING_SNAKE_CASE | `BLOG_DETAILS_QUERY_KEY` |
| Types/Interfaces | PascalCase | `type BlogData` |
| Server Actions | PascalCase + `Action` suffix | `SignInAction` |
| Zod schemas | PascalCase + `Schema` suffix | `BlogSchema` |
| Next.js special files | unchanged | `page.tsx`, `layout.tsx`, `loading.tsx` |

- Add `"use client"` to any file using hooks, browser APIs, or event handlers
- Omit `"use client"` on layouts that fetch session or pure server wrappers

---

## When Adding a New Page

1. Create `src/features/[domain]/pages/[page]/` with subfolders: `components/`, `queries/`, `schemas/`
2. Create `queries/use-[resource].ts`. Export a `QUERY_KEY` constant + `useFetchData` hook
3. Create `components/[resource]-column.tsx`. Export `ColumnDef<T>[]` array
4. Create `components/[resource]-table.tsx`. Manage `page`/`search` state, call query hook, render `<DataTable>` + `<Pagination>`
5. Create `index.tsx`. Page entry point, imports the table component
6. Create `app/(protected)/dashboard/.../page.tsx`. Single-line wrapper importing from `features/`
7. Add nav item to `[role]-sidebar-nav-items.ts`

---

## When Adding a New API Call

**GET**: `useFetchData<ResponseType>({ url: makeEndpoint("/path/", params), querykey: [KEY, params] })`

**POST/PUT/PATCH**: `useMutationHandler({ mutationFn: (data) => request.post("/path/", data), invalidateKeys: [[KEY]], successMessage, debugLabel })`

**DELETE**: `useMutationHandler({ mutationFn: () => request.delete("/path/id/"), invalidateKeys: [[KEY]], successMessage, debugLabel })`

**File upload**: use `request.postFormData("/path/", formData)` as the `mutationFn`

**Server Action** (auth only): `validateForm` → call API via `apiServer` → `CreateSession` → return `{ success, errors }`

---

## Session Handoff (Claude Code ↔ Codex)

Two AI tools work on this project. When one runs out of tokens the other picks up
from the same place, so the handoff runs through the filesystem and git rather
than through either tool's conversation history.

**`AGENTS.md` is a symlink to this file**, so both tools read the same conventions
and the two can never drift apart.

### Before starting work — always
1. Run `npm run handoff`. `HANDOFF.md` is only accurate up to the commit that last
   touched it, and the script names any commit that landed after that — work the
   file does not know about, whether from the other tool or from the user
   committing by hand after a session ran out of tokens.
2. If it reports STALE, read those commits before trusting `HANDOFF.md`; the step
   it names as next may already be done or half done.
3. Read `HANDOFF.md` for the current position, then the active plan's Progress Log.

### After finishing a step — always
1. Mark the plan file's Progress Log row ✅ (date, what was done, files touched).
2. Update the "📍 Current position" block in `HANDOFF.md`.
3. Run `npx tsc --noEmit`.
4. Commit as `round2(<section>): step <N> — <what was done>`.
5. Stop and wait for the user's next instruction.

**Never end a session with uncommitted work.** The other tool reads `git log` to
learn what happened, so anything uncommitted is invisible to it. If a step is only
half done, commit it with a `wip:` prefix and say so explicitly in `HANDOFF.md`.
