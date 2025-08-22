import React, { useState, useEffect } from 'react';
import './SessionSetupModal.css';
import wordsData from '../words.json';
import { lessonMap } from '../lessonMap';

const SessionSetupModal = ({ onStart, onCancel }) => {
  const [lessons, setLessons] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const allLessons = [...new Set(wordsData.map(word => lessonMap[word[0]]).filter(l => l != null))];
    allLessons.sort((a, b) => a - b);
    setLessons(allLessons);
  }, []);

  const handleLessonToggle = (lesson) => {
    setSelectedLessons(prev =>
      prev.includes(lesson)
        ? prev.filter(l => l !== lesson)
        : [...prev, lesson]
    );
  };

  const handleStart = () => {
    onStart({
      lessons: selectedLessons.length > 0 ? selectedLessons : lessons,
      shuffle,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>学习设置</h2>
        
        <div className="lesson-selection">
          <h3>选择课程</h3>
          <div className="lesson-grid">
            {lessons.map(lesson => (
              <button
                key={lesson}
                className={`lesson-button ${selectedLessons.includes(lesson) ? 'selected' : ''}`}
                onClick={() => handleLessonToggle(lesson)}
              >
                {`第 ${lesson} 课`}
              </button>
            ))}
          </div>
        </div>

        <div className="shuffle-option">
          <h3>乱序学习</h3>
          <label className="switch">
            <input type="checkbox" checked={shuffle} onChange={() => setShuffle(!shuffle)} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="modal-actions">
          <button className="start-button" onClick={handleStart}>开始学习</button>
          <button className="cancel-button" onClick={onCancel}>取消</button>
        </div>
      </div>
    </div>
  );
};

export default SessionSetupModal;