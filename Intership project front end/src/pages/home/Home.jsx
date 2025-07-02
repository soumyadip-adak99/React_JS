import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function Home() {
    const { user, fetchUserDetails, loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated()) {
            fetchUserDetails();
        }
    }, [fetchUserDetails, isAuthenticated]);

    const refreshUserData = async () => {
        try {
            await fetchUserDetails();
        } catch (error) {
            console.error("Failed to refresh user data:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Loading user data...</p>
                </div>
            ) : (
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className='bg-red-400'>USER PAGE</div>
                    <h2 className="text-2xl font-bold mb-4">
                        {user?.firstname} {user?.lastname}
                    </h2>

                    <div className="space-y-3 mb-6">
                        <p><span className="font-semibold">Email:</span> {user?.email}</p>
                        <p><span className="font-semibold">Phone:</span> {user?.phone_number}</p>
                        <p>
                            <span className="font-semibold">Role:</span>
                            {user?.roles?.includes("ROLE_ADMIN") ? " Administrator" : " User"}
                        </p>
                    </div>

                    <button
                        onClick={refreshUserData}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Refresh Data
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;