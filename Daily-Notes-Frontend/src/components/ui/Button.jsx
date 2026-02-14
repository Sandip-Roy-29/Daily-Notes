function Button(
    {
        children,
        type = "button",
        onClick,
        variant = "primary",
        loading = false,
        disabled = false,
        className = "",
    }
){
    const baseStyle = "px-4 py-2 rounded-md font-medium transition duration-200"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    }

    const disabledStyle = "opacity-50 cursor-not-allowed";

    return(
        <button
        type={type}
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${
            disabled || loading ? disabledStyle : ""
        } ${className}`}
        disabled={disabled || loading}
        >
            {loading ? "Please wait..." : children}
        </button>
    )
}

export default Button;