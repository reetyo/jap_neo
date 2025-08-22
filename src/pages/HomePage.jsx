import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import SessionSetupModal from './SessionSetupModal';
import wordsData from '../words.json';
import { lessonMap } from '../lessonMap';

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionWords = localStorage.getItem('wordSessionWords');
    if (sessionWords) {
      setIsSessionInProgress(true);
    } else {
      setIsSessionInProgress(false);
    }
  }, []);

  const handleStartNewSessionClick = () => {
    setIsModalVisible(true);
  };

  const handleStartSession = (settings) => {
    const { lessons, shuffle } = settings;

    let sessionWords = wordsData.filter(word => lessons.includes(lessonMap[word[0]]));

    if (shuffle) {
      for (let i = sessionWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sessionWords[i], sessionWords[j]] = [sessionWords[j], sessionWords[i]];
      }
    }

    localStorage.setItem('wordSessionWords', JSON.stringify(sessionWords));
    localStorage.removeItem('wordSessionCurrentIndex');

    setIsModalVisible(false);
    navigate('/word');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContinueSession = () => {
    navigate('/word');
  };

  return (
    <div className="home-container">
      <Space direction="vertical" size="large">
        <Button type="primary" size="large" block onClick={handleStartNewSessionClick}>
          开始
        </Button>
        <Button size="large" block disabled={!isSessionInProgress} onClick={handleContinueSession}>
          继续
        </Button>
        {/* <Link to="/settings">
          <Button size="large" block>
            设置
          </Button>
        </Link> */}
        <Link to="/mistakes">
          <Button size="large" block>
            错题表
          </Button>
        </Link>
        <Link to="/all-words">
          <Button size="large" block>
            单词表
          </Button>
        </Link>
      </Space>
      {isModalVisible && (
        <SessionSetupModal
          onStart={handleStartSession}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default HomePage;