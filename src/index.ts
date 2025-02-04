import { EventEmitter, NativeModulesProxy, Subscription } from 'expo-modules-core';

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

interface ReactNativeTextboxInterface {
  getAvailableLanguages: () => Promise<string[]>;
  detectLanguage: (options: { text: string }) => Promise<string>;
  translate: (options: { 
    text: string; 
    targetLanguage: string 
  }) => Promise<TranslationResult>;
}

const ReactNativeTextbox = NativeModulesProxy.ReactNativeTextbox as ReactNativeTextboxInterface;

export function addTranslationProgressListener(
  listener: (event: { status: string }) => void
): Subscription {
  return EventEmitter.addListener<{ status: string }>(
    'translationProgress',
    listener
  );
}

export async function getAvailableLanguages(): Promise<string[]> {
  return await ReactNativeTextbox.getAvailableLanguages();
}

export async function detectLanguage(text: string): Promise<string> {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid text parameter');
  }
  return await ReactNativeTextbox.detectLanguage({ text });
}

export async function translate(
  text: string, 
  targetLanguage: string
): Promise<TranslationResult> {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid text parameter');
  }
  if (!targetLanguage || typeof targetLanguage !== 'string') {
    throw new Error('Invalid targetLanguage parameter');
  }
  
  try {
    return await ReactNativeTextbox.translate({ text, targetLanguage });
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

export default {
  getAvailableLanguages,
  detectLanguage,
  translate,
  addTranslationProgressListener,
};