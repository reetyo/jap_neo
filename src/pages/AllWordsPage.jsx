import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import words from '../words.json';
import './AllWordsPage.css';
import { lessonMap } from '../lessonMap';

const AllWordsPage = () => {

  // A new approach to avoid re-calculating lesson numbers during render
  const wordsWithLessons = words.map(word => ({
    ...word,
    lesson: lessonMap[word[0]]
  }));

  return (
    <div className="all-words-container">
      <h2>单词表</h2>
      <div className="all-words-list-container">
        <List
          dataSource={wordsWithLessons}
          renderItem={(item, index) => {
            const showHeader = index === 0 || item.lesson !== wordsWithLessons[index - 1].lesson;
            
            const word = item[3] ? item[3].split('(')[0] : '';
            const readingParts = item[3] ? item[3].split('(') : [];
            const reading = readingParts.length > 1 ? readingParts[1].replace(')', '') : '';
            const meaning = item[2] || '';
            const type = item[1] || '';

            return (
              <>
                {showHeader && <div className="lesson-header">第 {item.lesson} 课</div>}
                <List.Item>
                  <div className="word-item">
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
              </>
            );
          }}
        />
      </div>
      <Link to="/" className="exit-button">退出</Link>
    </div>
  );
};

export default AllWordsPage;