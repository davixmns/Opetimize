import './App.css';

import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory";
import Header from "./components/header/Header"
//teste
function App() {
  return (
    <div className="App">
        <Header/>
        <div id="globalDiv">
            <PurchaseHistory/>
        </div>

    </div>
  );
}

export default App;
