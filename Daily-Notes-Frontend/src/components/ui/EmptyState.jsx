function EmptyState(
    {
        title = "Nothing here",
        description = "There is no data to display",
        action,
    }
){
    return(
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            <p className="text-gray-500 mt-2">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    )
}

export default EmptyState;