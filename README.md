# 🔍 Smart Search

Smart Search is a modern, lightweight, and intuitive search component built with **React + TailwindCSS**.  
It allows users to instantly search through different entity types (people, files, chats, lists) with:

- **Highlighting** of matched terms  
- **Contextual icons** (person, file, folder, chat, list)  
- **Status indicators** (e.g., "Active recently", "Edited 2d ago")  
- **Quick actions** → Copy link or open in new tab  
- **Smart links** → Each result maps to a clean `/search?value=...` URL  

---

## ✨ Features

- 🔎 Search across multiple entity types (people, files, chats, lists)  
- 🎲 Auto-generated demo data (100+ items with random names & statuses)  
- 🖱️ Clickable rows → open result in a new tab  
- 📋 Copy-to-clipboard with toast notification (copies full `https://hostname/...`)  
- 🚫 Stop event bubbling → Copy & New Tab buttons work independently of row click  
- 📱 Responsive design (mobile & desktop)  

---

## 🖼️ Demo Preview

## 🎥 Demo Video

[![Smart Search Demo]](https://www.loom.com/share/1d7dd569fedd4b0f86361c4c65d18ea1?sid=a7322fe0-2cfa-4889-a983-933ad95b7954)

> Click the thumbnail to watch the full demo.


**Row Example (Person):**
- Avatar + Online/Offline indicator  
- Name with highlight  
- Status text  
- Actions → Copy / New Tab  

**Row Example (File):**
- File icon (📄, 🖼️, 🎥, 📁 depending on type)  
- File name with highlight  
- Last edited status  
- Actions → Copy / New Tab  

---

## ⚡ Tech Stack

- [React](https://reactjs.org/) (UI)  
- [TailwindCSS](https://tailwindcss.com/) (styling)  
- [Lucide Icons](https://lucide.dev/) (icons)  
- JavaScript Utilities (random demo data generator)  

---

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/your-username/smart-search.git

cd smart-search

# Install dependencies
npm install

# Start dev server
npm run dev
