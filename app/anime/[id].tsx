import { View, Text, ActivityIndicator, StyleSheet, ImageBackground , Image , Button} from 'react-native';
import { useEffect, useState } from 'react';
import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function sdasd() {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState<any>();
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
      
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00EC59" />
      </View>
    );
  }
  return (
    <View>
      <View style={{ width: 428, height: 400 }}>
      <ImageBackground
          source={{ uri : data.attributes.coverImage.original}}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={{ width: 428, height: 44, position: "absolute", top: 100 }}>
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
        <View style={{padding : 15}}>
        <View style={{flexDirection : "row" , alignItems : "center"}}>
          <Text style={{fontWeight : "700" , fontSize : 24}}>{data.attributes.titles.en_jp}</Text>
          <View style={{flexDirection : "row" , marginLeft : 40}}>
          <Button title='Neg'/>
          <Button title='hoyr'/>
          </View>
        </View>
        <View>
          <View style={{flexDirection : "row" , marginTop : 10 , alignItems : "center"}}>
            <Text>Icon <Text style={{color : "#06C149" , fontSize : 14}}>{data.attributes.averageRating}</Text> {data.attributes.startDate}</Text>
            <View style={{ width : "auto" , height : 30 , borderWidth : 1.5 , borderColor : "#06C149" , marginLeft : 10 , borderRadius : 10 , justifyContent : "center"}}>
              <Text style={{color : "#06C149" , textAlign : "center"}}> {data.attributes.ageRatingGuide}</Text>
            </View>
          </View>
          <View style = {{marginTop : 10}}>
            <View style={{position : "absolute" , left : 1 , width : 170 , height : 40 , backgroundColor : "#06C149" , borderRadius : 20 }}>
            <Button title='Play' color="#fff" />
            </View>
            <View style={{position : "absolute" , right : 50 , width : 170 , height : 40 , borderColor : "#06C149" , borderRadius : 20 , borderWidth : 1.5}}>
            <Button title='Download' color="#06C149"/>
            </View>
            <View style={{position : "absolute" , top : 40}}>
            <Text>ss</Text>
            <Text>ss</Text>
          </View>
          </View>
        </View>
        </View>
        </View>
    </View>
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
    backgroundColor : "whitesmoke",
    borderRadius : 20
  },
  backButtonIcon: {
    width: 30,
    height: 30,
  },
});
