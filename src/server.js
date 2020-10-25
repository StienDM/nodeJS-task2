const { PORT } = require('./common/config');
const app = require('./app');

const { connect } = require('./db/db.client');

connect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
