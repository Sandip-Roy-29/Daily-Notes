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
        <div className="flex flex-col gap-1">
            { label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-3 py-2 bordr rounded-md resize-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
            } ${className}`}
            {...props}
            >
                {error && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </textarea>
        </div>
    )
}

export default Textarea;