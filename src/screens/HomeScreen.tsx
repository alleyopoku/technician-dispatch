import React from 'react';
import { StyleSheet, Text, View } from 'react-native';




import { useTechnicianLocation } from '../hooks/useTechnicianLocation';


import TechnicianMap from '../features/tracking/components/TechnicianMap';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Technician Dispatch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

const { location, errorMsg } = useTechnicianLocation();

useEffect(() => {
  if (location) {
    console.log('Technician location:', location.coords);
  }
}, [location]);

<TechnicianMap />