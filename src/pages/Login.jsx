import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { HardHat, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (user) return <Navigate to="/projects" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        
        if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

        setIsSubmitting(true);
        try {
            await login(formData.email, formData.password);
            addToast("Welcome back, Site Manager!");
            navigate('/projects');
        } catch (err) {
            addToast(err, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-900">
            
            {/* LEFT SIDE: Branding & Image (Hidden on Mobile, Visible on Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Construction Site" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary-600 p-2 rounded-lg text-white">
                            <HardHat size={32} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">BuildFlow</h1>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Manage your construction sites with precision.</h2>
                    <p className="text-slate-300 text-lg">
                        Streamline daily reports, track safety compliance, and keep your projects on schedule—all in one place.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-900 relative">
                
                {/* Mobile Logo (Only visible on small screens) */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
                    <div className="bg-primary-600 p-1.5 rounded text-white">
                        <HardHat size={20} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-lg">BuildFlow</span>
                </div>

                <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Don't have an account? <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Contact Admin</a>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`mt-1 block w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
                                    </div>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`mt-1 block w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign in <ArrowRight size={16} />
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="mt-6 bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 rounded-lg p-4 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Demo Credentials</p>
                            <p className="text-sm font-mono text-slate-800 dark:text-slate-200">test@test.com / 123456</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;