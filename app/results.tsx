import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "@/store/hooks";
import {ThemedText} from "@/components/ThemedText";

const ResultsScreen = () => {

  const watchDetails = useAppSelector(state => state.global.watchDetails)
  const { name, details, results, productionYear, reference, price, analysis } = watchDetails || { name: '', details: '', results: [], analysis: ""}

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <ThemedText style={styles.details}>{details}</ThemedText>
      {productionYear && <ThemedText style={styles.infoText}>Production Year: {productionYear}</ThemedText>}
      {reference && <ThemedText style={styles.infoText}>Reference: {reference}</ThemedText>}
      {price && <ThemedText style={styles.infoText}>Price: ${price}</ThemedText>}

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

      {analysis && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Analysis</Text>
          <ThemedText style={styles.analysisText}>{analysis}</ThemedText>
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
    padding: 16,
    backgroundColor: '#000',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginBottom: 20,
    color: '#e0e0e0',
    fontWeight: 500,
    lineHeight: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 8,
    fontWeight: '500',
  },
  chartContainer: {
    marginVertical: 25,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  barContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  barLabel: {
    marginBottom: 8,
    fontSize: 15,
    color: '#fff',
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#404040',
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
    color: '#fff',
  },
  cardComment: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginTop: 8,
    fontWeight: 500
  },
  analysisContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  analysisTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default ResultsScreen;