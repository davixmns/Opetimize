import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from 'react-native';
import {getAllPurchases} from "../../service/apiService";
import {useEffect, useState} from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(null)
    const [racaoTotalDoMes, setRacaoTotalDoMes] = useState(null)
    const [bestDay, setBestDay] = useState("")
    const [racaoMaisBarata, setRacaoMaisBarata] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        calculateMonthCosts()
        calcularEstoqueDeRacao()
        calculateBestDay()
        calcularRacaoMaisBarata()
    }

    async function calculateMonthCosts() {
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
            const purchasesByWeekDay = Array.from({length: 7}, () => 0);

            currentMonthPurchases.forEach((purchase) => {
                const purchaseDate = new Date(purchase.date);
                const weekDay = purchaseDate.getDay();
                purchasesByWeekDay[weekDay] += purchase.price;
            });

            const bestDayIndex = purchasesByWeekDay.indexOf(Math.max(...purchasesByWeekDay));
            setBestDay(weekDays[bestDayIndex]);
        }
    }

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

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.bigTitle}>Dados úteis</Text>
                <View style={styles.dataCard}>
                    <Text style={styles.title}>Gastos do mês</Text>
                    <Text style={styles.dataText}>R$ {monthCosts}</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Estoque do mês</Text>
                    <Text style={styles.dataText}>{racaoTotalDoMes} Kg</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Dia mais frequente</Text>
                    <Text style={styles.dataText}>{bestDay}</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Ração mais barata</Text>
                    <Text style={styles.dataText2}>{racaoMaisBarata}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={fetchData} style={styles.buttom}>
                <Icon name="refresh" size={25} color="white"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#F5E7CC',
        alignItems: "center",
        flex: 1
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
        fontSize: 50,
        color: "#E49052"
    },

    dataText2: {
        fontSize: 30,
        color: "#E49052"
    },

    buttom: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E49052',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bigTitle: {
        color: "#E49052",
        fontSize: 30,
        alignSelf: "center",
        marginTop: 35,
        marginBottom: 10
    }

})