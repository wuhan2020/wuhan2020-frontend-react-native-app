import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

AppRegistry.registerComponent(appName, () => App);
