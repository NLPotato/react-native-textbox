import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeTextboxViewProps } from './ReactNativeTextbox.types';

const NativeView: React.ComponentType<ReactNativeTextboxViewProps> =
  requireNativeView('ReactNativeTextbox');

export default function ReactNativeTextboxView(props: ReactNativeTextboxViewProps) {
  return <NativeView {...props} />;
}
