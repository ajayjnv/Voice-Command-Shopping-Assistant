import React, { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../styles/VoiceInput.css";

function VoiceInput({ onVoiceCommand, isListening, onStartListening, onStopListening }) {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [showOk, setShowOk] = useState(false);
    const microphoneRef = useRef(null);


    useEffect(() => {
        if (!listening && transcript) {
            // Speech ended — show OK button
            setShowOk(true);
            if (microphoneRef.current) microphoneRef.current.classList.remove("listening");
        }
    }, [listening, transcript]);

    // Start listening and show animation
    const handleStart = () => {
        if (isListening) return; 
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });  // Stop automatically after speech ends
        setShowOk(false);
        if (microphoneRef.current) microphoneRef.current.classList.add("listening");
    };

    // User clicks OK: trigger action and reset
    const handleOk = () => {
        onVoiceCommand(transcript);
        resetTranscript();
        setShowOk(false);
    };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="voiceinput-wrapper">
            <div className="microphone-container">
                <div
                    className="microphone-icon-container"
                    ref={microphoneRef}
                    onClick={listening ? SpeechRecognition.stopListening : handleStart}
                    title="Click to toggle listening"
                >
                    <div className="microphone-glow"></div>
                    <span className="microphone-icon">🎤</span>
                </div>
                <div className="microphone-status">
                    {listening ? "Listening..." : "Click mic to start"}
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

export default VoiceInput;
