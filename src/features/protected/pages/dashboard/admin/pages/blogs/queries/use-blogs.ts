import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const BLOGS_QUERY_KEY = "admin-blogs";
export const BLOG_DETAILS_QUERY_KEY = "admin-blog-details";

export type Blog = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
};

type BlogsResponse = { results: Blog[]; count: number };
type BlogParams = { page?: number; search?: string; status?: string; category?: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_BLOGS: Blog[] = [
  {
    id: "bl1",
    title: "10 Essential Spanish Phrases for Travellers in Ecuador",
    excerpt: "Planning a trip to Ecuador? These 10 phrases will help you navigate markets, hail taxis, and make friends with locals.",
    content: "<p>Ecuador is a country of incredible diversity...</p>",
    image: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Travel",
    status: "published",
    publishedAt: "2026-05-20T10:00:00Z",
    createdAt: "2026-05-18T09:00:00Z",
  },
  {
    id: "bl2",
    title: "How to Use the Subjunctive in Spanish (Without Going Crazy)",
    excerpt: "The subjunctive mood confuses most learners. Here's a practical guide that finally makes it click.",
    content: "<p>If there's one thing that trips up intermediate students...</p>",
    image: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Grammar",
    status: "published",
    publishedAt: "2026-05-28T08:00:00Z",
    createdAt: "2026-05-26T11:00:00Z",
  },
  {
    id: "bl3",
    title: "From Zero to Conversational in 6 Months: Sarah's Story",
    excerpt: "Sarah from Canada joined Vida Verde with no Spanish at all. Six months later she ordered coffee in Quito without a second thought.",
    content: "<p>\"I was terrified to even say hola,\" Sarah admits...</p>",
    image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Student Stories",
    status: "published",
    publishedAt: "2026-06-02T07:00:00Z",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "bl4",
    title: "Spanish for Business: Key Vocabulary for Meetings and Negotiations",
    excerpt: "Whether you're closing a deal in Bogotá or managing a team in Mexico City, these business Spanish terms will keep you sharp.",
    content: "<p>Professional Spanish has its own rhythms...</p>",
    image: "",
    category: "Language Tips",
    status: "draft",
    createdAt: "2026-06-08T14:00:00Z",
  },
  {
    id: "bl5",
    title: "Why Ecuadorian Spanish Is the Best Spanish to Learn First",
    excerpt: "Ecuadorian Spanish is clear, neutral, and respected across Latin America. Here's why it's a great starting point.",
    content: "<p>Ask any language learner which Spanish accent is easiest...</p>",
    image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Culture",
    status: "draft",
    createdAt: "2026-06-10T09:30:00Z",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useBlogs(params: BlogParams) {
  // ✅ REAL API. Uncomment this and remove the demo block below:
  // return useFetchData<BlogsResponse>({
  //   url: makeEndpoint("/api/blogs/", params),
  //   querykey: [BLOGS_QUERY_KEY, params],
  // });

  let filtered = MOCK_BLOGS;
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((b) => b.title.toLowerCase().includes(q));
  }
  if (params.status) filtered = filtered.filter((b) => b.status === params.status);
  if (params.category) filtered = filtered.filter((b) => b.category === params.category);

  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<BlogsResponse>({
    url: makeEndpoint("/api/blogs/", params),
    querykey: [BLOGS_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}

export function useBlogDetails(id: string) {
  // ✅ REAL API. Uncomment this and remove the demo block below:
  // return useFetchData<Blog>({
  //   url: `/api/blogs/${id}/`,
  //   querykey: [BLOG_DETAILS_QUERY_KEY, id],
  //   options: { enabled: !!id },
  // });

  const found = MOCK_BLOGS.find((b) => b.id === id);
  return useFetchData<Blog>({
    url: `/api/blogs/${id}/`,
    querykey: [BLOG_DETAILS_QUERY_KEY, id],
    options: { enabled: false, initialData: found },
  });
}

export function useCreateBlog() {
  // ✅ REAL API. Swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.post("/api/blogs/", data),
  // invalidateKeys: [[BLOGS_QUERY_KEY]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Blog post created!",
    debugLabel: "CreateBlog",
  });
}

export function useUpdateBlog(_id: string) {
  // ✅ REAL API. Swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.put(`/api/blogs/${_id}/`, data),
  // invalidateKeys: [[BLOGS_QUERY_KEY], [BLOG_DETAILS_QUERY_KEY, _id]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Blog post updated!",
    debugLabel: "UpdateBlog",
  });
}

export function useToggleBlogStatus() {
  // ✅ REAL API. Swap mutationFn and restore invalidateKeys:
  // mutationFn: ({ id, status }) => request.patch(`/api/blogs/${id}/`, { status }),
  // invalidateKeys: [[BLOGS_QUERY_KEY]],
  return useMutationHandler<any, { id: string; status: "draft" | "published" }>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Blog status updated!",
    debugLabel: "ToggleBlogStatus",
  });
}
