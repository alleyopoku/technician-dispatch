// src/components/TabBarBackground.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const TabBarBackground = () => (
  <View style={styles.background} />
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
