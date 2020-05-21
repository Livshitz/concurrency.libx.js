import Deferred from './Deferred';

const sleep = async (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));

    // var stop = new Date().getTime();
    // while(new Date().getTime() < stop + millis) {
    // 	;
    // }
}

export default sleep;