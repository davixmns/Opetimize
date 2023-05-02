import "./styles.css"

function SearchBar(props){

    return (
        <div>
            <input id="searchBar" type="text" placeholder="Pesquisar nome ou mês..." onChange={props.handleSearch}/>
        </div>
    )
}
export default SearchBar