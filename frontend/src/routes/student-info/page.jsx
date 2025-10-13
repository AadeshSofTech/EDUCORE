import { useState } from "react";
import { Users, Search, Filter, Plus, Eye, Edit, Trash2, Download } from "lucide-react";
import { Footer } from "@/layouts/footer";

const StudentInfoPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");

    const students = [
        {
            id: 1,
            name: "John Doe",
            admissionNo: "ADM001",
            class: "10A",
            rollNo: "101",
            parentName: "Robert Doe",
            phone: "+91 9876543210",
            email: "john.doe@email.com",
            status: "Active",
            avatar: "👨‍🎓"
        },
        {
            id: 2,
            name: "Jane Smith",
            admissionNo: "ADM002",
            class: "9B",
            rollNo: "102",
            parentName: "Mary Smith",
            phone: "+91 9876543211",
            email: "jane.smith@email.com",
            status: "Active",
            avatar: "👩‍🎓"
        },
        {
            id: 3,
            name: "Mike Johnson",
            admissionNo: "ADM003",
            class: "11A",
            rollNo: "103",
            parentName: "David Johnson",
            phone: "+91 9876543212",
            email: "mike.johnson@email.com",
            status: "Inactive",
            avatar: "👨‍🎓"
        },
    ];

    const stats = [
        { label: "Total Students", value: "156", icon: Users, color: "blue" },
        { label: "Active Students", value: "148", icon: Users, color: "green" },
        { label: "New Admissions", value: "12", icon: Plus, color: "purple" },
        { label: "Graduated", value: "8", icon: Users, color: "orange" },
    ];

    return (
        <div className="flex flex-col gap-y-6 p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Student Information</h1>
                        <p className="text-gray-600 mt-1">Manage student records and information</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-x-2 transition-colors">
                        <Plus size={20} />
                        Add Student
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, admission number, or roll number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="All Classes">All Classes</option>
                        <option value="10A">Class 10A</option>
                        <option value="9B">Class 9B</option>
                        <option value="11A">Class 11A</option>
                    </select>
                    <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center gap-x-2 transition-colors">
                        <Filter size={20} />
                        Filters
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-x-2 transition-colors">
                        <Download size={20} />
                        Export
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                                <stat.icon size={24} className={`text-${stat.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Records</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Admission No</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Roll No</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Parent</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-x-3">
                                            <div className="text-2xl">{student.avatar}</div>
                                            <div>
                                                <p className="font-medium text-gray-900">{student.name}</p>
                                                <p className="text-sm text-gray-600">{student.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-900">{student.admissionNo}</td>
                                    <td className="py-4 px-4 text-gray-900">{student.class}</td>
                                    <td className="py-4 px-4 text-gray-900">{student.rollNo}</td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{student.parentName}</p>
                                            <p className="text-sm text-gray-600">{student.phone}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-900">{student.phone}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 p-1" title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800 p-1" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 p-1" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default StudentInfoPage;
