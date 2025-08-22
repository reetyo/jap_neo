import React, { useState, useEffect, useMemo } from 'react';
import { Button, Radio, Space, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { pinyin } from 'pinyin-pro';
import words from '../words.json';
import './WordPage.css';

const WordPage = () => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('wordSessionCurrentIndex');
    return saved !== null ? JSON.parse(saved) : 0;
  });
  const [sessionWords, setSessionWords] = useState(() => {
    const saved = localStorage.getItem('wordSessionWords');
    return saved !== null ? JSON.parse(saved) : words;
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  useEffect(() => {
    localStorage.setItem('wordSessionCurrentIndex', JSON.stringify(currentIndex));
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('wordSessionWords', JSON.stringify(sessionWords));
  }, [sessionWords]);



  const currentWord = sessionWords[currentIndex];

  const addMistake = (word) => {
    if (!word || !Array.isArray(word)) return;

    let savedMistakes = [];
    try {
      const savedData = localStorage.getItem('mistakes');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          savedMistakes = parsedData;
        }
      }
    } catch (error) {
      console.error('Error parsing mistakes from localStorage:', error);
      savedMistakes = [];
    }

    const isAlreadyInMistakes = savedMistakes.some(item =>
      item && Array.isArray(item) && item[2] === word[2]
    );

    if (!isAlreadyInMistakes) {
      const newMistakes = [...savedMistakes, word];
      localStorage.setItem('mistakes', JSON.stringify(newMistakes));
    }
  };

  const getPinyinInitial = (text) => {
    if (!text) return '?';
    const cleanedText = text.trim().replace(/^[（(]/, '');
    const pinyinResult = pinyin(cleanedText, { toneType: 'none', type: 'array' });
    if (pinyinResult && pinyinResult.length > 0 && pinyinResult[0] && pinyinResult[0].length > 0) {
      const initial = pinyinResult[0][0].toUpperCase();
      if (/[A-Z]/.test(initial)) {
        return initial;
      }
    }
    return '?';
  };

  const generateOptions = () => {
    if (!currentWord) return [];

    const correctAnswer = getPinyinInitial(currentWord[2]);
    const options = new Set();
    if (correctAnswer !== '?') {
      options.add(correctAnswer);
    }

    let attempts = 0;
    while (options.size < 4 && attempts < words.length * 2) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      const randomInitial = getPinyinInitial(randomWord[2]);

      if (randomInitial !== '?') {
        options.add(randomInitial);
      }
      attempts++;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (options.size < 4) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      options.add(randomLetter);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedInitial) => {
    if (showAnswer) return;

    setSelectedOption(selectedInitial);
    const correctInitial = getPinyinInitial(currentWord[2]);

    if (selectedInitial === correctInitial) {
      // Correct answer
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setSelectedOption(null);
    } else {
      // Incorrect answer
      addMistake(currentWord);
      setShowAnswer(true);
      setIsIncorrect(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setSelectedOption(null);
        setIsIncorrect(false);
      }, 1000);
    }
  };

  const handleIKnow = () => {
    // Remove the word from the session
    const newSessionWords = sessionWords.filter((_, index) => index !== currentIndex);
    setSessionWords(newSessionWords);
    // No need to increment currentIndex here as the array is re-indexed
  };

  const handleIDontKnow = () => {
    addMistake(currentWord);
    setShowAnswer(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }, 1500);
  };

  const options = useMemo(() => generateOptions(), [currentWord]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showAnswer) return;
      const key = event.key.toUpperCase();
      if (options.includes(key)) {
        handleAnswer(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, showAnswer, options]);

  if (currentIndex >= sessionWords.length) {
    return <div>Session Complete!</div>;
  }

  return (
    <div className="word-page-container">
      <Link to="/" className="exit-button">退出</Link>
      <Progress percent={((currentIndex + 1) / sessionWords.length) * 100} showInfo={false} />
      <div className="progress-text">{`${currentIndex + 1} / ${sessionWords.length}`}</div>

      <div className="word-display">
        <h1>{currentWord[3].split('(')[0]}</h1>
      </div>

      {showAnswer && (
        <div className="answer-feedback">
          <p>{currentWord[2]}</p>
          {currentWord[3].split('(').length > 1 && <p>({currentWord[3].split('(')[1].replace(')', '')})</p>}
        </div>
      )}

      <div className="options-container">
        <Radio.Group
          onChange={(e) => handleAnswer(e.target.value)}
          value={selectedOption}
          buttonStyle="solid"
          size="large"
        >
          <Space>
            {options.map((option) => (
              <Radio.Button
                key={option}
                value={option}
                className={
                  selectedOption === option && isIncorrect
                    ? 'incorrect-option'
                    : ''
                }
              >
                {option}
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className="action-buttons">
        <Button type="primary" danger onClick={handleIDontKnow}>
          不认识
        </Button>
        <Button type="primary" className="success-button" onClick={handleIKnow}>
          我认识
        </Button>
      </div>
    </div>
  );
};

export default WordPage;