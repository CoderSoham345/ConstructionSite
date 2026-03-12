import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HardHat, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Sun, 
  CloudRain, 
  CheckCircle 
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    // Realistic Data Mockup
    const stats = [
        { title: "Active Sites", value: "12", change: "+2 this week", icon: HardHat, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20" },
        { title: "Safety Days", value: "148", change: "No incidents", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/20" },
        { title: "Budget Utilized", value: "64%", change: "On track", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" },
        { title: "Pending Approvals", value: "5", change: "Action required", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
    ];

    const projects = [
        { 
            id: 1, 
            name: "Skyline Tower Renovation", 
            location: "Downtown, NY", 
            progress: 75, 
            status: "Active", 
            team: 12, 
            weather: "Sunny",
            delay: 0
        },
        { 
            id: 2, 
            name: "Highway 101 Bridge Repair", 
            location: "San Francisco, CA", 
            progress: 30, 
            status: "Delayed", 
            team: 24, 
            weather: "Rainy",
            delay: 5 
        },
        { 
            id: 3, 
            name: "Metro Line Extension", 
            location: "Chicago, IL", 
            progress: 92, 
            status: "Final Stage", 
            team: 45, 
            weather: "Cloudy",
            delay: 0
        },
    ];

    const recentActivity = [
        { id: 1, text: "DPR Submitted for Skyline Tower", time: "10 mins ago", type: "report" },
        { id: 2, text: "Steel delivery arrived at Site B", time: "2 hours ago", type: "logistics" },
        { id: 3, text: "Safety inspection passed: Metro Line", time: "5 hours ago", type: "safety" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 fade-in max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Site Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                        <Calendar size={14} /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                
                {/* Weather Widget */}
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Sun className="text-amber-500" size={24} />
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">24°C / Clear</p>
                        <p className="text-xs text-slate-500">Good working conditions</p>
                    </div>
                </div>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <TrendingUp size={16} className="text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Main Content: Projects & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Projects Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Projects</h2>
                        <button onClick={() => navigate('/projects')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
                    </div>

                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-primary-500/50 transition-colors cursor-pointer" onClick={() => navigate(`/dpr/${project.id}`)}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{project.name}</h3>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                            {project.location}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {project.delay > 0 && (
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">DELAYED {project.delay}d</span>
                                        )}
                                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${project.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : project.status === 'Delayed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            {project.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500">Progress</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${project.progress > 80 ? 'bg-emerald-500' : project.delay > 0 ? 'bg-red-500' : 'bg-primary-500'}`} 
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                    {String.fromCharCode(64+i)}
                                                </div>
                                            ))}
                                            {project.team > 3 && <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] text-slate-500">+{project.team - 3}</div>}
                                        </div>
                                        <span>{project.team} Workers</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {project.weather === 'Rainy' ? <CloudRain size={14} className="text-blue-500"/> : <Sun size={14} className="text-amber-500"/>}
                                        <span>{project.weather}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 h-fit">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                        {recentActivity.map((activity, idx) => (
                            <div key={activity.id} className="relative pl-8">
                                <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 z-10 ${activity.type === 'safety' ? 'bg-emerald-500' : activity.type === 'logistics' ? 'bg-blue-500' : 'bg-primary-500'}`}></div>
                                <p className="text-sm text-slate-900 dark:text-slate-200 font-medium leading-snug">{activity.text}</p>
                                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        View Full Log
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;