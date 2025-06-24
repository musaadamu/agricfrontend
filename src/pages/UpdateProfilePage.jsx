import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaSave, FaIdCard, FaShieldAlt } from "react-icons/fa";

const UpdateProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    // Form states
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Validation states
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("personal"); // "personal" or "security"

    // Handle error messages from Redux
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Handle successful profile update
    useEffect(() => {
        if (isSubmitted && !loading && !error) {
            toast.success("Profile updated successfully!");
            setIsSubmitted(false);
            setPassword("");
            setConfirmPassword("");
        }
    }, [isSubmitted, loading, error]);

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (password && password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (password && password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Show validation errors
            Object.values(formErrors).forEach(error => {
                toast.error(error);
            });
            return;
        }

        // Prepare update data - only include fields supported by the backend
        const updateData = {
            name,
            email
        };

        // Only include password if it's provided
        if (password) {
            updateData.password = password;
        }

        dispatch(updateUserProfile(updateData));
        setIsSubmitted(true);
    };

    // Get initials for avatar
    const getInitials = () => {
        if (name && name.trim()) {
            const nameParts = name.trim().split(' ');
            if (nameParts.length > 1) {
                return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
            }
            return name.charAt(0).toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || "U";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Page header with breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center hover:text-blue-600 transition-colors"
                        >
                            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Dashboard
                        </button>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-gray-700">Profile Settings</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-gray-600 max-w-3xl">
                        Manage your account information and change your password. Your profile information will be used for identification and communication purposes.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Profile header with avatar */}
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-10 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-tr-full opacity-10"></div>

                        <div className="flex flex-col md:flex-row items-center relative z-10">
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-lg">
                                {getInitials()}
                            </div>
                            <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                                <h2 className="text-2xl font-bold">{name || user?.email}</h2>
                                <div className="flex items-center justify-center md:justify-start mt-2">
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}
                                    </span>
                                    <span className="ml-3 text-blue-100 flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs for Personal and Security */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "personal"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FaIdCard className="inline mr-2" />
                                Personal
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "security"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FaShieldAlt className="inline mr-2" />
                                Security
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 py-6">
                        {activeTab === "personal" && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={`block w-full pl-10 sm:text-sm border rounded-md ${
                                                formErrors.name ? "border-red-500" : "border-gray-300"
                                            } focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    {formErrors.name && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={`block w-full pl-10 sm:text-sm border rounded-md ${
                                                formErrors.email ? "border-red-500" : "border-gray-300"
                                            } focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {formErrors.email && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {activeTab === "security" && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className={`block w-full pl-10 sm:text-sm border rounded-md ${
                                                formErrors.password ? "border-red-500" : "border-gray-300"
                                            } focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Enter new password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {formErrors.password && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            className={`block w-full pl-10 sm:text-sm border rounded-md ${
                                                formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                                            } focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    {formErrors.confirmPassword && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.confirmPassword}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                <FaSave className="mr-2" />
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;
