import React, { useState, useEffect } from 'react';
import { Button, List, message } from 'antd';
import { Link } from 'react-router-dom';
import words from '../words.json';
import './MistakesPage.css';

const MistakesPage = () => {
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    const savedMistakes = JSON.parse(localStorage.getItem('mistakes')) || [];
    setMistakes(savedMistakes);
  }, []);

  const handleClearMistakes = () => {
    localStorage.removeItem('mistakes');
    setMistakes([]);
    message.success('错题本已清除');
  };

  return (
    <div className="mistakes-container">
      <h2>错题本</h2>
      {mistakes.length > 0 ? (
        <>
          <div className="mistakes-list-container">
            <List
              dataSource={mistakes}
              renderItem={item => {
                if (!Array.isArray(item) || item.length < 4) {
                  return <List.Item>无效数据</List.Item>;
                }

                const word = item[3] ? item[3].split('(')[0] : '';
                const readingParts = item[3] ? item[3].split('(') : [];
                const reading = readingParts.length > 1 ? readingParts[1].replace(')', '') : '';
                const meaning = item[2] || '';
                const type = item[1] || '';

                return (
                  <List.Item>
                    <div className="mistake-item">
                      <div className="word-info">
                        <p className="japanese-word">{word}</p>
                        <p className="chinese-meaning">{meaning}</p>
                      </div>
                      <div className="word-details">
                        <p className="word-type">{type}</p>
                        <p className="reading">{reading}</p>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
          <Button type="primary" danger onClick={handleClearMistakes} style={{ marginTop: '20px' }}>
            清除错题本
          </Button>
        </>
      ) : (
        <p>当前没有错题</p>
      )}
      <Link to="/" className="exit-button">退出</Link>
    </div>
  );
};

export default MistakesPage;