import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function About() {
  return (
    <Content style={{ padding: '20px', backgroundColor: 'white' }}>
      <div>Version: v0.1.0 beta</div>
    </Content>
  );
}

export default About;
