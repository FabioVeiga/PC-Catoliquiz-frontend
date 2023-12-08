const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: "https://servico-dev-plataforma-catolica.azurewebsites.net/",
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/" : "",
    }
  }
];

module.exports = PROXY_CONFIG;
