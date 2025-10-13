import { useParams } from "react-router-dom";
import { Footer } from "@/layouts/footer";

const GenericPage = () => {
    const { section } = useParams();
    
    // Convert kebab-case to Title Case
    const formatTitle = (str) => {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const title = section ? formatTitle(section) : 'Page';

    return (
        <div className="flex flex-col gap-y-6 p-6 bg-gradient-to-br from-blue-50/30 to-white min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {title} Management
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to the {title} section of FrontierLMS
                    </p>
                    
                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                            <div className="text-blue-600 text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Analytics</h3>
                            <p className="text-blue-700">Track and analyze {title.toLowerCase()} data with comprehensive reports.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                            <div className="text-orange-600 text-4xl mb-4">⚙️</div>
                            <h3 className="text-xl font-semibold text-orange-900 mb-2">Management</h3>
                            <p className="text-orange-700">Efficiently manage all aspects of {title.toLowerCase()} operations.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                            <div className="text-green-600 text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-green-900 mb-2">Reports</h3>
                            <p className="text-green-700">Generate detailed reports and insights for better decision making.</p>
                        </div>
                    </div>
                    
                    {/* Coming Soon Notice */}
                    <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <div className="flex items-center justify-center gap-x-2">
                            <div className="text-yellow-600 text-2xl">🚧</div>
                            <div>
                                <h3 className="text-lg font-semibold text-yellow-800">Coming Soon</h3>
                                <p className="text-yellow-700">
                                    This section is under development. Full functionality will be available soon.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default GenericPage;
