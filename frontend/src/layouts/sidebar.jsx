import { forwardRef, useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { navbarLinks } from "@/constants";
import { cn } from "@/utils/cn";
import { Search, ChevronRight, Home, ChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const { theme } = useTheme();
    const [user, setUser] = useState({ name: "", profilePhoto: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false); // 👈 for Front Office dropdown

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const response = await fetch("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser({ name: data.name || "", profilePhoto: data.profilePhoto || "" });
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        fetchUserData();
    }, []);

    // 🧠 Filter menu items based on search
    const filteredNavbarLinks = useMemo(() => {
        if (!searchTerm.trim()) return navbarLinks;

        const lowerSearch = searchTerm.toLowerCase();

        return navbarLinks
            .map((group) => ({
                ...group,
                links: group.links.filter((link) => link.label.toLowerCase().includes(lowerSearch)),
            }))
            .filter((group) => group.links.length > 0);
    }, [searchTerm]);

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full flex-col overflow-x-hidden border-r [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1)]",
                "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[280px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-x-3 border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-orange-500">
                    <span className="text-lg font-bold text-white">F</span>
                </div>
                {!collapsed && (
                    <div className="text-gray-900 dark:text-gray-100">
                        <p className="text-lg font-bold">
                            <span className="text-blue-600">Frontier</span>
                            <span className="text-orange-500">LMS</span>
                        </p>
                    </div>
                )}
            </div>

            {/* User Info Section */}
            {!collapsed && (
                <div className="flex flex-col items-center rounded-b-[1.5rem] border-b border-blue-400 bg-blue-400 p-5 text-white shadow-md dark:bg-blue-800">
                    {user.profilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="h-16 w-16 rounded-full border-4 border-white/30 object-cover"
                        />
                    ) : (
                        <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-orange-400">
                            <span className="text-lg font-bold text-white">{user.name ? user.name[0]?.toUpperCase() : "U"}</span>
                        </div>
                    )}

                    <div className="mt-3 text-center">
                        <span className="block text-lg font-semibold text-white">{user.name || "User"}</span>
                        <span className="text-sm opacity-80">Admin</span>
                    </div>
                </div>
            )}

            {/* Search Menu Section */}
            {!collapsed && (
                <div className="border-b border-gray-200 bg-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/70">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search Menu"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                    </div>
                </div>
            )}

            {/* Home Shortcut */}
            <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        cn(
                            "group flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                            isActive
                                ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                : "border-transparent text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800",
                            collapsed && "md:w-[45px] md:justify-center",
                        )
                    }
                >
                    <div className="flex items-center gap-x-3">
                        <Home
                            size={20}
                            className="flex-shrink-0 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                        />
                        {!collapsed && <span className="whitespace-nowrap">Home</span>}
                    </div>
                    {!collapsed && (
                        <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        />
                    )}
                </NavLink>
            </div>

            {/* Filtered Navigation Menu */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 [scrollbar-width:_thin]">
                {filteredNavbarLinks.length > 0 ? (
                    filteredNavbarLinks.map((navbarLink) => (
                        <nav
                            key={navbarLink.title}
                            className={cn("sidebar-group", collapsed && "md:items-center")}
                        >
                            {navbarLink.links.map((link) => {
                                // 👇 Detect "Front Office" to apply dropdown
                                if (link.label === "Front Office") {
                                    return (
                                        <div
                                            key={link.label}
                                            className="mb-2"
                                        >
                                            <button
                                                onClick={() => setOpenDropdown((prev) => !prev)}
                                                className={cn(
                                                    "group flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                                                    "border-transparent text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800",
                                                )}
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <link.icon
                                                        size={20}
                                                        className="text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                                                    />
                                                    {!collapsed && <span>{link.label}</span>}
                                                </div>
                                                {!collapsed && (
                                                    <ChevronDown
                                                        size={16}
                                                        className={cn("text-gray-400 transition-transform", openDropdown && "rotate-180")}
                                                    />
                                                )}
                                            </button>

                                            {/* Dropdown items */}
                                            {openDropdown && !collapsed && (
                                                <div className="ml-6 mt-2 flex flex-col gap-1">
                                                    <NavLink
                                                        to="/front-office/admission-enquiry"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Admission Enquiry
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/visitors-book"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Visitors Book
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/postal-dispatch"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Postal Dispatch
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/postal-receive"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Postal Receive
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/complain"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Complain
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/setup"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Setup Front Office
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/gate-pass"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Gate Pass
                                                    </NavLink>
                                                    <NavLink
                                                        to="/front-office/entrance-exam"
                                                        className="rounded-md px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                                                    >
                                                        Entrance Exam Form
                                                    </NavLink>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Default link (for other menus)
                                return (
                                    <NavLink
                                        key={link.label}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            cn(
                                                "group flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                                                isActive
                                                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                                    : "border-transparent text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800",
                                                collapsed && "md:w-[45px] md:justify-center",
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-x-3">
                                            <link.icon
                                                size={20}
                                                className="flex-shrink-0 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                                            />
                                            {!collapsed && <span className="whitespace-nowrap">{link.label}</span>}
                                        </div>
                                        {!collapsed && (
                                            <ChevronRight
                                                size={16}
                                                className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                            />
                                        )}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    ))
                ) : (
                    <p className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">No matching menu found</p>
                )}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
