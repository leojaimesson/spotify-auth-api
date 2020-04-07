import './configs/DevEnv';
import application from './configs/Express';

application.listen(process.env.SERVER_PORT, () => {
  console.log('serve started.');
});
