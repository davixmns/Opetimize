import "./styles.css"

function TextInput(props){
    return(
        <div id="div">
            <label htmlFor="inputText" id="label"/>
            <input type="text" id="inputText" onChange={props.onChange}/>
        </div>
    )
}

export default TextInput;
