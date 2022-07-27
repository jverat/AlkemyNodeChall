import { sequelize } from './models/sqlz'
import { createServer } from 'http'
import { app } from './app'
import { PORT } from './config'

(async () => {
  await sequelize.sync();

  createServer(app)
    .listen(
      PORT,
      () => console.info(`Server running on port ${PORT}`)
    );
})();