const InputField = ({ label, type = "text", value, onChange, error, required = false, ...props }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 dark:border-slate-600 focus:ring-2 focus:outline-none transition-colors ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 dark:border-slate-600 focus:ring-primary-100 focus:border-primary-500'}`}
            {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>⚠️</span> {error}</p>}
    </div>
);

export default InputField;