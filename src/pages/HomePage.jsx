import React from 'react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <Space direction="vertical" size="large">
        <Link to="/word">
          <Button type="primary" size="large" block>
            开始
          </Button>
        </Link>
        <Link to="/word">
          <Button size="large" block>
            继续
          </Button>
        </Link>
        <Link to="/settings">
          <Button size="large" block>
            设置
          </Button>
        </Link>
        <Link to="/mistakes">
          <Button size="large" block>
            错题表
          </Button>
        </Link>
      </Space>
    </div>
  );
};

export default HomePage;