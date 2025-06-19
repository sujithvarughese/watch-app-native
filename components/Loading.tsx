import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {ThemedText} from "@/components/ThemedText";


export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [progressWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(progressWidth, {
      toValue: 100,
      duration: 12000,
      useNativeDriver: false,
    });

    animation.start();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      animation.stop();
    };
  }, [progressWidth]);

  const getProgressColor = () => {
    if (progress < 30) return '#FF5252';
    if (progress < 60) return '#FFC107';
    return '#4CAF50';
  };

  const getMessage = () => {
    if (progress <=20) return 'Starting analysis...';
    if (progress <= 40) return 'Processing images...';
    if (progress <= 60) return 'Analyzing watch details...';
    if (progress < 100) return 'Generating results...';
    if (progress === 100) return 'Analysis complete! Generating Report...';
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 300],
              }),

              backgroundColor: getProgressColor(),
            },
          ]}
        />
      </View>
      <ThemedText style={styles.percentage}>{progress}%</ThemedText>
      <ThemedText style={styles.message}>{getMessage()}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressContainer: {
    width: 300,
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  percentage: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 16,
    color: 'white',
    zIndex: 100,
  },
});