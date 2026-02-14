export function Card({children, className=""}){
    return(
        <div
        className={`bg-white shadow-md rounded-xl border border-gray-200 ${className}`}
        > 
            {children}
        </div>
    )
}

export function CardHeader({ children, className=""}){
    return(
        <div
        className={`px-4 py-2 border-b border-gray-200 ${className}`}
        >
            {children}
        </div>
    )
}

export function CardContent({ children, className=""}){
    return(
        <div
        className={`px-4 ${className}`}
        >
            {children}
        </div>
    )
}

export function CardFooter({ children, className=""}){
    return(
        <div
        className={`px-4 py-2 border-t border-gray-200 ${className}`}
        >
            {children}
        </div>
    )
}