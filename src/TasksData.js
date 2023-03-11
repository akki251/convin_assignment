import { v4 as uuidv4 } from "uuid";
export const data = [
  {
    id: "1",
    task: "Watch Productivity Video",

    video_url: "https://www.youtube.com/watch?v=7M6bIeVbCqA",
    image_url:
      "https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "2",
    task: "Review Styling",

    video_url: "https://www.youtube.com/watch?v=AerrBBdLlDc",
    image_url:
      "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80",
  },
  {
    id: "3",
    task: "Automate using Scraping",

    video_url: "https://www.youtube.com/watch?v=pwltP0hYb1w",
    image_url:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NyYXBpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    task: "Learn React Query",

    video_url: "https://www.youtube.com/watch?v=novnyCaa7To",
    image_url:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "5",
    task: "Learn React Query",

    video_url: "https://www.youtube.com/watch?v=novnyCaa7To",
    image_url:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "6",
    task: "Top Vs code extensions",

    video_url: "https://www.youtube.com/watch?v=A2g4IwtAX_I",
    image_url:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const firstColumn = [...data.splice(0, 2)];
const secondColumn = [...data.splice(2, 4)];
const thirdColumn = [...data.splice(0, 1)];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: "Priority",
    items: firstColumn,
  },
  [uuidv4()]: {
    title: "Learning",
    items: secondColumn,
  },
  [uuidv4()]: {
    title: "Watch Later",
    items: thirdColumn,
  },
};
