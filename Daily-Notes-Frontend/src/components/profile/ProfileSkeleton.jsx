function ProfileSkeleton() {
    return (
        <div className="max-w-md mx-auto mt-8">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
                <div className="space-y-4 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-300 rounded w-full mt-6"></div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSkeleton;
