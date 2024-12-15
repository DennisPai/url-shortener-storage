const express = require('express');
const cors = require('cors');
const app = express();

// 基本配置
app.use(cors());
app.use(express.json());

// 用於存儲 URL 的物件
let urlStorage = {};

// 測試路由
app.get('/', (req, res) => {
  res.send('URL Shortener Storage Service is running!');
});

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// 讀取 URLs
app.get('/api/urls.json', (req, res) => {
  try {
    res.json(urlStorage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve URLs' });
  }
});

// 更新 URLs
app.put('/api/urls.json', (req, res) => {
  try {
    urlStorage = req.body;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update URLs' });
  }
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 啟動服務器
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
