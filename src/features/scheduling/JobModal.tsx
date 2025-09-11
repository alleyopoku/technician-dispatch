import { TechnicianProfile } from '@/types'; // adjust path as needed
import { matchTechnician } from '@/utils/matchTechnician'; // adjust path as needed
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addJob } from '/schedulerSlice';

interface JobModalProps {
  visible: boolean;
  onClose: () => void;
  technicianList: TechnicianProfile[]; // Pass technician list as a prop
}

const JobModal: React.FC<JobModalProps> = ({ visible, onClose, technicianList }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSave = () => {
    const jobData = {
      id: Date.now().toString(),
      title,
      scheduledTime: startTime,
      location: {
        lat: 48.8566, // Replace with actual location input if needed
        lng: 2.3522,
      },
      requiredSkills: ['electrical'], // Replace with dynamic input if needed
    };

    const assignedTech = matchTechnician(technicianList, jobData);

    if (assignedTech) {
      dispatch(addJob({ ...jobData, technicianId: assignedTech.id }));
    } else {
      dispatch(addJob({ ...jobData, technicianId: 'unassigned' }));
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} />

          <Text style={styles.label}>Start Time</Text>
          <TextInput value={startTime} onChangeText={setStartTime} style={styles.input} />

          <Text style={styles.label}>End Time</Text>
          <TextInput value={endTime} onChangeText={setEndTime} style={styles.input} />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default JobModal;
