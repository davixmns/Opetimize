import {ScrollView, Text, View} from "react-native";
import {StyleSheet} from 'react-native';
import {getAllPurchases} from "../../service/apiService";
import {useEffect, useState} from "react";

export function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(null)
    const [racaoTotalDoMes, setRacaoTotalDoMes] = useState(null)
    const [bestDay, setBestDay] = useState("")

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

        getMonthCosts()

        async function calcularEstoqueDeRacao() {
            const purchases = await getAllPurchases()
            const comprasDoMes = purchases.filter((compra) => {
                const dataDaCompra = new Date(compra.date);
                const mesDaCompra = dataDaCompra.getMonth()
                const anoDaCompra = dataDaCompra.getFullYear()
                return dataDaCompra.getMonth() === mesDaCompra && dataDaCompra.getFullYear() === anoDaCompra
            })
            const racaoTotal = comprasDoMes.reduce((acumulador, compra) => acumulador + compra.weight, 0)
            setRacaoTotalDoMes((racaoTotal / 1000).toFixed(2))
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

                const weekDays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
                const purchasesByWeekDay = Array.from({length: 7}, () => 0);

                currentMonthPurchases.forEach((purchase) => {
                    const purchaseDate = new Date(purchase.date);
                    const weekDay = purchaseDate.getDay();
                    purchasesByWeekDay[weekDay] += purchase.price;
                });

                const bestDayIndex = purchasesByWeekDay.indexOf(Math.max(...purchasesByWeekDay));
                setBestDay(weekDays[bestDayIndex]);
                console.log(purchasesByWeekDay)
            }
        }

        calculateBestDay()

    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.dataCard}>
                    <Text style={styles.title}>Gastos do mês</Text>
                    <Text style={styles.dataText}>R$ {monthCosts}</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Estoque do mês</Text>
                    <Text style={styles.dataText}>{racaoTotalDoMes} Kg</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Melhor dia de compra</Text>
                    <Text style={styles.dataText}>{bestDay}</Text>
                </View>



            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#F5E7CC',
        alignItems: "center",
    },
    dataCard: {
        height: 150,
        width: 340,
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        position: 'relative',
    },

    title: {
        fontSize: 18,
        marginBottom: 0,
        color: "black"
    },

    dataText: {
        fontSize: 60,
        color: "#E49052"
    }
})