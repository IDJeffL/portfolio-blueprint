import { getConfig } from '../config/index.js';
export const log = (...args) => {
    if (getConfig().disableLogging) {
        return;
    }
    // eslint-disable-next-line no-console
    console.log(...args);
};
