import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, Button , ActivityIndicator } from "react-native";
import Constants from "expo-constants";

export default function TopAnimes() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/anime/")
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00EC59" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="../">
          <View style={styles.backButton}>
            <Image
              style={styles.backButtonIcon}
              source={require("./Images/Back.png")}
            />
          </View>
        </Link>
        <Text style={styles.title}>Top Hits Anime</Text>
      </View>

      <FlatList 
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.animeItem}>
            <ImageBackground source={{ uri: item.attributes.posterImage.tiny }} style={styles.posterImage}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.attributes.averageRating}</Text>
              </View>
            </ImageBackground>
            <View style={{marginLeft : 20 }}>
                <Text style={{ fontWeight : "700" , fontSize : 20 }}>{item.attributes.titles.en_jp}</Text>
                <Text style={{ fontWeight : "600" , fontSize : 14 , marginTop : 10 }}>Started at : {item.attributes.startDate}</Text>
                <Text style={{ fontWeight : "600" , fontSize : 14, marginTop : 10 }}>Ended at : {item.attributes.endDate}</Text>
                <Text style={{ fontWeight : "500" , fontSize : 12, marginTop : 10 }}>Show Type : {item.attributes.showType}</Text>
                <View style={{ backgroundColor : "#06C149" , width : 120 , borderRadius : 20, marginTop : 10 }}>
                <Button title="+ My List" color="#fff"/>
            </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  backButtonIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24, 
    color: "#000", 
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 6,
  },
  animeItem: {
    margin: 10,
    flexDirection : "row"
  },
  posterImage: {
    width: 110,
    height: 156,
  },
  ratingContainer: {
    height: 20,
    width: 40,
    backgroundColor: '#00EC59',
    borderRadius: 7,
    margin: 10,
    justifyContent: "center",
  },
  ratingText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});
