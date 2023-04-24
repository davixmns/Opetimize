import './App.css';

import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory";
import Header from "./components/header/Header"
import PurchaseForm from "./components/purchaseForm/PurchaseForm";
//teste
function App() {
  return (
    <div className="App">
        <Header/>
        <div id="globalDiv">
            <PurchaseForm/>
            <PurchaseHistory/>
        </div>
    </div>
  );
}

export default App;
