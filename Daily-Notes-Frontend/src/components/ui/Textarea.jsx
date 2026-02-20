function Textarea(
    {
        label,
        value,
        onChange,
        placeholder,
        error,
        rows = 4,
        className = "",
        ...props
    }
) {
    return(
        <div className="flex flex-col gap-2">
            { label && (
                <label className="text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                error ? "border-red-500" : "border-gray-700"
            } ${className}`}
            {...props}
            >
            </textarea>
                {error && (
                    <span className="text-sm text-red-400">{error}</span>
                )}
        </div>
    )
}

export default Textarea;