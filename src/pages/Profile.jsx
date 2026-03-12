import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { 
  User, 
  Mail, 
  Shield, 
  Save, 
  Camera, 
  Lock, 
  Bell,
  Sun,
  Moon
} from 'lucide-react';

const Profile = () => {
    const { user, logout, isDark, toggleTheme } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    // Local state for the form
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            addToast("Profile updated successfully!");
        }, 1000);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        addToast("Password changed successfully!", "success");
        setFormData({ ...formData, currentPassword: '', newPassword: '' });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your profile information and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden text-center">
                        <div className="h-24 bg-gradient-to-r from-primary-500 to-orange-400"></div>
                        
                        <div className="px-6 pb-6 relative">
                            {/* Avatar */}
                            <div className="relative w-24 h-24 mx-auto -mt-12 mb-4">
                                <div className="w-full h-full rounded-full bg-slate-200 border-4 border-white dark:border-slate-800 flex items-center justify-center text-3xl font-bold text-slate-500 dark:text-slate-300 overflow-hidden">
                                    {user?.name.charAt(0)}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 hover:bg-primary-700 transition-colors">
                                    <Camera size={14} />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
                            <p className="text-sm text-slate-500 mb-6">{user?.email}</p>

                            <div className="flex justify-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800">
                                    <Shield size={12} className="inline mr-1" /> Admin
                                </span>
                            </div>

                            <div className="space-y-3">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="w-full py-2 px-4 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
                                >
                                    Back to Dashboard
                                </button>
                                <button 
                                    onClick={logout}
                                    className="w-full py-2 px-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-sm font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Settings Forms */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Edit Profile Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <User size={18} className="text-primary-500" /> Profile Information
                            </h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none opacity-75 cursor-not-allowed"
                                            disabled
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Contact admin to change email.</p>
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-70"
                                    >
                                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Security Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Lock size={18} className="text-primary-500" /> Security
                            </h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Password</label>
                                    <input 
                                        type="password" 
                                        value={formData.currentPassword}
                                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
                                    <input 
                                        type="password" 
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button 
                                        type="submit" 
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Bell size={18} className="text-primary-500" /> Preferences
                            </h3>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                                <p className="text-sm text-slate-500">Adjust the appearance of the application.</p>
                            </div>
                            <button 
                                onClick={toggleTheme}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isDark ? 'bg-primary-600' : 'bg-slate-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`}>
                                    {isDark ? <Moon size={10} className="m-1 text-primary-600" /> : <Sun size={10} className="m-1 text-amber-500" />}
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
