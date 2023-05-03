import { useState, useEffect } from 'react';
import { getAllPurchases } from '../../service/apiService';
import "./styles.css"

function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(0);
    const [racaoTotalDoMes, setRacaoTotalDoMes] = useState(0)
    const [bestDay, setBestDay] = useState("")
    const [racaoMaisBarata, setRacaoMaisBarata] = useState(null)

    useEffect(() => {
        async function getMonthCosts() {
            const purchases = await getAllPurchases()
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

        async function calcularRacaoMaisBarata() {
            const purchases = await getAllPurchases();
            let cheapestPurchase = null;

            for (const purchase of purchases) {
                const costPerKg = purchase.price / (purchase.weight / 1000);
                if (!cheapestPurchase || costPerKg < cheapestPurchase.costPerKg) {
                    cheapestPurchase = {
                        ...purchase,
                        costPerKg,
                    };
                }
            }

            setRacaoMaisBarata(
                cheapestPurchase
                    ? `${cheapestPurchase.name} \n(R$${cheapestPurchase.costPerKg.toFixed(2)}/kg)`
                    : 'Nenhuma compra registrada.'
            );
        }
        calcularRacaoMaisBarata()

        async function calcularEstoqueDeRacao() {
            const purchases = await getAllPurchases()
            const comprasDoMes = purchases.filter((compra) => {
                const dataDaCompra = new Date(compra.date);
                const mesDaCompra = dataDaCompra.getMonth()
                const anoDaCompra = dataDaCompra.getFullYear()
                return dataDaCompra.getMonth() === mesDaCompra && dataDaCompra.getFullYear() === anoDaCompra
            })
            const racaoTotal = comprasDoMes.reduce((acumulador, compra) => acumulador + compra.weight, 0)
            setRacaoTotalDoMes((racaoTotal/1000).toFixed(2))
        }
        calcularEstoqueDeRacao()

        async function calculateBestDay() {
            const purchases = await getAllPurchases()
            if (purchases) {
                const currentMonthPurchases = purchases.filter((purchase) => {
                    const purchaseDate = new Date(purchase.date);
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();
                    return (
                        purchaseDate.getMonth() === currentMonth &&
                        purchaseDate.getFullYear() === currentYear
                    );
                });

                const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                const purchasesByWeekDay = Array.from({ length: 7 }, () => 0);

                currentMonthPurchases.forEach((purchase) => {
                    const purchaseDate = new Date(purchase.date);
                    const weekDay = purchaseDate.getDay();
                    purchasesByWeekDay[weekDay] += purchase.price;
                });

                const bestDayIndex = purchasesByWeekDay.indexOf(Math.max(...purchasesByWeekDay));
                setBestDay(weekDays[bestDayIndex]);
            }
        }
        calculateBestDay()

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

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Melhor dia de compra</label>
                <h1 id="monthCosts">{bestDay}</h1>
            </div>

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Ração mais barata</label>
                <h2 id="monthCosts2">{racaoMaisBarata}</h2>
            </div>
            
        </div>


    );
}

export default UsefulData;
