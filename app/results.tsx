import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "@/store/hooks";
import {ThemedText} from "@/components/ThemedText";

const ResultsScreen = () => {

  const watchDetails = useAppSelector(state => state.global.watchDetails)
  const { name, details, results } = watchDetails || { name: '', details: '', results: []}
  console.log(watchDetails)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <ThemedText style={styles.details}>{details}</ThemedText>
      {results?.length > 0 && (
      <View style={styles.chartContainer}>
        {results.map(result => (
        <View key={result.category} style={styles.barContainer}>
          <ThemedText style={styles.cardTitle}>
            {result.category}
            <Text style={{color: getColor(result.rating)}}> {result.rating}/10</Text>
          </ThemedText>
          <View style={styles.barWrapper}>
            <View style={[styles.bar, {
              width: `${result.rating * 10}%`,
              backgroundColor: getColor(result.rating),
            }]}/>
          </View>
          <View>
          <ThemedText style={styles.cardComment}>{result.comments}</ThemedText>
          </View>
        </View>
        ))}
      </View>
      )}
    </ScrollView>
  );
};

const getColor = (rating: number) => {
  if (rating >= 8) {
    return '#4CAF50';
  }
  if (rating >= 6) {
    return '#FFC107';
  }
  return '#FF5252';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  details: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
  chartContainer: {
    marginVertical: 25,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  barContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  barLabel: {
    marginBottom: 8,
    fontSize: 15,
    color: '#444',
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  barValue: {
    marginLeft: 10,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  cardComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
  },
});

export default ResultsScreen;