import storeFn from './store';
import { connect, createVueApp } from './init';

connect(storeFn(), createVueApp);
