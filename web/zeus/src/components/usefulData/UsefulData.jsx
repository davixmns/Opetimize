import {getAllPurchases} from "../../service/apiService";

function UsefulData() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    function getMonthCosts() {
        const purchases = getAllPurchases();

    }

    return (
        <div id="usefulData">
            <h1>{getMonthCosts()}</h1>
        </div>
    );
}

export default UsefulData

