const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware('/api',{
      target: "http://ladserver:3080",
      changeOrigin: true,
    })
  );

  app.use(
    '/grafana',
    createProxyMiddleware('/grafana',{
      target: "http://grafalab:3000",
      secure: false,
      Connection: "keep-alive",
      changeOrigin: false,
      pathRewrite: {
        '^/grafana':''
      }
    })
  );

  app.use('/socket.io',
    createProxyMiddleware('/socket.io', {
       target: "http://ladserver:3080",
       changeOrigin: true,
       ws: false
     })
   );
};