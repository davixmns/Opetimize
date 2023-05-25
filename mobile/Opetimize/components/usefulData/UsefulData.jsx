import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {addDays} from "date-fns";
import {getAllPurchasesByUserToken, verifyToken} from "../../service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export function UsefulData() {
    const [monthCosts, setMonthCosts] = useState(0);
    const [totalPetFood, setTotalMonthlyPetFood] = useState(0)
    const [bestDay, setBestDay] = useState("")
    const [cheapestPetFood, setCheapestPetFood] = useState(null)
    const [purchases, setPurchases] = useState([])
    const navigation = useNavigation();

    async function fetchData() {
        const token = await AsyncStorage.getItem('token');
        const purchases = await getAllPurchasesByUserToken(token);
        setPurchases(purchases);

    }

    async function refresh() {
        const token = await AsyncStorage.getItem('token');
        if (token && await verifyToken(token)) {
            await fetchData()
        } else {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }
    }

    async function handleSignOut() {
        await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                const purchasesByWeekDay = Array.from({length: 7}, () => 0);

                purchases.forEach((purchase) => {
                    const purchaseDate = addDays(new Date(purchase.date), 1);
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
        <View style={styles.container}>
            <ScrollView>
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

                <View style={{paddingLeft: 20, marginBottom: 20}}>
                    <TouchableOpacity style={styles.buttonSignOut} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <TouchableOpacity onPress={refresh} style={styles.refreshButtom}>
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

    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },

    buttonSignOut: {
        width: '40%',
        height: 50,
        backgroundColor: '#E49052',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        fontSize: 22,
        marginBottom: 0,
        color: '#E49052'
    },

    dataText: {
        fontSize: 50,
        color: "#E49052"
    },

    dataText2: {
        fontSize: 30,
        color: "#E49052"
    },

    refreshButtom: {
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
        fontSize: 35,
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 10
    }
})