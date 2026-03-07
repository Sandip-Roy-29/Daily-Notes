import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import {
  User,
  Mail,
  Calendar,
  Lock,
  Edit2,
  AlertTriangle,
  Palette,
  Info,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const {
    user,
    authLoading,
    UpdateInfo,
    changeUserPassword,
    logout,
    actionLoading,
    removeUser,
  } = useAuth();
  const navigate = useNavigate();

  // Edit Username State
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  // Change Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Delete Account State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Password toggle state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Username Update
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess("");

    if (!newUsername.trim()) {
      setUsernameError("Username cannot be empty");
      return;
    }

    if (newUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }

    if (newUsername === user?.username) {
      setUsernameError("This is already your username");
      return;
    }

    const result = await UpdateInfo(newUsername);
    if (result?.success) {
      setUsernameSuccess("Username updated successfully!");
      setNewUsername("");
      setIsEditingUsername(false);
      setTimeout(() => setUsernameSuccess(""), 3000);
    } else {
      setUsernameError(result?.error || "Failed to update username");
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    const result = await changeUserPassword(
      currentPassword,
      newPassword,
      confirmPassword,
    );
    if (result?.success) {
      setPasswordSuccess("Password changed successfully! Logging out...");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);

      setTimeout(async () => {
        await logout();
        navigate("/auth");
      }, 2000);
    } else {
      setPasswordError(
        result?.error ||
          "Failed to change password. Check your current password.",
      );
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    const result = await removeUser();

    if (result.success) {
      setShowDeleteModal(false);
      setDeleteConfirmText("");
      await logout();
      navigate("/");
    } else {
      alert(result.error || "Failed to delete account");
    }
  };

  // Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  // No User State
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center max-w-md">
          <p className="text-gray-400 mb-4">No user data available.</p>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your profile, security, and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Username */}
            <div className="flex items-start justify-between border-b border-gray-800 pb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={22} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Username</p>
                  {!isEditingUsername ? (
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-white text-lg">
                        {user.username}
                      </p>
                      <button
                        onClick={() => {
                          setIsEditingUsername(true);
                          setNewUsername(user.username);
                          setUsernameError("");
                          setUsernameSuccess("");
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5 transition-colors"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateUsername} className="space-y-3">
                      <input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter new username"
                        className="w-full max-w-xs px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {usernameError && (
                        <p className="text-sm text-red-400">{usernameError}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={actionLoading}
                          loading={actionLoading}
                          className="text-sm px-5 py-2 bg-blue-600 hover:bg-blue-700"
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsEditingUsername(false);
                            setNewUsername("");
                            setUsernameError("");
                          }}
                          className="text-sm px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {usernameSuccess && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                {usernameSuccess}
              </div>
            )}

            {/* Email */}
            <div className="flex items-start gap-4 border-b border-gray-800 pb-6">
              <div className="w-12 h-12 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Mail size={22} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Email</p>
                <p className="font-medium text-white text-lg">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 border border-purple-600/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Calendar size={22} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Member Since</p>
                <p className="font-medium text-white text-lg">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center justify-center">
                <Lock size={22} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Security</h2>
                <p className="text-sm text-gray-500">
                  Keep your account secure
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {!isChangingPassword ? (
              <Button
                onClick={() => {
                  setIsChangingPassword(true);
                  setPasswordError("");
                  setPasswordSuccess("");
                }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
              >
                Change Password
              </Button>
            ) : (
              <form
                onSubmit={handleChangePassword}
                className="space-y-5 max-w-md"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    At least 8 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                    {passwordSuccess}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={actionLoading}
                    loading={actionLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="bg-gray-900 border border-red-900/50 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-red-950/30 border-b border-red-900/50">
            <h2 className="text-xl font-semibold text-red-400 flex items-center gap-2">
              <AlertTriangle size={20} />
              Danger Zone
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-white mb-1">Delete Account</h3>
                <p className="text-sm text-gray-400">
                  Permanently delete your account and all your data. This action
                  cannot be undone.
                </p>
              </div>
              <Button
                onClick={() => setShowDeleteModal(true)}
                className="flex-shrink-0 bg-red-600 hover:bg-red-700 border-none"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-700/50 border border-gray-700 rounded-xl flex items-center justify-center">
                <Info size={22} className="text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  About Daily-Notes
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Version</span>
              <span className="text-white font-medium">1.0.0</span>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
              <Link
                to="/terms"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Terms of Services
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteConfirmText("");
        }}
        title="Delete Account"
      >
        <div className="space-y-5">
          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle size={18} />
              Warning!
            </p>
            <p className="text-sm text-red-300">
              This action <strong>cannot be undone</strong>. This will
              permanently delete your account and all your data.
            </p>
          </div>

          {/* What will be deleted */}
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">
              This will permanently delete:
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Your profile information (username, email)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>All your notes and content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Your account settings and preferences</span>
              </li>
            </ul>
          </div>

          {/* Confirmation input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type <span className="text-red-400 font-bold">DELETE</span> to
              confirm:
            </label>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== "DELETE"}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete My Account
            </Button>
            <Button
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmText("");
              }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
