import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROJECTS } from '../data/constants';
import { 
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  MoreVertical, 
  Filter,
  ArrowRight
} from 'lucide-react';

const ProjectList = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    // Filter Logic
    const filteredProjects = MOCK_PROJECTS.filter(p => {
        const matchesStatus = filter === 'All' || p.status === filter;
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                              p.location.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Calculate Stats for the top bar
    const totalProjects = MOCK_PROJECTS.length;
    const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'Active').length;
    const completedProjects = MOCK_PROJECTS.filter(p => p.status === 'Completed').length;

    // Helper for Status Styling
    const getStatusStyle = (status) => {
        switch(status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
            case 'Completed': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
            case 'On Hold': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
            case 'Delayed': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Project Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage and monitor all construction sites.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-lg shadow-primary-500/30 transition-all font-medium text-sm">
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Total Projects</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalProjects}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Active</p>
                    <p className="text-2xl font-bold text-emerald-600">{activeProjects}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Completed</p>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">{completedProjects}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-semibold">On Hold</p>
                    <p className="text-2xl font-bold text-amber-600">{totalProjects - activeProjects - completedProjects}</p>
                </div>
            </div>

            {/* Controls: Search & Filter */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-t-xl border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search projects by name or location..." 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                {/* Filter Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
                    {['All', 'Active', 'Completed', 'On Hold'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-x border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-xl overflow-hidden">
                
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <div key={project.id} className={`p-6 border-b border-r border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group relative ${index % 3 === 0 ? 'md:border-l-0' : ''}`}>
                            
                            {/* Top Row: Image & Menu */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{project.name}</h3>
                                </div>
                                <div className="flex items-center text-xs text-slate-500 mb-3">
                                    <MapPin size={12} className="mr-1" />
                                    {project.location}
                                </div>
                                
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusStyle(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>

                            {/* Meta Data */}
                            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3">
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(project.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users size={12} />
                                    {Math.floor(Math.random() * 20) + 5} Staff
                                </div>
                            </div>

                            {/* Hover Action Button */}
                            <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button 
                                    onClick={() => navigate(`/dpr/${project.id}`)}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 flex items-center gap-2"
                                >
                                    Open DPR Form <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 py-12 text-center text-slate-500">
                        <p className="text-lg font-medium">No projects found</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;