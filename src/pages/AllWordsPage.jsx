import React, { useState, useMemo } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import words from '../words.json';
import './AllWordsPage.css';
import { lessonMap } from '../lessonMap';
import LessonFilterModal from './LessonFilterModal';

const AllWordsPage = () => {
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const wordsWithLessons = useMemo(() => words.map(word => ({
    ...word,
    lesson: lessonMap[word[0]]
  })), []);

  const filteredWords = useMemo(() => {
    if (selectedLessons.length === 0) {
      return wordsWithLessons;
    }
    return wordsWithLessons.filter(word => selectedLessons.includes(word.lesson));
  }, [selectedLessons, wordsWithLessons]);

  const handleApplyFilter = (lessons) => {
    setSelectedLessons(lessons);
    setIsFilterModalVisible(false);
  };

  const handleCancelFilter = () => {
    setIsFilterModalVisible(false);
  };

  const getButtonText = () => {
    if (selectedLessons.length === 0) {
      return '选择课程';
    }
    if (selectedLessons.length === 1) {
      return `第 ${selectedLessons[0]} 课`;
    }
    return `已选 ${selectedLessons.length} 课`;
  }

  return (
    <div className="all-words-container">
      <h2>单词表</h2>
      <div className="lesson-selector-container">
        <button onClick={() => setIsFilterModalVisible(true)} className="lesson-selector-button">
          {getButtonText()}
        </button>
      </div>
      {isFilterModalVisible && (
        <LessonFilterModal 
          onApply={handleApplyFilter} 
          onCancel={handleCancelFilter}
          currentLessons={selectedLessons} 
        />
      )}
      <div className="all-words-list-container">
        <List
          dataSource={filteredWords}
          renderItem={(item, index) => {
            const showHeader = selectedLessons.length === 0 && (index === 0 || item.lesson !== filteredWords[index - 1].lesson);
            
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