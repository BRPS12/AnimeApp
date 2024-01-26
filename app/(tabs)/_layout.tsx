import React from 'react';
import { Link, Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown : false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Release Calendar',
        }}
      />
    </Tabs>
  );
}
