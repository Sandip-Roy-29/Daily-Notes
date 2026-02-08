function NotesSkeleton(){
    return(
        <div className="space-y-4">
        {[1, 2, 3].map((item) => (
            <div key={item}>
                <div className="skeleton skeleton-title"/>
                <div className="skeleton skeleton-line"/>
                <div className="skeleton skeleton-line short"/>
            </div>
        ))}
        </div>
    )
}

export default NotesSkeleton;