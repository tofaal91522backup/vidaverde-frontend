import { useFetchData } from "@/hooks/use-fetch-data";

export const MY_PACKAGES_QUERY_KEY = "customer-my-packages";

export type MyPackage = {
  id: string;
  name: string;
  classesTotal: number;
  classesUsed: number;
  purchaseDate: string;
  expiryDate: string;
  teacher: string;
  isActive: boolean;
};

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_MY_PACKAGES: MyPackage[] = [
  {
    id: "mp1",
    name: "Regular Pack. 10 Classes",
    classesTotal: 10,
    classesUsed: 3,
    purchaseDate: "2026-06-02",
    expiryDate: "2026-09-02",
    teacher: "María González",
    isActive: true,
  },
  {
    id: "mp2",
    name: "Starter Pack. 5 Classes",
    classesTotal: 5,
    classesUsed: 5,
    purchaseDate: "2026-05-18",
    expiryDate: "2026-07-18",
    teacher: "María González",
    isActive: false,
  },
  {
    id: "mp3",
    name: "Intensive. 20 Classes",
    classesTotal: 20,
    classesUsed: 0,
    purchaseDate: "2026-06-10",
    expiryDate: "2026-10-10",
    teacher: "María González",
    isActive: true,
  },
  {
    id: "mp4",
    name: "Assessment + First Lesson",
    classesTotal: 1,
    classesUsed: 1,
    purchaseDate: "2026-05-10",
    expiryDate: "2026-05-24",
    teacher: "Carlos Rodríguez",
    isActive: false,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useMyPackages() {
  // ✅ REAL API. Uncomment this and remove the demo block below:
  // return useFetchData<MyPackage[]>({
  //   url: "/api/customer/packages/",
  //   querykey: [MY_PACKAGES_QUERY_KEY],
  // });

  return useFetchData<MyPackage[]>({
    url: "/api/customer/packages/",
    querykey: [MY_PACKAGES_QUERY_KEY],
    options: { enabled: false, initialData: MOCK_MY_PACKAGES },
  });
}
