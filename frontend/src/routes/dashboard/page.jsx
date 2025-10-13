import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

import { useTheme } from "@/hooks/use-theme";

import { dashboardStats, feesCollectionData, upcomingBirthdays } from "@/constants";

import { Footer } from "@/layouts/footer";

import { RefreshCw, Calendar, User, Users, ClipboardList, GraduationCap, Users2, UserCheck, Cake, Menu } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-y-6 p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
            {/* Refresh Dashboard Header */}
            <div className="flex justify-end items-center gap-x-2 mb-4">
                <RefreshCw size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Refresh Dashboard</span>
                <p className="text-xs text-gray-500 ml-4">Updated at 0 mins ago</p>
            </div>

            {/* Dashboard Statistics Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dashboardStats.map((stat) => (
                    <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden hover:shadow-md transition-shadow">
                        {/* Gradient accent based on stat color */}
                        <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-full transform translate-x-8 translate-y-8 opacity-10 ${
                            stat.color === 'blue' ? 'bg-blue-500' :
                            stat.color === 'green' ? 'bg-green-500' :
                            stat.color === 'purple' ? 'bg-purple-500' :
                            stat.color === 'orange' ? 'bg-orange-500' :
                            stat.color === 'indigo' ? 'bg-indigo-500' :
                            'bg-teal-500'
                        }`}></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${
                                    stat.color === 'blue' ? 'bg-blue-100' :
                                    stat.color === 'green' ? 'bg-green-100' :
                                    stat.color === 'purple' ? 'bg-purple-100' :
                                    stat.color === 'orange' ? 'bg-orange-100' :
                                    stat.color === 'indigo' ? 'bg-indigo-100' :
                                    'bg-teal-100'
                                }`}>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                                {stat.badge && (
                                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                        {stat.badge}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                            <p className={`text-3xl font-bold ${
                                stat.color === 'blue' ? 'text-blue-600' :
                                stat.color === 'green' ? 'text-green-600' :
                                stat.color === 'purple' ? 'text-purple-600' :
                                stat.color === 'orange' ? 'text-orange-600' :
                                stat.color === 'indigo' ? 'text-indigo-600' :
                                'text-teal-600'
                            }`}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section with Upcoming Birthdays and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Birthdays */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-x-2">
                                <Cake size={20} className="text-orange-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Upcoming Birthday</h3>
                                <Cake size={16} className="text-orange-500" />
                            </div>
                            <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
                                Upcoming
                            </span>
                        </div>
                        
                        <div className="space-y-4">
                            {upcomingBirthdays.map((birthday) => (
                                <div key={birthday.id} className="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    {birthday.image ? (
                                        <img
                                            src={birthday.image}
                                            alt={birthday.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-gray-600 font-medium">NO IMAGE</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{birthday.name}</p>
                                        <p className="text-sm text-gray-600">{birthday.date}</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                        {birthday.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fees Collection & Expenses Chart */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Fees Collection & Expenses For October 2025</h3>
                            <div className="flex items-center gap-x-4">
                                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors border border-blue-200">
                                    Select
                                </button>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-blue-600" />
                                </div>
                                <Menu size={16} className="text-gray-400" />
                            </div>
                        </div>
                        
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={feesCollectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip 
                                        formatter={(value, name) => [`₹${value.toLocaleString()}`, name === 'fees' ? 'Fees Collection' : 'Expenses']}
                                        labelStyle={{ color: '#374151' }}
                                        contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="fees" fill="#2563eb" name="Fees Collection" />
                                    <Bar dataKey="expenses" fill="#dc2626" name="Expenses" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;