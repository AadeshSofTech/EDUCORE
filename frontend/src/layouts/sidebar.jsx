import { forwardRef, useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { navbarLinks } from "@/constants";
import { cn } from "@/utils/cn";
import { Search, ChevronRight, Home, ChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const { theme } = useTheme();
    const [user, setUser] = useState({ name: "", profilePhoto: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    // Fetch user data
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
                    setUser({
                        name: data.name || "",
                        profilePhoto: data.profilePhoto || "",
                    });
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        fetchUserData();
    }, []);

    // Filter menu items
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

    const isSubActive = (path) => location.pathname === path;

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
            {/* Logo */}
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

            {/* User Info */}
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

            {/* Search */}
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

            {/* Home */}
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
                        {!collapsed && <span>Home</span>}
                    </div>
                    {!collapsed && (
                        <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        />
                    )}
                </NavLink>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 [scrollbar-width:_thin]">
                {filteredNavbarLinks.length > 0 ? (
                    filteredNavbarLinks.map((navbarLink) => (
                        <nav key={navbarLink.title}>
                            {navbarLink.links.map((link) => {
                                // Dropdown Sections
                                if (
                                    [
                                        "Student Info",
                                        "Front Office",
                                        "Fees Collection",
                                        "Income",
                                        "Expense",
                                        "Attendance",
                                        "Academics",
                                        "Examinations",
                                        "Online Exam",
                                        "Online Class",
                                        "Primary Evaluation",
                                        "Question Paper",
                                        "Disciplinary",
                                        "Download Center",
                                        "Lesson Planner",
                                        "H.W. / C.W.",
                                        "Communicate",
                                        "Human Resource",
                                        "Inventory",
                                        "Library",
                                        "Transport",
                                        "Hostel",
                                        "Certificate",
                                        "Consent Letter",
                                        "Student Wallet",
                                        "Bank Info",
                                        "Report",
                                        "Front CMS",
                                        "Subscription",
                                        "System Setting",
                                    ].includes(link.label)
                                ) {
                                    const dropdownKey =
                                        link.label === "Student Info"
                                            ? "student"
                                            : link.label === "Front Office"
                                              ? "front"
                                              : link.label === "Fees Collection"
                                                ? "fees"
                                                : link.label === "Income"
                                                  ? "income"
                                                  : link.label === "Expense"
                                                    ? "expense"
                                                    : link.label === "Attendance"
                                                      ? "attendance"
                                                      : link.label === "Academics"
                                                        ? "academics"
                                                        : link.label === "Examinations"
                                                          ? "examinations"
                                                          : link.label === "Online Exam"
                                                            ? "onlineExam"
                                                            : link.label === "Online Class"
                                                              ? "onlineClass"
                                                              : link.label === "Primary Evaluation"
                                                                ? "primaryEvaluation"
                                                                : link.label === "Question Paper"
                                                                  ? "questionPaper"
                                                                  : link.label === "Disciplinary"
                                                                    ? "disciplinary"
                                                                    : link.label === "Download Center"
                                                                      ? "downloadCenter"
                                                                      : link.label === "Lesson Planner"
                                                                        ? "lessonPlanner"
                                                                        : link.label === "Lesson Planner"
                                                                          ? "lessonPlanner"
                                                                          : link.label === "H.W. / C.W."
                                                                            ? "hwcw"
                                                                            : link.label === "Communicate"
                                                                              ? "communicate"
                                                                              : link.label === "Human Resource"
                                                                                ? "humanResource"
                                                                                : link.label === "Inventory"
                                                                                  ? "inventory"
                                                                                  : link.label === "Library"
                                                                                    ? "library"
                                                                                    : link.label === "Transport"
                                                                                      ? "transport"
                                                                                      : link.label === "Hostel"
                                                                                        ? "hostel"
                                                                                        : link.label === "Certificate"
                                                                                          ? "certificate"
                                                                                          : link.label === "Consent Letter"
                                                                                            ? "consent"
                                                                                            : link.label === "Student Wallet"
                                                                                              ? "studentWallet"
                                                                                              : link.label === "Bank Info"
                                                                                                ? "bankInfo"
                                                                                                : link.label === "Report"
                                                                                                  ? "report"
                                                                                                  : link.label === "Front CMS"
                                                                                                    ? "frontCMS"
                                                                                                    : link.label === "Subscription"
                                                                                                      ? "subscription"
                                                                                                      : link.label === "System Setting"
                                                                                                        ? "systemsettings"
                                                                                                        : null;

                                    const isOpen = openDropdown === dropdownKey;

                                    return (
                                        <div
                                            key={link.label}
                                            className="mb-2"
                                        >
                                            {/* Dropdown Parent */}
                                            <button
                                                onClick={() => setOpenDropdown((prev) => (prev === dropdownKey ? null : dropdownKey))}
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
                                                        className={cn("text-gray-400 transition-transform", isOpen && "rotate-180")}
                                                    />
                                                )}
                                            </button>

                                            {/* Dropdown Items */}
                                            {isOpen && !collapsed && (
                                                <div className="ml-6 mt-2 flex flex-col gap-1">
                                                    {/* 🎓 Student Info */}
                                                    {dropdownKey === "student" && (
                                                        <>
                                                            {[
                                                                { path: "/student-info/admission", name: "Student Admission" },
                                                                { path: "/student-info/online-admission", name: "Online Admission" },
                                                                { path: "/student-info/details", name: "Student Details" },
                                                                { path: "/student-info/category", name: "Student Category" },
                                                                { path: "/student-info/house", name: "House" },
                                                                { path: "/student-info/referral", name: "Student Referral" },
                                                                { path: "/student-info/inactive", name: "Inactive Students" },
                                                                { path: "/student-info/siblings", name: "Link Siblings" },
                                                                { path: "/student-info/update", name: "Student Update" },
                                                                { path: "/student-info/reports", name: "Student Reports" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Front Office */}
                                                    {dropdownKey === "front" && (
                                                        <>
                                                            {[
                                                                { path: "/front-office/admission-enquiry", name: "Admission Enquiry" },
                                                                { path: "/front-office/visitors-book", name: "Visitors Book" },
                                                                { path: "/front-office/postal-dispatch", name: "Postal Dispatch" },
                                                                { path: "/front-office/postal-receive", name: "Postal Receive" },
                                                                { path: "/front-office/complain", name: "Complain" },
                                                                { path: "/front-office/setup", name: "Setup Front Office" },
                                                                { path: "/front-office/gate-pass", name: "Gate Pass" },
                                                                { path: "/front-office/entrance-exam", name: "Entrance Exam Form" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Fees Collection */}
                                                    {dropdownKey === "fees" && (
                                                        <>
                                                            {[
                                                                { path: "/fees/collect-fee", name: "Collect Fee" },
                                                                { path: "/fees/payment-receipt", name: "Payment Receipt" },
                                                                { path: "/fees/online-admission-fee", name: "Online Admission Fee" },
                                                                { path: "/fees/demand-notice", name: "Demand Notice" },
                                                                { path: "/fees/carry-forward", name: "Fees Carry Forward" },
                                                                { path: "/fees/discount", name: "Fee Discount" },
                                                                { path: "/fees/master", name: "Fee Master" },
                                                                { path: "/fees/group", name: "Fees Group" },
                                                                { path: "/fees/types", name: "Fees Types" },
                                                                { path: "/fees/follow-up", name: "Fee Follow Up" },
                                                                { path: "/fees/cheques", name: "Cheques" },
                                                                { path: "/fees/reports", name: "Fees Reports" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 💰 Income */}
                                                    {dropdownKey === "income" && (
                                                        <>
                                                            {[
                                                                { path: "/income/add-income", name: "Add Income" },
                                                                { path: "/income/search-income", name: "Search Income" },
                                                                { path: "/income/income-head", name: "Income Head" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📈 Attendance */}

                                                    {dropdownKey === "attendance" && (
                                                        <>
                                                            {[
                                                                { path: "/attendance/student", name: "Student Attendance" },
                                                                { path: "/attendance/staff", name: "Staff Attendance" },
                                                                { path: "/attendance/attendance-type", name: "Attendance Type" },
                                                                { path: "/attendance/attendance-report", name: "Attendance Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🎓 Academics */}
                                                    {dropdownKey === "academics" && (
                                                        <>
                                                            {[
                                                                { path: "/academics/class-time-table", name: "Class Time Table" },
                                                                { path: "/academics/teacher-timetable", name: "Teacher Timetable" },
                                                                { path: "/academics/daily-time-table", name: "Daily Time Table" },
                                                                { path: "/academics/co-curricular-subject", name: "Co-Curricular Subject" },
                                                                { path: "/academics/subject", name: "Subject" },
                                                                { path: "/academics/assign-subjects", name: "Assign Subjects" },
                                                                { path: "/academics/student-subjects", name: "Student Subjects" },
                                                                { path: "/academics/assign-class-teacher", name: "Assign Class Teacher" },
                                                                { path: "/academics/class", name: "Class" },
                                                                { path: "/academics/section", name: "Section" },
                                                                { path: "/academics/promote-students", name: "Promote Students" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 💸 Expense */}
                                                    {dropdownKey === "expense" && (
                                                        <>
                                                            {[
                                                                { path: "/expense/add-expense", name: "Add Expense" },
                                                                { path: "/expense/search-expense", name: "Search Expense" },
                                                                { path: "/expense/expense-head", name: "Expense Head" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📝 Examinations */}

                                                    {dropdownKey === "examinations" && (
                                                        <>
                                                            {[
                                                                { path: "/examinations/term-list", name: "Term List" },
                                                                { path: "/examinations/exam-list", name: "Exam List" },
                                                                { path: "/examinations/exam-schedule", name: "Exam Schedule" },
                                                                { path: "/examinations/admit-card", name: "Admit Card" },
                                                                { path: "/examinations/marks-register", name: "Marks Register" },
                                                                { path: "/examinations/co-curricular-grade", name: "Co-Curricular Grade" },
                                                                { path: "/examinations/teacher-remark", name: "Teacher Remark" },
                                                                { path: "/examinations/grade-list", name: "Grade List" },
                                                                { path: "/examinations/division", name: "Division" },
                                                                { path: "/examinations/attendance", name: "Attendance" },
                                                                { path: "/examinations/report-card", name: "Report Card" },
                                                                { path: "/examinations/examination-report", name: "Examination Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🧠 Online Exam */}
                                                    {dropdownKey === "onlineExam" && (
                                                        <>
                                                            {[
                                                                { path: "/online-exam/exams", name: "Online Exam" },
                                                                { path: "/online-exam/question-bank", name: "Question Bank" },
                                                                { path: "/online-exam/exam-report", name: "Exam Report" },
                                                                { path: "/online-exam/student-exam-report", name: "Student Exam Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🧑‍💻 Online Class */}

                                                    {dropdownKey === "onlineClass" && (
                                                        <>
                                                            {[
                                                                { path: "/online-class/class", name: "Online Class" },
                                                                { path: "/online-class/teacher-timetable", name: "Online Class Teacher Timetable" },
                                                                { path: "/online-class/attendance-report", name: "Online Class Attendance Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🏫 Primary Evaluation */}

                                                    {dropdownKey === "primaryEvaluation" && (
                                                        <>
                                                            {[
                                                                { path: "/primary-evaluation/activity", name: "Activity" },
                                                                { path: "/primary-evaluation/assessment", name: "Assessment" },
                                                                { path: "/primary-evaluation/evaluation-remark", name: "Evaluation Remark" },
                                                                { path: "/primary-evaluation/primary-class-report", name: "Primary Class Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📝 Question Paper */}
                                                    {dropdownKey === "questionPaper" && (
                                                        <>
                                                            {[
                                                                { path: "/question-paper/type", name: "Type" },
                                                                { path: "/question-paper/question", name: "Question" },
                                                                { path: "/question-paper/generate", name: "Generate" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/*  Disciplinary */}
                                                    {dropdownKey === "disciplinary" && (
                                                        <>
                                                            {[
                                                                { path: "/disciplinary/parameter", name: "Parameter" },
                                                                { path: "/disciplinary/assessment", name: "Assessment" },
                                                                { path: "/disciplinary/report", name: "Disciplinary Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📥 Download Center */}

                                                    {dropdownKey === "downloadCenter" && (
                                                        <>
                                                            {[
                                                                { path: "/download-center/upload-content", name: "Upload Content" },
                                                                { path: "/download-center/assignments", name: "Assignments" },
                                                                { path: "/download-center/study-material", name: "Study Material" },
                                                                { path: "/download-center/syllabus", name: "Syllabus" },
                                                                { path: "/download-center/other-downloads", name: "Other Downloads" },
                                                                { path: "/download-center/videos", name: "Videos" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📘 Lesson Planner */}
                                                    {dropdownKey === "lessonPlanner" && (
                                                        <>
                                                            {[
                                                                { path: "/lesson-planner/lesson", name: "Lesson" },
                                                                { path: "/lesson-planner/topic", name: "Topic" },
                                                                { path: "/lesson-planner/manage", name: "Manage Lesson Planner" },
                                                                { path: "/lesson-planner/lesson-report", name: "Lesson Planner Report" },
                                                                { path: "/lesson-planner/topic-report", name: "Topic Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🧾 H.W. / C.W. */}
                                                    {dropdownKey === "hwcw" && (
                                                        <>
                                                            {[
                                                                { path: "/hw-cw/add-homework", name: "Add Homework" },
                                                                { path: "/hw-cw/add-classwork", name: "Add Classwork" },
                                                                { path: "/hw-cw/evaluation-report-cw", name: "Evaluation Report C.W" },
                                                                { path: "/hw-cw/evaluation-report-hw", name: "Evaluation Report H.W." },
                                                                { path: "/hw-cw/unassigned-report", name: "Unassigned Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📢 Communicate Dropdown */}
                                                    {dropdownKey === "communicate" && (
                                                        <>
                                                            {[
                                                                { path: "/communicate/notice-board", name: "Notice Board" },
                                                                { path: "/communicate/school-diary", name: "School Diary" },
                                                                { path: "/communicate/send-email-sms", name: "Send Email / SMS" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 👥 Human Resource Dropdown */}
                                                    {dropdownKey === "humanResource" && (
                                                        <>
                                                            {[
                                                                { path: "/human-resource/staff-directory", name: "Staff Directory" },
                                                                { path: "/human-resource/recruitment", name: "Recruitment" },
                                                                { path: "/human-resource/staff-attendance", name: "Staff Attendance" },
                                                                { path: "/human-resource/apply-leave", name: "Apply Leave" },
                                                                { path: "/human-resource/approve-leave-request", name: "Approve Leave Request" },
                                                                { path: "/human-resource/leave-type", name: "Leave Type" },
                                                                { path: "/human-resource/leave-balance", name: "Leave Balance" },
                                                                { path: "/human-resource/payroll", name: "Payroll" },
                                                                { path: "/human-resource/staff-advance", name: "Staff Advance" },
                                                                { path: "/human-resource/department", name: "Department" },
                                                                { path: "/human-resource/designation", name: "Designation" },
                                                                { path: "/human-resource/inactive-staff", name: "Inactive Staff" },
                                                                { path: "/human-resource/task", name: "Task" },
                                                                { path: "/human-resource/reports", name: "Human Resource Reports" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📦 Inventory Dropdown */}
                                                    {dropdownKey === "inventory" && (
                                                        <>
                                                            {[
                                                                { path: "/inventory/item-category", name: "Item Category" },
                                                                { path: "/inventory/item-sub-category", name: "Item Sub Category" },
                                                                { path: "/inventory/add-item", name: "Add Item" },
                                                                { path: "/inventory/item-set", name: "Item Set" },
                                                                { path: "/inventory/item-store", name: "Item Store" },
                                                                { path: "/inventory/item-supplier", name: "Item Supplier" },
                                                                { path: "/inventory/add-item-stock", name: "Add Item Stock" },
                                                                { path: "/inventory/sell-item", name: "Sell Item" },
                                                                { path: "/inventory/issue-item", name: "Issue Item" },
                                                                { path: "/inventory/workorder", name: "Workorder" },
                                                                { path: "/inventory/workorder-payment", name: "Workorder Payment" },
                                                                { path: "/inventory/sold-item-payment", name: "Sold Item Payment" },
                                                                { path: "/inventory/inventory-sales-report", name: "Inventory Sales Report" },
                                                                { path: "/inventory/stock-reminder-list", name: "Stock Reminder List" },
                                                                { path: "/inventory/return-item", name: "Return Item" },
                                                                { path: "/inventory/sales-return", name: "Sales Return" },
                                                                { path: "/inventory/estimated-profit-loss", name: "Estimated Profit & Loss" },
                                                                { path: "/inventory/stock-history", name: "Stock History" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📚 Library Dropdown */}
                                                    {dropdownKey === "library" && (
                                                        <>
                                                            {[
                                                                { path: "/library/book-list", name: "Book List" },
                                                                { path: "/library/issue-return", name: "Issue / Return" },
                                                                { path: "/library/add-student", name: "Add Student" },
                                                                { path: "/library/add-staff", name: "Add Staff" },
                                                                { path: "/library/issued-return-report", name: "Issued Return Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🚍 Transport Dropdown */}
                                                    {dropdownKey === "transport" && (
                                                        <>
                                                            {[
                                                                { path: "/transport/route-vehicle", name: "Route & Vehicle" },
                                                                { path: "/transport/bus-stop", name: "Bus Stop" },
                                                                { path: "/transport/assign-transport", name: "Assign Transport" },
                                                                { path: "/transport/change-bus-stop", name: "Change Bus Stop" },
                                                                { path: "/transport/vehicle-management", name: "Vehicle Management" },
                                                                { path: "/transport/vehicle-documents", name: "Vehicle Documents" },
                                                                { path: "/transport/transport-report", name: "Transport Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🏨 Hostel Dropdown */}
                                                    {dropdownKey === "hostel" && (
                                                        <>
                                                            {[
                                                                { path: "/hostel/hostel", name: "Hostel" },
                                                                { path: "/hostel/room-type", name: "Room Type" },
                                                                { path: "/hostel/hostel-rooms", name: "Hostel Rooms" },
                                                                { path: "/hostel/hostel-rooms-assign", name: "Hostel Rooms Assign" },
                                                                { path: "/hostel/change-hostel", name: "Change Hostel" },
                                                                { path: "/hostel/hostel-student-details", name: "Hostel Student Details" },
                                                                { path: "/hostel/hostel-visitors", name: "Hostel Visitors" },
                                                                { path: "/hostel/student-relatives", name: "Student Relatives" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 👨‍🎓 Certification Dropdown */}
                                                    {dropdownKey === "certificate" && (
                                                        <>
                                                            {[
                                                                { path: "/certification/student-certificates", name: "Student Certificates" },
                                                                { path: "/certification/staff-certificates", name: "Staff Certificates" },
                                                                { path: "/certification/student-id-cards", name: "Student ID Cards" },
                                                                { path: "/certification/staff-id-cards", name: "Staff ID Cards" },
                                                                { path: "/certification/id-card-configurations", name: "ID Card Configurations" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📝 Consent Letter Dropdown */}

                                                    {dropdownKey === "consent" && (
                                                        <>
                                                            {[
                                                                { path: "/consent/consent-letter", name: "Consent Letter" },
                                                                { path: "/consent/assign-consent-letter", name: "Assign Consent Letter" },
                                                                { path: "/consent/consent-letter-report", name: "Consent Letter Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 💰 Student Wallet Dropdown */}

                                                    {dropdownKey === "studentWallet" && (
                                                        <>
                                                            {[
                                                                { path: "/student-wallet/wallet", name: "Wallet" },
                                                                { path: "/student-wallet/wallet-history", name: "Wallet History" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🏦 Bank Info Dropdown */}

                                                    {dropdownKey === "bankInfo" && (
                                                        <>
                                                            {[
                                                                { path: "/bank-info/bank", name: "Bank" },
                                                                { path: "/bank-info/account-type", name: "Account Type" },
                                                                { path: "/bank-info/account-list", name: "Account List" },
                                                                { path: "/bank-info/passbook", name: "Passbook" },
                                                                { path: "/bank-info/passbook-report", name: "Passbook Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 📊 Report Dropdown */}

                                                    {dropdownKey === "report" && (
                                                        <>
                                                            {[
                                                                { path: "/report/transaction-report", name: "Transaction Report" },
                                                                { path: "/report/activity-log", name: "Activity Log" },
                                                                { path: "/report/document-availability", name: "Document Availability" },
                                                                { path: "/report/app-login-status", name: "App Login Status" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* 🖥️ Front CMS Dropdown */}

                                                    {dropdownKey === "frontCMS" && (
                                                        <>
                                                            {[
                                                                { path: "/frontcms/events", name: "Events" },
                                                                { path: "/frontcms/gallery", name: "Gallery" },
                                                                { path: "/frontcms/notice", name: "Notice" },
                                                                { path: "/frontcms/media-manager", name: "Media Manager" },
                                                                { path: "/frontcms/pages", name: "Pages" },
                                                                { path: "/frontcms/menus", name: "Menus" },
                                                                { path: "/frontcms/banner-image", name: "Banner Image" },
                                                                { path: "/frontcms/testimonials", name: "Testimonials" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Subscription */}

                                                    {dropdownKey === "subscription" && (
                                                        <>
                                                            {[
                                                                { path: "/subscription/installment-report", name: "Subscription Installment Report" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* System Setting */}

                                                    {dropdownKey === "systemsetting" && (
                                                        <>
                                                            {[
                                                                { path: "/system-setting/custom-columns", name: "Custom Columns" },
                                                                { path: "/system-setting/document-master", name: "Document Master" },
                                                                { path: "/system-setting/session-setting", name: "Session Setting" },
                                                                { path: "/system-setting/school-times", name: "School Times" },
                                                                { path: "/system-setting/referral-setting", name: "Referral Setting" },
                                                                { path: "/system-setting/template-setting", name: "Template Setting" },
                                                                { path: "/system-setting/staff-time-slots", name: "Staff Time Slots" },
                                                                { path: "/system-setting/communication-setting", name: "Communication Setting" },
                                                                { path: "/system-setting/biometric-setup", name: "Biometric Setup" },
                                                                { path: "/system-setting/payment-setting", name: "Payment Setting" },
                                                                { path: "/system-setting/frontcms-setting", name: "Front CMS Setting" },
                                                                { path: "/system-setting/student-delete", name: "Student Delete" },
                                                                { path: "/system-setting/users", name: "Users" },
                                                            ].map((item) => (
                                                                <NavLink
                                                                    key={item.path}
                                                                    to={item.path}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            "submenu-link block rounded-md px-3 py-2 text-sm transition-all",
                                                                            isActive || isSubActive(item.path)
                                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400",
                                                                        )
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Default Links
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
Sidebar.propTypes = { collapsed: PropTypes.bool };
