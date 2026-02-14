import timeline1 from "@/assets/timeline-1.jpg";
import timeline2 from "@/assets/timeline-2.jpg";
import timeline3 from "@/assets/timeline-3.jpg";
import timeline4 from "@/assets/timeline-4.jpg";
import timeline5 from "@/assets/timeline-5.jpg";
import timeline6 from "@/assets/timeline-6.jpg";

export interface TimelineEvent {
  id: number;
  date: string;
  location: string;
  title: string;
  description: string;
  image: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "June 15, 2022",
    location: "Sunset Beach, California",
    title: "The Day We Met",
    description:
      "A chance encounter at sunset changed everything. Our eyes met across the golden sand, and in that moment, the world stood still. We talked until the stars came out.",
    image: timeline1,
  },
  {
    id: 2,
    date: "August 3, 2022",
    location: "Little Bean Café, Downtown",
    title: "Our First Date",
    description:
      "Nervous laughter over lattes turned into hours of effortless conversation. The barista had to remind us they were closing. We didn't want the night to end.",
    image: timeline2,
  },
  {
    id: 3,
    date: "December 24, 2022",
    location: "La Maison Rouge, Paris",
    title: "A Night to Remember",
    description:
      "Candlelight, roses, and your smile — that's all I needed. Over a glass of wine, you told me I was your favorite person. I knew then that this was forever.",
    image: timeline3,
  },
  {
    id: 4,
    date: "July 20, 2023",
    location: "Hilltop Meadow, Vermont",
    title: "Under the Stars",
    description:
      "Wrapped in a blanket under the Milky Way, we made wishes on shooting stars. You whispered that your only wish had already come true — you had me.",
    image: timeline4,
  },
  {
    id: 5,
    date: "February 14, 2024",
    location: "Our Favorite Garden",
    title: "Forever Begins",
    description:
      "Among the roses where we shared our first kiss, I asked you to be mine forever. Your tears, your smile, your 'yes' — the most beautiful word I've ever heard.",
    image: timeline5,
  },
  {
    id: 6,
    date: "October 12, 2024",
    location: "The Grand Ballroom",
    title: "Our First Dance",
    description:
      "With golden light all around us, we swayed to our song for the very first time as one. Every step, every glance — a promise written in the rhythm of our hearts.",
    image: timeline6,
  },
];
