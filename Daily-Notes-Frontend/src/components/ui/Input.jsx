function Input(
    {
        label,
        value,
        type = "text",
        onChange,
        placeholder,
        error,
        className = "",
        ...props
    }
){
    return(
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}

            <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
            {...props} 
            />

            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </div>
    )
}

export default Input;