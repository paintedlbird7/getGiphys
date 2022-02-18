import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";

export default function GetAPI() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const res = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=V3JmbMAFPKAuNQgV173fmZajy7bEBSMA&limit=25&rating=g");
        const data = await res.json();
        setData(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <View style={styles.view}>
            {loading && <Text style={styles.loading}>loading...</Text>}

            {data && (
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                resizeMode='center'
                                style={styles.image}
                                source={{ uri: item.images.original.url }}
                            />
                        )
                    }}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black'
    },
    image: {
        width: 230,
        height: 150,
        borderWidth: 3,
        marginBottom: 5,
        marginBottom: 85,
    },
    loading: {
        height: 50,
        justifyContent: "center",
        fontSize: 50,
        padding: 60,
        color: "white",
    }
});