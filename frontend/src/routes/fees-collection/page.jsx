import { useState } from "react";
import { DollarSign, Search, Filter, Download, Plus, Calendar, User, CreditCard } from "lucide-react";
import { Footer } from "@/layouts/footer";

const FeesCollectionPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("October 2025");

    const feesData = [
        {
            id: 1,
            studentName: "John Doe",
            class: "10A",
            admissionNo: "ADM001",
            totalFees: 25000,
            paidAmount: 25000,
            balanceAmount: 0,
            status: "Paid",
            dueDate: "2025-10-15",
            paymentDate: "2025-10-10"
        },
        {
            id: 2,
            studentName: "Jane Smith",
            class: "9B",
            admissionNo: "ADM002",
            totalFees: 25000,
            paidAmount: 15000,
            balanceAmount: 10000,
            status: "Partial",
            dueDate: "2025-10-15",
            paymentDate: "2025-10-12"
        },
        {
            id: 3,
            studentName: "Mike Johnson",
            class: "11A",
            admissionNo: "ADM003",
            totalFees: 25000,
            paidAmount: 0,
            balanceAmount: 25000,
            status: "Pending",
            dueDate: "2025-10-15",
            paymentDate: null
        },
    ];

    const stats = [
        { label: "Total Fees", value: "₹7,50,000", icon: DollarSign, color: "green" },
        { label: "Collected", value: "₹4,00,000", icon: CreditCard, color: "blue" },
        { label: "Pending", value: "₹3,50,000", icon: Calendar, color: "red" },
        { label: "Students", value: "156", icon: User, color: "purple" },
    ];

    return (
        <div className="flex flex-col gap-y-6 p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Fees Collection</h1>
                        <p className="text-gray-600 mt-1">Manage student fees and payments</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-x-2 transition-colors">
                        <Plus size={20} />
                        Add Payment
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by student name, admission number, or class..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="October 2025">October 2025</option>
                        <option value="September 2025">September 2025</option>
                        <option value="August 2025">August 2025</option>
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

            {/* Fees Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Fees Collection for {selectedMonth}</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Total Fees</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Paid</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Balance</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feesData.map((fee) => (
                                <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{fee.studentName}</p>
                                            <p className="text-sm text-gray-600">{fee.admissionNo}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-900">{fee.class}</td>
                                    <td className="py-4 px-4 text-gray-900">₹{fee.totalFees.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-gray-900">₹{fee.paidAmount.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-gray-900">₹{fee.balanceAmount.toLocaleString()}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            fee.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                            fee.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-900">{fee.dueDate}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View
                                            </button>
                                            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                                Pay
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

export default FeesCollectionPage;
