import React, { useState, useEffect } from 'react';
import { Switch, Button, Modal, message, Card, Avatar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
  const [randomOrder, setRandomOrder] = useState(false);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setRandomOrder(savedSettings.randomOrder);
    }
  }, []);

  const handleRandomOrderChange = (checked) => {
    setRandomOrder(checked);
    const settings = { randomOrder: checked };
    localStorage.setItem('settings', JSON.stringify(settings));
    message.success(checked ? '已开启乱序学习' : '已关闭乱序学习');
  };

  return (
    <div className="settings-page-container">
      <h2 className="settings-title">通用设置</h2>
      <div className="settings-cards">
        <Card className="setting-card">
          <div className="card-content">
            <Avatar size={48} icon={<SettingOutlined />} className="card-avatar" />
            <div className="card-text">
              <h3>乱序学习</h3>
              <p>开启后，单词将以随机顺序出现</p>
            </div>
            <Switch checked={randomOrder} onChange={handleRandomOrderChange} />
          </div>
        </Card>
      </div>
      <Link to="/" className="exit-button">退出</Link>
    </div>
  );
};

export default SettingsPage;