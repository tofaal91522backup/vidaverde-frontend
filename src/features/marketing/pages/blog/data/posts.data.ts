export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readingTime: string;
  body: string[];
};

export const categories = [
  "Spanish Learning Tips",
  "Ecuador Travel",
  "School News",
  "Student Stories",
  "Culture & Language",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-learn-spanish-faster",
    title: "5 Habits That Make You Learn Spanish Twice as Fast",
    excerpt:
      "The students who progress fastest at Vida Verde share a handful of daily habits. Here's what they do differently. And how you can do the same from anywhere.",
    date: "2026-05-15",
    category: "Spanish Learning Tips",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    readingTime: "5 min read",
    body: [
      "After 25 years of teaching, our teachers have noticed that the students who progress fastest are not necessarily the ones who study the most hours. They're the ones who study the most *effectively*.",
      "Here are five habits our top-performing students share:",
      "**1. They speak from day one.** Many learners wait until they feel 'ready' to speak. Our teachers push students to produce Spanish from the very first lesson. Imperfectly, but confidently. Mistakes are data, not failures.",
      "**2. They review with audio, not just text.** Spanish is a spoken language. Students who listen to recordings of native speakers (podcasts, telenovelas, YouTube) alongside their classes build comprehension far faster than those who only read.",
      "**3. They use a notebook for collocations, not words.** Instead of noting 'caminar = to walk', they write 'caminar por el parque'. The word in context. Your brain stores phrases, not isolated vocabulary.",
      "**4. They find a reason that matters.** A student preparing for a job interview in Spanish learns differently from one preparing for a holiday. The clearer your goal, the more purposeful your learning.",
      "**5. They schedule class before everything else.** Your Spanish class should be as fixed in your calendar as a meeting. Students who treat it as optional drift away in weeks. Students who protect the time stay for months.",
      "If you'd like to put these habits into practice with a teacher who knows how to activate them, book your first lesson for $12 and we'll build a plan around your goals.",
    ],
  },
  {
    slug: "ecuador-travel-guide-spanish",
    title: "Ecuador for Travellers: Why Learning Spanish Changes Everything",
    excerpt:
      "Ecuador is one of the most accessible and rewarding destinations in South America. But most travellers only skim the surface. Here's what happens when you go deeper. With Spanish.",
    date: "2026-04-28",
    category: "Ecuador Travel",
    image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&q=80",
    readingTime: "6 min read",
    body: [
      "Ecuador is four worlds in one country: the Andean highlands, the Amazon rainforest, the Pacific coast, and the Galápagos Islands. Most visitors see one, maybe two. The travellers who see all four. And who truly *experience* them. Are almost always the ones who speak at least some Spanish.",
      "Here's why it matters:",
      "**The markets.** Otavalo's indigenous market is one of the most spectacular in South America. Without Spanish, you'll browse. With Spanish, you'll negotiate, hear the stories behind the textiles, and leave with something made for you.",
      "**The food.** Ecuador's cuisine varies dramatically by region. The person who can ask *¿qué lleva esto?* ('what's in this?') and *¿cuál es su favorito?* ('what's your favourite?') eats better than anyone following a guidebook.",
      "**The people.** Ecuadorians are famously warm and hospitable. But that warmth opens up when you meet them in their language. Even a few phrases signal respect and curiosity, and that changes every interaction.",
      "**The prices.** Tourist prices and local prices can differ significantly. Speaking Spanish, even imperfectly, often marks you as someone who knows the country. And that earns you fairer treatment.",
      "Our Travel Spanish programme is designed exactly for this: short-stay classes in Quito or online, focused on the phrases and situations you'll actually encounter. Contact us and we'll put together a custom plan before your trip.",
    ],
  },
  {
    slug: "life-with-ecuadorian-host-family",
    title: "What Life With an Ecuadorian Host Family Is Really Like",
    excerpt:
      "Homestays at Vida Verde are consistently rated the most transformative part of the immersion experience. A student shares what a typical week actually looks like.",
    date: "2026-04-10",
    category: "Student Stories",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    readingTime: "4 min read",
    body: [
      "Vince Murphy arrived in Quito from California not knowing a word of Spanish. Eight weeks later, he was having full conversations with his host family over dinner. This is his story.",
      "'I was honestly nervous about the homestay,' Vince told us. 'I didn't want to be the awkward foreigner who couldn't communicate. But from the first evening, my host mother. Doña Carmen. Made it so easy. She spoke slowly, used gestures, laughed when I got things wrong, and celebrated every small improvement.'",
      "'A typical day looked like this: breakfast at 7:30am with the family. Always fruit, eggs, and incredible coffee. Walk to school. Four hours of class with Ximena, who pushed me harder than I expected but always made it feel achievable. Back home for lunch (the main meal of the day. Doña Carmen's *seco de pollo* is something I still dream about). Afternoon free. Sometimes a cultural activity with the school, sometimes just walking the neighbourhood.'",
      "'In the evening, Doña Carmen's adult children would sometimes come for dinner and the table would explode into rapid Spanish. At first I understood almost nothing. By week four, I was catching jokes.'",
      "'The homestay is where the learning actually happens. The classroom gives you the tools. The family table is where you use them.'",
      "Vida Verde's homestays are available from $26/night and can be added to any programme. All families are personally vetted by our staff.",
    ],
  },
];
