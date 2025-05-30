# Watch Research App

## Overview

A sophisticated React Native application designed for watch enthusiasts and collectors. The app provides a comprehensive
research platform for exploring detailed information about various watch models through an intuitive interface.

## Architecture

### Core Technologies

- **Frontend Framework**: React Native with Expo
- **State Management**: Redux with @reduxjs/toolkit
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet
- **TypeScript**: For type safety and better development experience

### Key Components

- `ResearchScreen`: Main search interface
- `ThemedText`: Custom text component for consistent theming
- `ModelDetails`: Type definition for watch information

## Technical Specifications

### State Management

- Redux implementation using `useDispatch` and `useAppSelector`
- Global state slice managing:
    - Loading states
    - Model details
    - Search queries

### UI Components

1. **Search Interface**
    - Responsive TextInput for query entry
    - Loading indicator during API calls
    - Styled button with touch feedback

2. **Results Display**
    - Structured information layout
    - Dynamic content rendering
    - External link integration
    - Themed text components

### Styling System

- Dark theme implementation
- Consistent color scheme:
    - Background: #25292e
    - Accent: #007AFF
    - Text: White
- Responsive layouts using flexbox

## Development Setup

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS/Android development environment