import {
  Home,
  UserPlus,
  School,
  GraduationCap,
  FileBarChart,
  ClipboardList,
  CalendarDays,
  Banknote,
  LibraryBig,
  BedDouble,
  Bus,
  FileText,
  Settings,
  Briefcase,
  DollarSign,
  Wallet,
  CreditCard,
  Users,
  BookOpen,
  Monitor,
  Search,
  Video,
  FileCheck,
  BookOpenCheck,
  Scale,
  Download,
  BookMarked,
  MessageSquare,
  UserCog,
  Package,
  Car,
  Home as HomeIcon,
  Award,
  FileSignature,
  Megaphone,
  CreditCard as WalletIcon,
  Building2,
  BarChart3,
  Globe,
  Settings as SystemSettings,
} from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import StudentImage from "@/assets/product-image.jpg"; // <-- Use a school/student image here
import BookImage from "@/assets/profile-image.jpg"; // <-- Use a library/book image here

export const navbarLinks = [
  {
    title: "Main Menu",
    links: [
      {
        label: "Search Menu",
        icon: Search,
        path: "/search",
      },
      {
        label: "Front Office",
        icon: Briefcase,
        path: "/front-office",
      },
      {
        label: "Fees Collection",
        icon: DollarSign,
        path: "/fees-collection",
      },
      {
        label: "Income",
        icon: Wallet,
        path: "/income",
      },
      {
        label: "Expense",
        icon: CreditCard,
        path: "/expense",
      },
      {
        label: "Student Info",
        icon: Users,
        path: "/student-info",
      },
      {
        label: "Attendance",
        icon: CalendarDays,
        path: "/attendance",
      },
      {
        label: "Academics",
        icon: GraduationCap,
        path: "/academics",
      },
      {
        label: "Examinations",
        icon: BookOpen,
        path: "/examinations",
      },
      {
        label: "Online Exam",
        icon: Monitor,
        path: "/online-exam",
      },
      {
        label: "Online Class",
        icon: Video,
        path: "/online-class",
      },
      {
        label: "Primary Evaluation",
        icon: FileCheck,
        path: "/primary-evaluation",
      },
      {
        label: "Question Paper",
        icon: BookOpenCheck,
        path: "/question-paper",
      },
      {
        label: "Disciplinary",
        icon: Scale,
        path: "/disciplinary",
      },
      {
        label: "Download Center",
        icon: Download,
        path: "/download-center",
      },
      {
        label: "Lesson Planner",
        icon: BookMarked,
        path: "/lesson-planner",
      },
      {
        label: "H.W. / C.W.",
        icon: ClipboardList,
        path: "/homework-classwork",
      },
      {
        label: "Communicate",
        icon: MessageSquare,
        path: "/communicate",
      },
      {
        label: "Human Resource",
        icon: UserCog,
        path: "/human-resource",
      },
      {
        label: "Inventory",
        icon: Package,
        path: "/inventory",
      },
      {
        label: "Library",
        icon: LibraryBig,
        path: "/library",
      },
      {
        label: "Transport",
        icon: Car,
        path: "/transport",
      },
      {
        label: "Hostel",
        icon: HomeIcon,
        path: "/hostel",
      },
      {
        label: "Certificate",
        icon: Award,
        path: "/certificate",
      },
      {
        label: "Consent Letter",
        icon: FileSignature,
        path: "/consent-letter",
      },
      {
        label: "Digital Notice Board",
        icon: Megaphone,
        path: "/notice-board",
      },
      {
        label: "Student Wallet",
        icon: WalletIcon,
        path: "/student-wallet",
      },
      {
        label: "Bank Info",
        icon: Building2,
        path: "/bank-info",
      },
      {
        label: "Report",
        icon: BarChart3,
        path: "/report",
      },
      {
        label: "Front CMS",
        icon: Globe,
        path: "/front-cms",
      },
      {
        label: "Subscription",
        icon: CreditCard,
        path: "/subscription",
      },
      {
        label: "System Setting",
        icon: SystemSettings,
        path: "/system-settings",
      },
    ],
  },
];

// Dashboard statistics data
export const dashboardStats = [
  {
    id: 1,
    title: "Student",
    value: "131",
    icon: "👦👧",
    color: "blue",
  },
  {
    id: 2,
    title: "Student Presence",
    value: "0",
    icon: "📅",
    color: "green",
    badge: "Today",
  },
  {
    id: 3,
    title: "Monthly Fees",
    value: "518248",
    icon: "🎓",
    color: "purple",
    badge: "Monthly",
  },
  {
    id: 4,
    title: "Income / Expense",
    value: "0 / 0",
    icon: "📋",
    color: "orange",
  },
  {
    id: 5,
    title: "Staff",
    value: "56",
    icon: "👥",
    color: "indigo",
  },
  {
    id: 6,
    title: "Staff Presence",
    value: "5",
    icon: "👨‍💼",
    color: "teal",
    badge: "Today",
  },
];

// Fees collection & expenses chart data for October 2025
export const feesCollectionData = [
  { name: "Week 1", fees: 85000, expenses: 25000 },
  { name: "Week 2", fees: 92000, expenses: 30000 },
  { name: "Week 3", fees: 88000, expenses: 28000 },
  { name: "Week 4", fees: 95000, expenses: 32000 },
];

// Upcoming birthdays data
export const upcomingBirthdays = [
  {
    id: 1,
    name: "Bhavika Jain",
    date: "12th Oct",
    type: "Student",
    image: null,
  },
  {
    id: 2,
    name: "Driver Test",
    date: "17th Oct",
    type: "Staff",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

// Example: Monthly student admissions for the year
export const overviewData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 135 },
  { name: "Mar", total: 142 },
  { name: "Apr", total: 155 },
  { name: "May", total: 130 },
  { name: "Jun", total: 110 },
  { name: "Jul", total: 125 },
  { name: "Aug", total: 150 },
  { name: "Sep", total: 140 },
  { name: "Oct", total: 160 },
  { name: "Nov", total: 135 },
  { name: "Dec", total: 120 },
];

// Recent fee payments from students
export const recentSalesData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@school.com",
    image: ProfileImage,
    total: 15000, // Fee paid
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@school.com",
    image: ProfileImage,
    total: 20000,
  },
  {
    id: 3,
    name: "Vivaan Patel",
    email: "vivaan.patel@school.com",
    image: ProfileImage,
    total: 18000,
  },
  {
    id: 4,
    name: "Siya Gupta",
    email: "siya.gupta@school.com",
    image: ProfileImage,
    total: 22000,
  },
  {
    id: 5,
    name: "Kabir Verma",
    email: "kabir.verma@school.com",
    image: ProfileImage,
    total: 16000,
  },
  {
    id: 6,
    name: "Anaya Mishra",
    email: "anaya.mishra@school.com",
    image: ProfileImage,
    total: 21000,
  },
  {
    id: 7,
    name: "Ishaan Mehta",
    email: "ishaan.mehta@school.com",
    image: ProfileImage,
    total: 19500,
  },
];

// Top performing students or classes
export const topProducts = [
  {
    number: 1,
    name: "Class 10A",
    image: StudentImage,
    description: "Highest overall academic performance in the school.",
    score: 98.2,
    status: "Active",
    rating: 4.9,
  },
  {
    number: 2,
    name: "Class 12B",
    image: StudentImage,
    description: "Outstanding board results and discipline.",
    score: 97.6,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 3,
    name: "Science Club",
    image: BookImage,
    description: "Winners of the national science fair.",
    score: 96.5,
    status: "Active",
    rating: 4.7,
  },
  {
    number: 4,
    name: "Football Team",
    image: StudentImage,
    description: "Winners of inter-school football championship.",
    score: 95.0,
    status: "Active",
    rating: 4.7,
  },
  {
    number: 5,
    name: "Class 8C",
    image: StudentImage,
    description: "Best attendance and participation in events.",
    score: 94.3,
    status: "Active",
    rating: 4.6,
  },
  {
    number: 6,
    name: "Library",
    image: BookImage,
    description: "Most utilized resource with over 10,000 books.",
    score: 99.1,
    status: "Open",
    rating: 5.0,
  },
  {
    number: 7,
    name: "Art Club",
    image: BookImage,
    description: "Winners of state-level art competition.",
    score: 94.8,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 8,
    name: "Music Band",
    image: StudentImage,
    description: "Winners of school music competition.",
    score: 93.5,
    status: "Active",
    rating: 4.5,
  },
  {
    number: 9,
    name: "Debate Team",
    image: StudentImage,
    description: "Champions of inter-school debate contest.",
    score: 96.0,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 10,
    name: "Class 11D",
    image: StudentImage,
    description: "Excellent project work and discipline.",
    score: 93.9,
    status: "Active",
    rating: 4.6,
  },
];