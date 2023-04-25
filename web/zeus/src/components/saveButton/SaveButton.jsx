import "./styles.css"

function SaveButton( {
    onClick, title
}){
    return (
        <div>
            <label htmlFor="button"></label>
            <input onClick={onClick} type="button" id="button" value={title}>
            </input>
        </div>
    )
}

export default SaveButton