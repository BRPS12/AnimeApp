import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ImageBackground, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View, Image } from 'react-native';

export default function TabOneScreen() {
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
    <ScrollView style={styles.container}>
      <View style={{ width: 428, height: 400 }}>
        <ImageBackground
          source={require("../Images/Image.png")}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={{ width: 428, height: 44, position: "absolute", top: 100 }}>
            <View style={{ paddingLeft: 20 , width : 30 , height : 30}}>
              <Image source={require("../Images/Logo.png")} style={{width : 30 , height : 30}}/>
            </View>
          </View>
          <View style={{position : "absolute" , bottom : 10 , marginLeft : 20}}>
            <Text style={styles.title}>Demon Slayer: Kimetsu ...</Text>
            <Text style={styles.text}>Action, Shounen, Martial Arts, Adventure, ...</Text>
            
            <View style={{ flexDirection : "row" , marginTop : 10 , marginBottom : 10}}>
            <View style={{ backgroundColor : "#06C149" , width : 110 , borderRadius : 20 }}>
            <Button title="Play" color="#fff"/>
            </View>
            <View style={{ width : 120 , borderRadius : 20 , borderWidth : 2 , borderColor : "#fff" , marginLeft : 10}}>
            <Button title='+ My List' color="#fff"/>
            </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View>
        <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Top Hits Anime</Text>
          <View style={{ position: "absolute", right: 15 }}>
            <Link href="/topanimes" style={{color : "#00EC59" , fontSize : 18}}>See All</Link>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal={true}
          renderItem={({ item }: { item: any }) => (
            <View>  
              <View style={{ marginLeft: 20 }}>
              <Link href={`/anime/${item.id}`}>
                <ImageBackground source={{ uri: item.attributes.posterImage.tiny }} style={{ width: 110, height: 156 }}>
                  <View style={{ height: 20, width: 40, backgroundColor: '#00EC59', borderRadius: 7, margin: 10 }}>
                    <Text style={{ textAlign: "center", color: "#fff" }}>{item.attributes.averageRating}</Text>
                  </View>
                </ImageBackground>
                </Link>
              </View>
            </View>
          )}
        />
      </View>

      {/* Gap */}
      <View>
        <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>New Episode Releases</Text>
          <View style={{ position: "absolute", right: 15 }}>
          <Link href="/newrelease" style={{color : "#00EC59" , fontSize : 18}}>See All</Link>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal={true}
          renderItem={({ item }: { item: any }) => (
            <View>
              <View style={{ marginLeft: 20 }}>
                <ImageBackground source={{ uri: item.attributes.posterImage.tiny }} style={{ width: 110, height: 156 }}>
                  <View style={{ height: 20, width: 40, backgroundColor: '#00EC59', borderRadius: 7, margin: 10 }}>
                    <Text style={{ textAlign: "center", color: "#fff" }}>{item.attributes.averageRating}</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize : 24, 
    color : "#fff" , 
    fontWeight : "700"
  },
  text: {
    fontSize : 12, 
    color : "#fff" , 
    fontWeight : "500"
  }
});
