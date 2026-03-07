export const formatDate = (dateString) => {
    if(!dateString) return "";

    return new Date(dateString).toLocaleString("en-IN",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    )
}

export const truncateText = (text, maxLength = 100) => {
    if(!text) return "";
    return text.length > maxLength 
        ? text.slice(0, maxLength) + "..."
        : text;
}

export const getInitials = (name = "") => {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}