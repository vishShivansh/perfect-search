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

export default function generateDemoData(count = 100) {
  const data = [];

  for (let i = 1; i <= count; i++) {
    const type = getRandom(["person", "files", "chat", "list"]);

    if (type === "person") {
      data.push({
        id: i,
        type: "person",
        name: getRandom(randomNames),
        status: Math.random() > 0.5 ? "Active recently" : "Inactive",
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`,
        link: "#"
      });
    }

    if (type === "files") {
      const subType = getRandom(fileTypes);
      data.push({
        id: i,
        type: subType,
        name: getRandom(fileNames[subType]),
        status: `Edited ${Math.floor(Math.random() * 30)}d ago`,
        link: "#"
      });
    }

    if (type === "chat") {
      data.push({
        id: i,
        type: "chat",
        name: getRandom(chatNames),
        status: `Last message ${Math.floor(Math.random() * 12)}h ago`,
        link: "#"
      });
    }

    if (type === "list") {
      data.push({
        id: i,
        type: "list",
        name: getRandom(listNames),
        status: `${Math.floor(Math.random() * 20) + 1} items • Updated ${Math.floor(Math.random() * 10)}d ago`,
        link: "#"
      });
    }
  }

  return data;
}