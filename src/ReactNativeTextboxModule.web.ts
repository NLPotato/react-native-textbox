import { registerWebModule, NativeModule } from 'expo';

import { ReactNativeTextboxModuleEvents } from './ReactNativeTextbox.types';

class ReactNativeTextboxModule extends NativeModule<ReactNativeTextboxModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ReactNativeTextboxModule);
