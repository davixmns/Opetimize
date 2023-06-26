import Header from "../components/header/Header";
import PurchaseForm from "../components/purchaseForm/PurchaseForm";
import PurchaseHistory from "../components/purchaseHistory/PurchaseHistory";
import UsefulData from "../components/usefulData/UsefulData";

export function HomePage() {
    return (
        <div className="App">
            <Header/>
            <div id="globalDiv">
                <PurchaseForm/>
                <PurchaseHistory/>
                <UsefulData/>
            </div>
        </div>
    );
}
