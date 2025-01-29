import { Platform } from 'react-native';
import React from 'react';
import Head from "expo-router/head";
import { ExpoRoot } from "expo-router";
import { registerRootComponent } from 'expo';

const HeadProvider =
  typeof window === "undefined" ? React.Fragment : Head.Provider;
const ctx = require.context("./app");

export default function App() {
  return (
    <HeadProvider>
      {Platform.OS === "web" && (
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap');
        </style>
      )}
      <ExpoRoot context={ctx} />
    </HeadProvider>
  );
}

registerRootComponent(App);