// Reexport the native module. On web, it will be resolved to ReactNativeTextboxModule.web.ts
// and on native platforms to ReactNativeTextboxModule.ts
export { default } from './ReactNativeTextboxModule';
export { default as ReactNativeTextboxView } from './ReactNativeTextboxView';
export * from  './ReactNativeTextbox.types';
