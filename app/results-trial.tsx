import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "@/store/hooks";
import {ThemedText} from "@/components/ThemedText";
import {LinearGradient} from 'expo-linear-gradient';
import PaywallOverlay from "@/components/PaywallOverlay";

const ResultsTrialScreen = () => {

  const watchDetails = useAppSelector(state => state.global.watchDetails)
  const { name, details, productionYear, reference, price, results, analysis } = watchDetails || { name: '', details: '', productionYear: '', reference: '', price: '', results: [], analysis: ""}

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <ThemedText style={styles.details}>{details}</ThemedText>
      {productionYear && <ThemedText style={styles.infoText}>Production Year: {productionYear}</ThemedText>}
      {reference && <ThemedText style={styles.infoText}>Reference: {reference}</ThemedText>}
      {price && <ThemedText style={styles.infoText}>Price: {price}</ThemedText>}

      {results?.length > 0 && (
        <View style={styles.chartContainer}>
          <View key={results[0].category} style={styles.barContainer}>
            <ThemedText style={styles.cardTitle}>
              {results[0].category}
              <Text style={{color: getColor(results[0].rating)}}> {results[0].rating}/10</Text>
            </ThemedText>
            <View style={styles.barWrapper}>
              <View style={[styles.bar, {
                width: `${results[0].rating * 10}%`,
                backgroundColor: getColor(results[0].rating),
              }]}/>
            </View>
            <View>
              <ThemedText style={styles.cardComment}>{results[0].comments}</ThemedText>
            </View>
          </View>
          <View>
            <PaywallOverlay/>
            {results.slice(1).map(result => (
              <View key={result.category} style={styles.barContainer}>
                <ThemedText style={styles.cardTitle}>
                  {result.category}

                </ThemedText>
                <View style={styles.barWrapper}>
                  <LinearGradient
                    colors={['#FF5252', '#FFC107', '#4CAF50']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={[styles.bar, {
                      width: `100%`,
                    }]}
                  />
                </View>
                <View style={styles.blur}>
                  <ThemedText style={[styles.cardComment, styles.blur]}>{result.comments}</ThemedText>
                </View>
              </View>
            ))}
            {analysis && (
              <View style={[styles.barContainer, {marginTop: 20}]}>
                <ThemedText style={styles.cardTitle}>Analysis</ThemedText>
                <ThemedText style={[styles.cardComment, styles.blur]}>{analysis}</ThemedText>
              </View>
            )}
          </View>

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
    fontWeight: 500,
  },
  blur: {
    overflow: 'hidden',
    opacity: 0.1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
});

export default ResultsTrialScreen;