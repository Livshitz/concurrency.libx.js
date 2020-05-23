import * as all from './index';
const concurrency = {...all};

if ((<any>window).libx == undefined) (<any>window).libx = {};
(<any>window).libx.concurrency = concurrency;
