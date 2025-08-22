import React, { useState, useEffect } from 'react';
import { Switch, Button, Modal, message, Card, Avatar } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
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

  const showClearConfirm = () => {
    Modal.confirm({
      title: '确认清除错题本吗？',
      content: '此操作不可恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        localStorage.removeItem('mistakes');
        message.success('错题本已清除');
      },
    });
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
        <Card className="setting-card">
          <div className="card-content">
            <Avatar size={48} icon={<DeleteOutlined />} className="card-avatar" />
            <div className="card-text">
              <h3>清除错题本</h3>
              <p>将清除所有已记录的错题</p>
            </div>
            <Button type="primary" danger onClick={showClearConfirm}>
              清除
            </Button>
          </div>
        </Card>
      </div>
      <Link to="/" className="exit-button">退出</Link>
    </div>
  );
};

export default SettingsPage;