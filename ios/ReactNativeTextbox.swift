import Foundation
import UIKit
import ExpoModulesCore
import NaturalLanguage

public class ReactNativeTextbox: Module {
    public func definition() -> ModuleDefinition {
        Name("ReactNativeTextbox")

        // 지원 가능한 언어 목록 반환
        Function("getAvailableLanguages") { () -> [String] in
            return NLLanguage.allCases.map { $0.rawValue }
        }

        // 언어 감지
        AsyncFunction("detectLanguage") { (options: [String: Any]) async throws -> String in
            guard let text = options["text"] as? String else {
                throw Exception("Missing text")
            }
            
            let recognizer = NLLanguageRecognizer()
            recognizer.processString(text)
            guard let languageCode = recognizer.dominantLanguage?.rawValue else {
                throw Exception("Could not detect language")
            }
            
            return languageCode
        }

        // 번역 with UI feedback
        AsyncFunction("translate") { (options: [String: Any]) async throws -> [String: Any] in
            guard let text = options["text"] as? String,
                  let targetLanguage = options["targetLanguage"] as? String else {
                throw Exception("Missing arguments")
            }

            let translator = NLTranslator()
            
            // 진행 상태를 이벤트로 전송
            self.sendEvent("translationProgress", ["status": "started"])
            
            try await translator.prepare(for: text, 
                                      from: .detectLanguage, 
                                      to: NLLanguage(targetLanguage))
            
            guard let translation = try await translator.translate(text) else {
                throw Exception("Translation failed")
            }
            
            self.sendEvent("translationProgress", ["status": "completed"])
            
            return [
                "originalText": text,
                "translatedText": translation,
                "sourceLanguage": translator.sourceLanguage?.rawValue ?? "unknown",
                "targetLanguage": targetLanguage
            ]
        }
    }
}

// Helper function for base64 decoding
extension String {
    func base64Decoded() -> String? {
        guard let data = Data(base64Encoded: self) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}

// Custom exception for better error handling
class Exception: Error, LocalizedError {
    let message: String

    init(_ message: String) {
        self.message = message
    }

    var errorDescription: String? {
        return message
    }
}