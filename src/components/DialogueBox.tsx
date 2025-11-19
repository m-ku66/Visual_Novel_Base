import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogueBoxProps {
    speaker?: string;
    text?: string;
    onAdvance?: () => void;
}

export function DialogueBox({ speaker, text, onAdvance }: DialogueBoxProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [currentText, setCurrentText] = useState(text || '');

    // Typewriter speed (characters per second)
    const TYPING_SPEED = 50; // Adjust this for faster/slower typing

    // Reset when text changes
    useEffect(() => {
        if (text && text !== currentText) {
            setCurrentText(text);
            setDisplayedText('');
            setIsComplete(false);
        }
    }, [text]);

    // Typewriter effect
    useEffect(() => {
        if (!currentText || isComplete) return;

        if (displayedText.length < currentText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentText.slice(0, displayedText.length + 1));
            }, 1000 / TYPING_SPEED);

            return () => clearTimeout(timeout);
        } else {
            setIsComplete(true);
        }
    }, [displayedText, currentText, isComplete]);

    const handleClick = () => {
        if (!onAdvance) return;

        // If text is still typing, complete it instantly
        if (!isComplete && currentText) {
            setDisplayedText(currentText);
            setIsComplete(true);
        } else {
            // Text is complete, advance to next slide
            onAdvance();
        }
    };

    if (!text) return null;

    return (
        <div className="w-[95%] max-w-full mx-auto">
            {/* Speaker name - Outside and above the dialogue box */}
            <AnimatePresence mode="wait">
                {speaker && (
                    <motion.div
                        key={speaker}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-bold text-yellow-400 text-lg mb-2 ml-2"
                    >
                        {speaker}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dialogue Box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={handleClick}
                className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                style={{
                    minHeight: '180px', // Fixed minimum height
                    maxHeight: '180px', // Fixed maximum height
                    overflow: 'hidden',  // Prevent overflow
                }}
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Main text - Typewriter effect */}
                    <div className="text-lg leading-relaxed text-white flex-grow overflow-y-auto">
                        {displayedText}
                        {/* Blinking cursor while typing */}
                        {!isComplete && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                className="inline-block ml-1"
                            >
                                |
                            </motion.span>
                        )}
                    </div>

                    {/* Continue hint (only show when text is complete) */}
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-sm text-right mt-2 flex-shrink-0"
                        >
                            Click to continue ▸
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}