import { StyleSheet } from 'react-native';
import { Text , View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text>Downlaod page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
