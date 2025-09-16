import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';


interface TechnicianCardProps {
  name: string;
  skills: string[];
  location: string;
  availability: string[];
  jobsToday: number;
  onAssign: () => void;
  onViewSchedule: () => void;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({
  name,
  skills,
  location,
  availability,
  jobsToday,
  onAssign,
  onViewSchedule,
}) => (
  <Card style={styles.card}>
    <Card.Title 
      title={name} 
      subtitle={`📍 ${location}`}
      style={styles.cardTitle}
    />
    <Card.Content>
      <Text style={styles.label}>Skills:</Text>
      <View style={styles.chipRow}>
        {skills.map((skill, index) => (
          <Chip 
            key={`${skill}-${index}`} 
            mode="outlined"
            style={styles.chip}
          >
            {skill}
          </Chip>
        ))}
      </View>
      
      <Text style={styles.label}>Availability:</Text>
      <Text>{availability.join(', ')}</Text>
      
      <Text style={styles.label}>Jobs Today: {jobsToday}</Text>
    </Card.Content>
    
    <Card.Actions style={styles.actions}>
      <Button 
        onPress={onViewSchedule}
        style={styles.button}
      >
        View Schedule
      </Button>
      
      <Button 
        onPress={onAssign}
        style={[styles.button, styles.assignButton]}
      >
        Assign Job
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    paddingVertical: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  assignButton: {
    backgroundColor: '#007AFF',
  },
});

export default TechnicianCard;

