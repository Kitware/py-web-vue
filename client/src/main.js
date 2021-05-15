import 'typeface-roboto';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

import storeFn from './store';
import { connect, createVueApp } from './init';

connect(storeFn(), createVueApp);
