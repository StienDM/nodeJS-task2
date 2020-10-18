const { createLogger, format, transports } = require('winston');

class ReqInfo {
  constructor(url, params, body) {
    this.url = url;
    this.params = params;
    this.body = body;
  }
}

const logger = createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.colorize(), format.cli(), format.json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.colorize(), format.cli(), format.json())
    })
  ]
});

const logInfo = req => {
  logger.info(JSON.stringify(new ReqInfo(req.url, req.params, req.body)));
};

module.exports = { logger, logInfo, ReqInfo };
