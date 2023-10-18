import {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

export default function Timer({tokenSeconds, isRunning, finishTimer}) {
    const [timeLeft, setTimeLeft] = useState(tokenSeconds);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            finishTimer();
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
    );
}

const styles = StyleSheet.create({
    timer: {
        padding: 5,
        fontSize: 30,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});