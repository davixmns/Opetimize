import "./styles.css"

function SearchBar(props){

    return (
        <div>
            <input id="searchBar" type="text" placeholder="Pesquisar..." onChange={props.handleSearch}/>
        </div>
    )
}
export default SearchBar