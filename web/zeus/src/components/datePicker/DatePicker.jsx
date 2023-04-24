import "./styles.css"

function DatePicker(props){
    return(
        <div>
            <label htmlFor="datePicker"></label>
            <input type="date" id="datePicker" onChange={props.onChange}/>
        </div>
    )
}

export default DatePicker