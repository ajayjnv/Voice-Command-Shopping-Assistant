import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../styles/VoiceInput.css"; // reuse existing styles

function VoiceSearch({ onSearchCommand, isListening, onStartListening, onStopListening }) {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [showOk, setShowOk] = useState(false);
    const micRef = useRef(null);

    useEffect(() => {
        if (!listening && transcript) {
            setShowOk(true);
            if (micRef.current) micRef.current.classList.remove("listening");
        }
    }, [listening, transcript]);

    const handleStart = () => {
        if (isListening) return;
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
        setShowOk(false);
        if (micRef.current) micRef.current.classList.add("listening");
    };

    const handleOk = () => {
        onSearchCommand(transcript);
        resetTranscript();
        setShowOk(false);
    };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="voiceinput-wrapper">
            <h3>Voice Search</h3>
            <div className="microphone-container">
                <div
                    className="microphone-icon-container"
                    ref={micRef}
                    onClick={listening ? SpeechRecognition.stopListening : handleStart}
                    title="Click to toggle listening"
                >
                    <div className="microphone-glow"></div>
                    <span className="microphone-icon">🔍🎤</span>
                </div>
                <div className="microphone-status">
                    {listening ? "Listening for search..." : "Click mic to search"}
                </div>
            </div>
            <div className="microphone-result-container">
                {transcript && (
                    <div className="microphone-result-text">
                        {transcript}
                    </div>
                )}
                {showOk && (
                    <button className="microphone-ok" onClick={handleOk}>OK</button>
                )}
            </div>
        </div>
    );
}

export default VoiceSearch;
