# Vida Verde Website Project

## Project Documents
./docs/homePage.md
./docs/VidaVerde_DevPlan_Phase1_v1.md
./docs/website-spec-v2.md

## How to use these docs
- `homePage.md` = Homepage 
- `VidaVerde_DevPlan_Phase1_v1.md` = Dev plan for Phase 1; it's an overview of Phase 1 with content that may also be in website-spec-v2.md
- `website-spec-v2.md` = Detailed spec for each page/section

## Current Status
Phase: Development

# Project Patterns & Conventions

## Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript — path alias `@/` → `src/`
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

- Never call Axios directly — always use `request.get/post/put/patch/delete/postFormData`
- `apiClient` request interceptor: attaches `Authorization: Bearer <token>` from session
- `apiClient` response interceptor: on 401 → calls `destroySession()` automatically
- Build query strings with `makeEndpoint(baseUrl, paramsObj)` — skips null/undefined/`""` values automatically

---

## Data Fetching Pattern

- Always use `useFetchData` hook — never call `useQuery` directly in feature code
- Signature: `useFetchData<T>({ url, querykey, options })`
- Query key convention: `[SCREAMING_SNAKE_CASE_CONSTANT, paramsObject]`
- Define the key constant at the top of the query file: `export const BLOG_DETAILS_QUERY_KEY = "blog-details"`
- Pass the full params object as the second key element so React Query refetches on change

**Query defaults** (`providers/query-provider.tsx`): `staleTime` 60s · `gcTime` 10m · no refetch on focus/reconnect · no retry on 400/401/403/404

---

## Mutation Pattern

- Always use `useMutationHandler` — never call `useMutation` directly in feature code
- Key options: `mutationFn`, `invalidateKeys` (array of QueryKeys), `successMessage`, `errorMessage`, `showSuccessToast` (default true), `showErrorToast` (default true), `debugLabel` (required), `onSuccess`, `onError`
- Success toast: `toast()` with `icon: "✅"` at `top-center`
- Error toast: `toast.error()` with `icon: "❌"` at `top-center`; message from `error.response?.data?.message` or `errorMessage`
- `invalidateKeys` is busted after every successful mutation

---

## Table Pattern

- Library: TanStack React Table v8 via shared `<DataTable>` component
- Columns defined as `ColumnDef<T>[]` in a separate `[name]-column.tsx` file
- `<DataTable data columns loading error />` — loading shows spinner, error shows message
- `<Pagination page total onPageChange />` — `total` is item count (divided by 10 internally)
- Search/filter state lives in the table component as `useState`; passed into the query hook's params object

---

## File Structure Pattern

```
src/
├── app/                        # Thin wrappers only — import from features/
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

**Pattern A — TanStack Form + Zod** (use for all API mutation forms):
- `useZodTanstackForm({ defaultValues, schema, mutation, fieldLabels })` returns `{ form, resetAll, submitErrors }`
- Fields use `<form.Field name="x">{(field) => <FormFieldWrapper field={field} label="X">{(p) => <Input {...p.inputProps} />}</FormFieldWrapper>}</form.Field>`
- `p.inputProps` spreads id/name/value/onBlur/onChange/aria-invalid onto the input
- `p.onChangeValue(val)` for non-native inputs (select, checkbox, etc.)
- Show validation errors with `<SubmitErrorSummary errors={submitErrors} />`
- Submit with `<SubmitButton isLoading={mutation.isPending}>`
- Zod schema lives in `schemas/[name].schema.ts`; export both schema and `type X = z.infer<typeof XSchema>`

**Pattern B — Server Actions + `useActionState`** (auth pages only — signin, forgot-password, reset-password):
- `"use server"` action validates with `validateForm(Schema, formData)`, calls API, creates session, returns `{ success, errors }`
- Form uses `useActionState(MyAction, { errors: {} })` and binds `action={action}`

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
2. Create `queries/use-[resource].ts` — export a `QUERY_KEY` constant + `useFetchData` hook
3. Create `components/[resource]-column.tsx` — export `ColumnDef<T>[]` array
4. Create `components/[resource]-table.tsx` — manage `page`/`search` state, call query hook, render `<DataTable>` + `<Pagination>`
5. Create `index.tsx` — page entry point, imports the table component
6. Create `app/(protected)/dashboard/.../page.tsx` — single-line wrapper importing from `features/`
7. Add nav item to `[role]-sidebar-nav-items.ts`

---

## When Adding a New API Call

**GET**: `useFetchData<ResponseType>({ url: makeEndpoint("/path/", params), querykey: [KEY, params] })`

**POST/PUT/PATCH**: `useMutationHandler({ mutationFn: (data) => request.post("/path/", data), invalidateKeys: [[KEY]], successMessage, debugLabel })`

**DELETE**: `useMutationHandler({ mutationFn: () => request.delete("/path/id/"), invalidateKeys: [[KEY]], successMessage, debugLabel })`

**File upload**: use `request.postFormData("/path/", formData)` as the `mutationFn`

**Server Action** (auth only): `validateForm` → call API via `apiServer` → `CreateSession` → return `{ success, errors }`
