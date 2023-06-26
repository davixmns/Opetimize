import "./styles.css";

function DatePicker(props) {
    const today = new Date().toISOString().substr(0, 10);

    return (
        <div>
            <label htmlFor="datePicker"></label>
            <input type="date" id="datePicker" onChange={props.onChange} defaultValue={today}/>
        </div>
    );
}

export default DatePicker;
