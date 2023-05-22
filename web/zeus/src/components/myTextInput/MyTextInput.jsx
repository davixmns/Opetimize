import "./styles.css"

export function MyTextInput(props){
    return(
        <div>
            <input type={props.type} placeholder={props.placeholder} id={"text-input"} onChange={props.onChange}></input>
        </div>
    )
}