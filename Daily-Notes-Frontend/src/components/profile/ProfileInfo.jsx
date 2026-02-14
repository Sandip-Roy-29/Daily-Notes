import { useAuth } from "../hooks/useAuth";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

const ProfileInfo = () => {
    const { user, loading, error, logout } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-6">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-6">
                No user data available.
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <Card>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Profile Information
                    </h2>

                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                    </div>

                    {user.createdAt && (
                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            variant="danger"
                            onClick={logout}
                            className="w-full"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfileInfo;
