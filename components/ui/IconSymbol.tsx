import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Platform, StyleProp, TextStyle } from 'react-native';

interface IconSymbolProps {
  name: 'home' | 'send' | 'code' | 'chevron-right';
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: IconSymbolProps) {
  return Platform.OS === 'ios'
    ? <><Ionicons name={name} size={size} color={color} style={style} /><IconSymbol name="home" size={28} color={color} /></>
    : <MaterialIcons name={name} size={size} color={color} style={style} />;
}
