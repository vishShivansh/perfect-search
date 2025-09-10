// -------------------- Demo Data Utilities --------------------

const randomNames = [
  "Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince",
  "Ethan Hunt", "Fiona Gallagher", "George Clooney", "Hannah Lee",
  "Ivy Adams", "Jack Sparrow", "Katherine Blake", "Liam Carter"
];

const fileTypes = ["file", "image", "video", "folder"];
const fileNames = {
  file: ["report.docx", "invoice.pdf", "notes.txt", "resume.docx"],
  image: ["design.png", "mockup.jpg", "screenshot.webp", "banner.png"],
  video: ["intro.mp4", "tutorial.mov", "demo.avi", "reel.mp4"],
  folder: ["Project Alpha", "Designs", "Backups", "Resources"]
};

const chatNames = [
  "Team Standup", "Project Kickoff", "Design Review",
  "Client Feedback", "Weekend Plans", "Marketing Sync"
];

const listNames = [
  "To-do List", "Shopping List", "Reading List",
  "Bug Fixes", "Feature Requests", "Wishlist"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to make a link-friendly value (slug)
const makeLink = (name) => {
  return `/search?value=${encodeURIComponent(name)}`;
};

export default function generateDemoData(count = 100) {
  const data = [];

  for (let i = 1; i <= count; i++) {
    const type = getRandom(["person", "files", "chat", "list"]);

    if (type === "person") {
      const name = getRandom(randomNames);
      data.push({
        id: i,
        type: "person",
        name,
        status: Math.random() > 0.5 ? "Active recently" : "Inactive",
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`,
        link: makeLink(name)
      });
    }

    if (type === "files") {
      const subType = getRandom(fileTypes);
      const name = getRandom(fileNames[subType]);
      data.push({
        id: i,
        type: subType,
        name,
        status: `Edited ${Math.floor(Math.random() * 30)}d ago`,
        link: makeLink(name)
      });
    }

    if (type === "chat") {
      const name = getRandom(chatNames);
      data.push({
        id: i,
        type: "chat",
        name,
        status: `Last message ${Math.floor(Math.random() * 12)}h ago`,
        link: makeLink(name)
      });
    }

    if (type === "list") {
      const name = getRandom(listNames);
      data.push({
        id: i,
        type: "list",
        name,
        status: `${Math.floor(Math.random() * 20) + 1} items • Updated ${Math.floor(Math.random() * 10)}d ago`,
        link: makeLink(name)
      });
    }
  }

  return data;
}
