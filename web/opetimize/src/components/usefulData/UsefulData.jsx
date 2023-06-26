import {useState, useEffect} from 'react';
import "./styles.css"
import {getAllPurchasesByUserToken, verifyToken} from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import {addDays} from "date-fns";

function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(0);
    const [totalPetFood, setTotalMonthlyPetFood] = useState(0)
    const [bestDay, setBestDay] = useState("")
    const [cheapestPetFood, setCheapestPetFood] = useState(null)
    const [purchases, setPurchases] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            if (token && await verifyToken(token)) {
                const purchases = await getAllPurchasesByUserToken(token);
                setPurchases(purchases);
            } else {
                localStorage.setItem("token", "");
                navigate("/login");
            }
        }
        fetchData();
    }, [navigate]);

    useEffect(() => {
        async function getMonthCosts() {
            const currentMonthPurchases = purchases.filter((purchase) => {
                const purchaseDate = new Date(purchase.date);
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
            });
            const totalCost = currentMonthPurchases.reduce((acc, purchase) => acc + purchase.price, 0);
            setMonthCosts(totalCost.toFixed(2));
            setPurchases(purchases)
        }

        async function calculateCheapestPetFood() {
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
            setCheapestPetFood(
                cheapestPurchase
                    ? `${cheapestPurchase.name} \n(R$${cheapestPurchase.costPerKg.toFixed(2)}/kg)`
                    : '...'
            );
        }


        async function calculatePetFoodInventory() {
            const monthlyPurchases = purchases.filter((purchase) => {
                const purchaseDate = new Date(purchase.date);
                const purchaseMonth = purchaseDate.getMonth();
                const purchaseYear = purchaseDate.getFullYear();
                return purchaseDate.getMonth() === purchaseMonth && purchaseDate.getFullYear() === purchaseYear;
            });

            const totalPetFood = monthlyPurchases.reduce((accumulator, purchase) => accumulator + purchase.weight, 0);
            setTotalMonthlyPetFood((totalPetFood / 1000).toFixed(2));
        }


        async function calculateBestDay() {
            if (purchases.length > 0) {
                const purchasesByWeekDay = Array.from({ length: 7 }, () => 0);

                purchases.forEach((purchase) => {
                    const purchaseDate = addDays(new Date(purchase.date),1);
                    const weekDay = purchaseDate.getDay();
                    purchasesByWeekDay[weekDay] += 1;
                });

                const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                const maxPurchaseCount = Math.max(...purchasesByWeekDay);
                const bestDayIndex = purchasesByWeekDay.indexOf(maxPurchaseCount);
                const bestDay = weekDays[bestDayIndex];

                setBestDay(bestDay);
            } else {
                setBestDay("...");
            }
        }

        calculateCheapestPetFood()
        calculatePetFoodInventory()
        calculateBestDay()
        getMonthCosts();
    }, [purchases]);

    return (
        <div id="usefulDataContent">
            <h2 id={"formTitle"}>Dados do mês</h2>
            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Gastos</label>
                <h1 id="monthCosts">R${monthCosts}</h1>
            </div>

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Estoque de Ração</label>
                <h1 id="monthCosts">{totalPetFood}Kg</h1>
            </div>

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Melhor dia de compra</label>
                <h1 id="monthCosts">{bestDay}</h1>
            </div>

            <div id="divBackground">
                <label id="label" htmlFor="monthCosts">Ração mais barata</label>
                <h2 id="monthCosts2">{cheapestPetFood}</h2>
            </div>

        </div>
    );
}

export default UsefulData;
