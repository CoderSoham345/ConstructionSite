import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { MOCK_PROJECTS } from '../data/constants';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Save, 
  Send, 
  FileText, 
  Users, 
  CloudSun, 
  CheckCircle2 
} from 'lucide-react';

const DPRForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToast } = useToast();
    
    const project = MOCK_PROJECTS.find(p => p.id === parseInt(id));

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        weather: '',
        supervisor: '',
        workDesc: '',
        workerCount: '',
        equipment: '',
        photos: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (!user) return <Navigate to="/login" replace />;
    if (!project) return <Navigate to="/projects" replace />;

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (formData.photos.length + files.length > 3) {
            addToast("Maximum 3 photos allowed", "error");
            return;
        }
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photos: [...prev.photos, reader.result] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            addToast("Draft saved successfully");
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.weather) newErrors.weather = "Required";
        if (!formData.workDesc) newErrors.workDesc = "Required";
        if (!formData.workerCount) newErrors.workerCount = "Required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            addToast("Please fill in required fields", "error");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            addToast("Report Submitted Successfully!");
            navigate('/projects');
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            {/* Breadcrumb / Header */}
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary-600 flex items-center gap-2 text-sm font-medium transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Progress Report</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Project: <span className="font-semibold text-slate-800 dark:text-slate-200">{project.name}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span>Report ID: DPR-{Date.now().toString().slice(-6)}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: GENERAL INFO */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
                        <FileText size={18} className="text-primary-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">General Information</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Report Date</label>
                            <input 
                                type="date" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.date}
                                onChange={e => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Weather Condition <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select 
                                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-600 outline-none appearance-none ${errors.weather ? 'border-red-500' : 'border-slate-300'}`}
                                    value={formData.weather}
                                    onChange={e => setFormData({...formData, weather: e.target.value})}
                                >
                                    <option value="">Select Weather...</option>
                                    <option value="Sunny">☀️ Sunny</option>
                                    <option value="Cloudy">☁️ Cloudy</option>
                                    <option value="Rainy">🌧️ Rainy</option>
                                    <option value="Stormy">⛈️ Stormy</option>
                                </select>
                                <CloudSun size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            {errors.weather && <p className="text-xs text-red-500 mt-1">{errors.weather}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Site Supervisor</label>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.supervisor}
                                onChange={e => setFormData({...formData, supervisor: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: WORK & RESOURCES */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
                        <Users size={18} className="text-primary-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Workforce & Resources</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Total Workers <span className="text-red-500">*</span></label>
                            <input 
                                type="number" 
                                min="0" 
                                placeholder="0" 
                                className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-600 outline-none ${errors.workerCount ? 'border-red-500' : 'border-slate-300'}`}
                                value={formData.workerCount}
                                onChange={e => setFormData({...formData, workerCount: e.target.value})}
                            />
                            {errors.workerCount && <p className="text-xs text-red-500 mt-1">{errors.workerCount}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Equipment Used</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Excavator, Crane" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.equipment}
                                onChange={e => setFormData({...formData, equipment: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 3: DESCRIPTION */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Work Description</h3>
                    </div>
                    <div className="p-6">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Daily Progress Summary <span className="text-red-500">*</span></label>
                        <textarea 
                            rows="6" 
                            placeholder="Describe tasks completed, materials used, issues encountered, and plan for tomorrow..."
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-600 outline-none resize-none text-sm ${errors.workDesc ? 'border-red-500' : 'border-slate-300'}`}
                            value={formData.workDesc}
                            onChange={e => setFormData({...formData, workDesc: e.target.value})}
                        ></textarea>
                        {errors.workDesc && <p className="text-xs text-red-500 mt-1">{errors.workDesc}</p>}
                    </div>
                </div>

                {/* SECTION 4: PHOTOS */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Upload size={18} className="text-primary-500" />
                            <h3 className="font-semibold text-slate-900 dark:text-white">Site Photos</h3>
                        </div>
                        <span className="text-xs text-slate-500">Max 3 images</span>
                    </div>
                    <div className="p-6">
                        <div className={`border-2 border-dashed ${formData.photos.length >= 3 ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer'} rounded-xl p-8 text-center transition-all`}
                             onClick={() => document.getElementById('photo-upload').click()}>
                            <input 
                                type="file" 
                                id="photo-upload" 
                                className="hidden" 
                                accept="image/*" 
                                multiple 
                                onChange={handleImageUpload} 
                                disabled={formData.photos.length >= 3}
                            />
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-3">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Click to upload photos</p>
                                <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG</p>
                            </div>
                        </div>

                        {/* Image Previews */}
                        {formData.photos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                {formData.photos.map((src, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 group">
                                        <img src={src} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => removePhoto(idx)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER: ACTIONS */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={handleSave} 
                        isLoading={isSaving}
                        className="!w-auto !bg-slate-100 dark:!bg-slate-700 !text-slate-600 dark:!text-slate-300 !border-none"
                    >
                        <Save size={16} className="mr-2" /> Save Draft
                    </Button>
                    <Button 
                        type="submit" 
                        isLoading={isSubmitting}
                        className="!w-auto !bg-primary-600 hover:!bg-primary-700"
                    >
                        <Send size={16} className="mr-2" /> Submit Report
                    </Button>
                </div>
            </form>
        </div>
    );
};

// Reusable Button Component for this file to avoid import errors if not global
const Button = ({ children, onClick, variant = "primary", className = "", type = "button", isLoading = false, ...props }) => {
    const baseStyle = "w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/30",
        secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white",
    };
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyle} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 'Saving...' : children}
        </button>
    );
};

export default DPRForm;