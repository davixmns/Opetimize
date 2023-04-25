import { useState, useEffect } from 'react';
import { getAllPurchases } from '../../service/apiService';
import "./styles.css"

function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(null);
    const [racaoTotalDoMes, setRacaoTotalDoMes] = useState(null)

    useEffect(() => {
        async function getMonthCosts() {
            const purchases = await getAllPurchases();
            const currentMonthPurchases = purchases.filter((purchase) => {
                const purchaseDate = new Date(purchase.date);
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
            });
            const totalCost = currentMonthPurchases.reduce((acc, purchase) => acc + purchase.price, 0);
            setMonthCosts(totalCost.toFixed(2));
        }
        getMonthCosts();
        
        async function calcularEstoqueDeRacao() {
            const compras = await getAllPurchases()
            const comprasDoMes = compras.filter((compra) => {
                const dataDaCompra = new Date(compra.date);
                const mesDaCompra = dataDaCompra.getMonth()
                const anoDaCompra = dataDaCompra.getFullYear()
                return dataDaCompra.getMonth() === mesDaCompra && dataDaCompra.getFullYear() === anoDaCompra
            })
            const racaoTotal = comprasDoMes.reduce((acumulador, compra) => acumulador + compra.weight, 0)
            setRacaoTotalDoMes((racaoTotal/1000).toFixed(2))
        }
        calcularEstoqueDeRacao()

    }, []);

    return (
        <div id="usefulDataContent">
            <h2 id="title">Dados do mês</h2>
            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Gastos</label>
                <h1 id="monthCosts">R${monthCosts}</h1>
            </div>

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Estoque de Ração</label>
                <h1 id="monthCosts">{racaoTotalDoMes}Kg</h1>
            </div>
            
        </div>
    );
}

export default UsefulData;
