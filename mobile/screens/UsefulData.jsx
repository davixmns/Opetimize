import {Text, View, StyleSheet, ScrollView, RefreshControl} from "react-native";
import {useEffect, useState} from "react";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import {ReloadButtom} from "../components/ReloadButtom";

export function UsefulData() {
    const {purchases, loadPurchases} = usePurchaseContext()
    const [monthCosts, setMonthCosts] = useState(0);
    const [totalPetFood, setTotalMonthlyPetFood] = useState(0)
    const [bestDay, setBestDay] = useState("")
    const [cheapestPetFood, setCheapestPetFood] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    async function getMonthCosts() {
        const currentMonthPurchases = purchases.filter((purchase) => {
            const purchaseDate = new Date(purchase.date);
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
        });
        const totalCost = currentMonthPurchases.reduce((acc, purchase) => acc + purchase.price, 0);
        setMonthCosts(totalCost.toFixed(2));
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
            const purchasesByWeekDay = Array.from({length: 7}, () => 0);
            purchases.forEach((purchase) => {
                const purchaseDate = new Date(purchase.date);
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

    useEffect(() => {
        calculateCheapestPetFood()
        calculatePetFoodInventory()
        calculateBestDay()
        getMonthCosts();
    }, [purchases])

    return (
        <View style={styles.container}>
            <ScrollView
                refreshing={refreshing}
                onRefresh={loadPurchases}
                refreshControl={
                    <RefreshControl
                        tintColor={"#E49052"}
                        refreshing={refreshing}
                        onRefresh={loadPurchases}
                        progressViewOffset={50}
                    />
                }
            >
                <Text style={styles.bigTitle}>Dados úteis</Text>
                <View style={styles.dataCard}>
                    <Text style={styles.title}>Gastos do mês</Text>
                    <Text style={styles.dataText}>R$ {monthCosts}</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Estoque do mês</Text>
                    <Text style={styles.dataText}>{totalPetFood} Kg</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Dia mais frequente</Text>
                    <Text style={styles.dataText}>{bestDay}</Text>
                </View>

                <View style={styles.dataCard}>
                    <Text style={styles.title}>Ração mais barata</Text>
                    <Text style={styles.dataText2}>{cheapestPetFood}</Text>
                </View>
            </ScrollView>

            <ReloadButtom onPress={loadPurchases}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5E7CC',
        alignItems: "center",
        flex: 1,
    },
    dataCard: {
        height: 150,
        width: 350,
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
        fontSize: 22,
        color: '#E49052'
    },

    dataText: {
        fontSize: 45,
        color: "#E49052"
    },

    dataText2: {
        fontSize: 30,
        color: "#E49052"
    },

    bigTitle: {
        color: "#E49052",
        fontSize: 35,
        alignSelf: "center",
        paddingVertical: 20,
        paddingTop: 50,
    }
})
