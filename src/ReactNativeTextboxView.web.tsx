import * as React from 'react';

import { ReactNativeTextboxViewProps } from './ReactNativeTextbox.types';

export default function ReactNativeTextboxView(props: ReactNativeTextboxViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
