import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "@/store/hooks";

const ResultsScreen = () => {

  const watchDetails = useAppSelector(state => state.global.watchDetails)
  const { name, details, results } = watchDetails || { name: '', details: '', results: []}
  console.log(watchDetails)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
      {results?.length > 0 && (
        <View style={styles.chartContainer}>
          {results.map(result => (
            <View key={result.category} style={styles.barContainer}>
              <Text style={styles.barLabel}>{result.category}</Text>
              <View style={styles.barWrapper}>
                <View
                  style={[styles.bar, {width: `${result.rating * 10}%`, backgroundColor: getColor(result.rating)}]}/>
                <Text style={styles.barValue}>{result.rating}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      {results?.map(result =>
        <Pressable
          key={result.category}
          style={({pressed}) => [
            styles.resultCard,
            pressed && styles.cardPressed
          ]}
        >
          <Text style={styles.cardTitle}>{result.category} - {result.rating} / 10</Text>
          <Text style={styles.cardComment}>{result.comments}</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

const getColor = (rating: number) => {
  if (rating >= 8) {
    return '#2E7D32';
  }
  if (rating >= 6) {
    return '#F9A825';
  }
  return '#C62828';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 20,
  },
  barContainer: {
    marginBottom: 15,
  },
  barLabel: {
    marginBottom: 5,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
  barValue: {
    marginLeft: 8,
  },
  resultCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  cardPressed: {
    transform: [{scale: 0.98}],
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardComment: {
    fontSize: 14,
    color: '#666',
  },
});

export default ResultsScreen;