import "./styles.css"

function SaveButton(props){
    return (
        <div>
            <label htmlFor="button"></label>
            <input onClick={props.onClick} type="button" id="button"/>
        </div>
    )
}

export default SaveButton