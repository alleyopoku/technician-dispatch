import { CalendarList } from 'react-native-calendars';


const events = [
  {
    title: 'Install Router',
    start: new Date(2025, 8, 11, 9, 0),
    end: new Date(2025, 8, 11, 10, 0),
  },
];

// Mock technician availability data for demonstration
const technicianAvailability = [
  {
    technicianId: 'T1',
    availableSlots: [
      { start: '2025-09-11T08:00:00', end: '2025-09-11T09:00:00' },
      { start: '2025-09-11T11:00:00', end: '2025-09-11T12:00:00' },
    ],
  },
  {
    technicianId: 'T2',
    availableSlots: [
      { start: '2025-09-11T13:00:00', end: '2025-09-11T14:00:00' },
    ],
  },
];

const availabilityEvents = technicianAvailability.flatMap(tech =>
  tech.availableSlots.map(slot => ({
    title: `Available (${tech.technicianId})`,
    start: new Date(slot.start),
    end: new Date(slot.end),
    color: '#d0f0c0', // light green
  }))
);

const allEvents = [...availabilityEvents, ...events];

const SchedulerCalendar = () => (
  <CalendarList
    // Use props supported by react-native-calendars
    // You cannot use eventPropGetter here
  />
);

export default SchedulerCalendar;


import { Animated, PanResponder } from 'react-native';
// DraggableEvent.tsx
import React from 'react';
export interface DraggableEventProps {
  children: React.ReactNode;
  onDrop: (gesture: any) => void;
}

export const DraggableEvent: React.FC<DraggableEventProps> = ({ children, onDrop }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      onDrop(gesture);
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    },
  });

  return (
    <Animated.View
      style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};
// To use DraggableEvent, wrap it inside a component's return statement, for example:
// function ExampleDraggable() {
//   return (
//     <DraggableEvent onDrop={handleDrop}>
//       <EventCard job={job} />
//     </DraggableEvent>
//   );
// }

// Or remove the orphaned JSX if not needed.

const [modalVisible, setModalVisible] = useState(false);

<Button title="Add Job" onPress={() => setModalVisible(true)} />
<JobModal visible={modalVisible} onClose={() => setModalVisible(false)} />