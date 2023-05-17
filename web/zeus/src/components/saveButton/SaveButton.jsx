import "./styles.css"

function SaveButton({onClick, title}) {
    return (
        <div>
            <label htmlFor="buttonSave"></label>
            <input onClick={onClick} type="button" id="buttonSave" value={title}></input>
        </div>
    )
}

export default SaveButton