import { useState } from "react";
import { Search, Filter, Grid, List, X } from "lucide-react";
import { Footer } from "@/layouts/footer";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");

    const filters = [
        { id: "all", label: "All", count: 156 },
        { id: "students", label: "Students", count: 89 },
        { id: "staff", label: "Staff", count: 45 },
        { id: "classes", label: "Classes", count: 22 },
    ];

    const searchResults = [
        {
            id: 1,
            type: "Student",
            name: "John Doe",
            details: "Class 10A - Roll No: 101",
            avatar: "👨‍🎓"
        },
        {
            id: 2,
            type: "Staff",
            name: "Jane Smith",
            details: "Mathematics Teacher",
            avatar: "👩‍🏫"
        },
        {
            id: 3,
            type: "Class",
            name: "Class 10A",
            details: "40 students - Room 201",
            avatar: "🏫"
        },
    ];

    return (
        <div className="flex flex-col gap-y-6 p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
            {/* Search Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Menu</h1>
                
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search students, staff, classes, or any content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeFilter === filter.id
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {filter.label} ({filter.count})
                        </button>
                    ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <Filter size={20} className="text-gray-600" />
                        <span className="text-gray-600">Advanced Filters</span>
                    </div>
                    <div className="flex items-center gap-x-2 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-md transition-colors ${
                                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                            }`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-md transition-colors ${
                                viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                            }`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Results</h2>
                
                {searchTerm ? (
                    <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                        {searchResults.map((result) => (
                            <div
                                key={result.id}
                                className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${
                                    viewMode === "list" ? "flex items-center gap-x-4" : ""
                                }`}
                            >
                                <div className="text-3xl mb-2">{result.avatar}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{result.name}</h3>
                                    <p className="text-sm text-gray-600">{result.details}</p>
                                    <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                        {result.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Searching</h3>
                        <p className="text-gray-600">Enter a search term to find students, staff, classes, and more.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchPage;
