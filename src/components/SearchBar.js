export default function SearchBar({ handleSearch }) {
    function onChange(e) {
        handleSearch(e.target.value)
    }

    return (
        <div >
            <input
                type="text"
                placeholder="Search user by name..."
                onChange={onChange}
                className="searchbar"
            />
        </div>
    )
};