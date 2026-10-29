export interface TimelineEvent {
  id: number;
  date: string;
  location: string;
  title: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "June 15, 2022",
    location: "Sunset Beach, California",
    title: "The Day We Met",
    description: "Description placeholder",
  },
  {
    id: 2,
    date: "August 3, 2022",
    location: "Little Bean Café, Downtown",
    title: "Our First Date",
    description: "Description placeholder",
  },
  {
    id: 3,
    date: "December 24, 2022",
    location: "La Maison Rouge, Paris",
    title: "A Night to Remember",
    description: "Description placeholder",
  },
  {
    id: 4,
    date: "July 20, 2023",
    location: "Hilltop Meadow, Vermont",
    title: "Under the Stars",
    description: "Description placeholder",
  },
  {
    id: 5,
    date: "February 14, 2024",
    location: "Our Favorite Garden",
    title: "Forever Begins",
    description: "Description placeholder",
  },
  {
    id: 6,
    date: "October 12, 2024",
    location: "The Grand Ballroom",
    title: "Our First Dance",
    description: "Description placeholder",
  },
];
