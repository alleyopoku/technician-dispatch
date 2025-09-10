import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import EventCard from './EventCard'; // Adjust the path as needed

const events = [
  {
    title: 'Install Router',
    start: new Date(2025, 8, 11, 9, 0),
    end: new Date(2025, 8, 11, 10, 0),
  },
];

const SchedulerCalendar = () => (
  <View style={{ flex: 1 }}>
    <Calendar events={events} height={600} />
  </View>
);

export default SchedulerCalendar;


// import React from 'react';
import { Animated, PanResponder } from 'react-native';

const DraggableEvent = ({ children, onDrop }) => {
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

const handleDrop = (gesture: any) => {
  // You can add logic here to handle the drop event
  console.log('Dropped at:', gesture.moveX, gesture.moveY);
};

const job = events[0]; // Example: use the first event as the job

<DraggableEvent onDrop={handleDrop}>
  <EventCard job={job} />
</DraggableEvent>