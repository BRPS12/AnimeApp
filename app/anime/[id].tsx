import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function sdasd() {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState<any>();
  const [episode, setEpisode] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://kitsu.io/api/edge/anime/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    fetch(`https://kitsu.io/api/edge/anime/${id}/episodes`)
      .then((res) => res.json())
      .then(({ data }) => {
        setEpisode(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <View style={{ width: 428, height: 370 }}>
        <ImageBackground
          source={{ uri: data.attributes.coverImage.original }}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{ width: 428, height: 44, position: "absolute", top: 100 }}
          >
            <View style={{ paddingLeft: 20 }}>
              <Link href="../">
                <View style={styles.backButton}>
                  <Image
                    style={styles.backButtonIcon}
                    source={require("../Images/Back.png")}
                  />
                </View>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ padding: 0, height: "100%", flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 24, margin: 15 }}>
            {data.attributes.titles.en_jp}
          </Text>
          <View style={{ flexDirection: "row", marginLeft: 40 }}>
            <Button title="Neg" />
            <Button title="hoyr" />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <Text>
              Icon{" "}
              <Text style={{ color: "#06C149", fontSize: 14 }}>
                {data.attributes.averageRating}
              </Text>{" "}
              {data.attributes.startDate}
            </Text>
            <View
              style={{
                width: "auto",
                height: 30,
                borderWidth: 1.5,
                borderColor: "#06C149",
                marginLeft: 10,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#06C149", textAlign: "center" }}>
                {" "}
                {data.attributes.ageRatingGuide}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                position: "absolute",
                left: 1,
                width: 170,
                height: 40,
                backgroundColor: "#06C149",
                borderRadius: 20,
                marginLeft: 15,
              }}
            >
              <Button title="Play" color="#fff" />
            </View>
            <View
              style={{
                position: "absolute",
                right: 50,
                width: 170,
                height: 40,
                borderColor: "#06C149",
                borderRadius: 20,
                borderWidth: 1.5,
                marginRight: 15,
              }}
            >
              <Button title="Download" color="#06C149" />
            </View>
            <View style={{ marginTop: "15%" }}>
              <Text style={{ marginLeft: 15 }}>
                Users Count : {data.attributes.userCount}
              </Text>
              <View style={{ width: "94.5%", height: 120, marginTop: 10 }}>
                <Text style={{ marginLeft: 15 }}>
                  {data.attributes.description}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    marginTop: 10,
                    marginLeft: 15,
                  }}
                >
                  Episodes
                </Text>
                <FlatList
                  data={episode}
                  keyExtractor={(item) => `${item.id}`}
                  horizontal={true}
                  renderItem={({ item }: { item: any }) => (
                    <View style={{ marginTop: 10, marginLeft: 15 }}>
                      <Image
                        source={{ uri: item.attributes.thumbnail.original }}
                        style={{ width: 150, height: 113, borderRadius: 10 }}
                      />
                    </View>
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ width: 190, height: 38 }}>More like this</Text>
                <Text style={{ width: 190, height: 38 }}>Comments</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
  },
  text: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  backButton: {
    width: 30,
    height: 30,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
  },
  backButtonIcon: {
    width: 30,
    height: 30,
  },
});
