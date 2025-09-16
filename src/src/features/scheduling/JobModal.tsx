import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

interface Technician {
  label: string;
  value: string;
}

const technicians: Technician[] = [
  { label: 'Alice', value: 'tech-001' },
  { label: 'Bob', value: 'tech-002' },
];

interface JobData {
  title: string;
  technicianId: string;
  date: Date;
}

interface JobModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: JobData) => void;
}

const JobModal: React.FC<JobModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [technicianId, setTechnicianId] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const isValid = title && technicianId;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text variant="titleLarge">Create Job</Text>

          <TextInput
            label="Job Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={!title}>
            Title is required
          </HelperText>

          <RNPickerSelect
            onValueChange={setTechnicianId}
            items={technicians}
            placeholder={{ label: 'Select Technician', value: null }}
            style={pickerStyles}
          />
          {!technicianId && <HelperText type="error">Technician is required</HelperText>}

          <Button onPress={() => setShowPicker(true)} mode="outlined">
            Select Date & Time
          </Button>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(_, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <View style={styles.actions}>
            <Button onPress={onClose}>Cancel</Button>
            <Button 
              onPress={() => isValid && onSave({ title, technicianId, date })} 
              disabled={!isValid}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
};

export default JobModal;