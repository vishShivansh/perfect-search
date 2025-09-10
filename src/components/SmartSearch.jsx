import {
    ExternalLink,
    FileText,
    Image as ImageIcon,
    Link as LinkIcon,
    List,
    Loader2,
    MessageCircle,
    Search,
    Settings,
    User,
    Video
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import generateDemoData from "../data/demo-data";

const demoData = generateDemoData(100);

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("All");
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState(false);
  const settingsRef = useRef(null);
  const [activeSettings, setActiveSettings] = useState({
    Files: true,
    People: true,
    Chats: false,
    Lists: false
  });

  // Handlers
  const toggleSetting = (label) => {
    setActiveSettings(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleInputChange = (e) => setQuery(e.target.value);

  // Effects
  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = demoData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Utilities
  const highlightMatch = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={idx} className="bg-yellow-200 font-semibold">{part}</span>
      ) : part
    );
  };

  const getIcon = (type) => {
    const icons = {
      file: <FileText className="w-4 h-4 text-gray-500" />,
      video: <Video className="w-4 h-4 text-gray-500" />,
      image: <ImageIcon className="w-4 h-4 text-gray-500" />,
      folder: <FileText className="w-4 h-4 text-gray-500" />,
      person: <User className="w-4 h-4 text-gray-500" />,
      chat: <MessageCircle className="w-4 h-4 text-gray-500" />,
      list: <List className="w-4 h-4 text-gray-500" />
    };
    return icons[type] || <FileText className="w-4 h-4 text-gray-500" />;
  };

  // Filtered Results
  const filteredResults = category === "All"
    ? results
    : results.filter(item => {
        if (category === "Files") return ["file", "video", "image", "folder"].includes(item.type);
        if (category === "People") return item.type === "person";
        if (category === "Chats") return item.type === "chat";
        if (category === "Lists") return item.type === "list";
        return false;
      });

  const counts = {
    All: results.length,
    Files: results.filter(r => ["file", "video", "image", "folder"].includes(r.type)).length,
    People: results.filter(r => r.type === "person").length,
    Chats: results.filter(r => r.type === "chat").length,
    Lists: results.filter(r => r.type === "list").length
  };

  const categoryIcons = {
    Files: <FileText className="w-4 h-4 inline-block mr-1" />,
    People: <User className="w-4 h-4 inline-block mr-1" />,
    Chats: <MessageCircle className="w-4 h-4 inline-block mr-1" />,
    Lists: <List className="w-4 h-4 inline-block mr-1" />
  };

  const tabs = ["All", ...Object.keys(activeSettings).filter(key => activeSettings[key])];

  return (
    <div className="relative mx-auto mt-6 transition-all duration-300 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl px-2 sm:px-0">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Search Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 flex-1">
            {loading
              ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 animate-spin" />
              : <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
            <input
              type="text"
              placeholder="Searching is easier"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg text-gray-700 placeholder-gray-400"
              value={query}
              onChange={handleInputChange}
            />
          </div>
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-gray-900 font-medium underline text-xs sm:text-sm cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1 rounded-full">
              <span className="text-xs sm:text-sm font-medium bg-white px-2 py-0.5 rounded-sm shadow border border-gray-200">S</span>
              <span className="text-xs sm:text-sm text-gray-500">quick access</span>
            </div>
          )}
        </div>

        {/* Tabs + Settings */}
        <div className={`transition-all duration-500 ease-in-out ${results.length > 0 || query ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-gray-200 text-sm sm:text-base">
            <div className="flex flex-wrap gap-2 sm:gap-4 px-3 sm:px-4 py-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setCategory(tab)}
                  className={`flex items-center gap-1 sm:gap-2 pb-1 sm:pb-2 ${category === tab ? "font-semibold text-gray-900 border-b-2 border-black" : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-400"}`}
                >
                  {categoryIcons[tab]} {tab}
                  <span className="text-[10px] sm:text-[11px] rounded-sm bg-gray-200 px-1">{counts[tab]}</span>
                </button>
              ))}
            </div>

            {/* Settings Dropdown */}
            <div ref={settingsRef} className="relative px-3 sm:px-4 py-1">
              <button onClick={() => setShowSettings(!showSettings)}>
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 cursor-pointer" />
              </button>

              <div className={`absolute top-10 right-0 sm:right-4 bg-white shadow-xl border border-gray-200 z-50 rounded-md text-sm sm:text-base p-2 w-[90vw] sm:w-40 max-w-sm transition-all duration-500 ease-in-out ${showSettings ? "max-h-60 opacity-100 overflow-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
                {["Files", "People", "Chats", "Lists"].map(label => (
                  <div key={label} className="flex justify-between items-center py-2 cursor-pointer" onClick={() => toggleSetting(label)}>
                    <span className={`flex items-center gap-2 ${activeSettings[label] ? "font-semibold text-gray-700" : "text-gray-400"}`}>
                      {categoryIcons[label]} {label}
                    </span>
                    <button className={`relative inline-flex h-5 w-9 items-center cursor-pointer rounded-full transition ${activeSettings[label] ? "bg-gray-700" : "bg-gray-300"}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${activeSettings[label] ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[53vh] sm:max-h-[50vh] overflow-y-auto no-scrollbar px-2 sm:px-0">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded bg-gray-200 animate-shimmer"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 sm:h-4 w-3/4 rounded bg-gray-200 animate-shimmer"></div>
                      <div className="h-3 sm:h-4 w-1/2 rounded bg-gray-200 animate-shimmer"></div>
                    </div>
                  </div>
                ))
              : filteredResults.length > 0 ? (
                  filteredResults.map(item => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 group cursor-pointer">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {item.type === "person" ? (
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                              <img src={item.avatar} alt={item.name} className="w-full h-full rounded-md object-cover" />
                              <span className={`absolute -bottom-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-white ${item.status === "Active recently" ? "bg-green-500" : "bg-red-500"}`} />
                            </div>
                          ) : (
                            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-md flex items-center justify-center">{getIcon(item.type)}</span>
                          )}

                          <div className="flex flex-col">
                            <div className="text-sm sm:text-base font-medium">{highlightMatch(item.name)}</div>
                            <div className="text-[10px] sm:text-[11px] text-gray-400 font-medium">{item.status}</div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-2 sm:mt-0 opacity-0 group-hover:opacity-100 transition">
                          <button onClick={() => handleCopy(item.link)} title="Copy Link">
                            <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </button>
                          <a href={item.link} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600" />
                          </a>
                        </div>
                      </div>
                      <div className="border-b-2 border-gray-100"></div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 sm:p-4 text-sm sm:text-base text-gray-500 text-center">No results found</div>
                )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 bg-black text-white text-sm sm:text-base px-4 py-2 rounded-lg shadow-lg">
          Link copied!
        </div>
      )}
    </div>
  );
}
