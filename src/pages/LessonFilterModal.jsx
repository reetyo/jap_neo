import React, { useState, useEffect } from 'react';
import './LessonFilterModal.css';
import wordsData from '../words.json';
import { lessonMap } from '../lessonMap';

const LessonFilterModal = ({ onApply, onCancel, currentLessons }) => {
  const [lessons, setLessons] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState(currentLessons);

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

  const handleApply = () => {
    onApply(selectedLessons);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>选择课程</h2>
        <div className="lesson-selection">
          <div className="lesson-grid">
            <button
                className={`lesson-button ${selectedLessons.length === 0 ? 'selected' : ''}`}
                onClick={() => setSelectedLessons([])}
            >
                全部课程
            </button>
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
        <div className="modal-actions">
          <button className="start-button" onClick={handleApply}>确认</button>
          <button className="cancel-button" onClick={onCancel}>取消</button>
        </div>
      </div>
    </div>
  );
};

export default LessonFilterModal;