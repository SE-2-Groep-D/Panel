import {apiConfig} from "./config.js";

export * from './api';
export * from './config';
export * from './roles.js';

export function getHostName() {
    const hostname = (apiConfig.inDevelopment) ? apiConfig.development : apiConfig.production;
    return (hostname.endsWith('/')) ? hostname.slice(0, -1) : hostname;
}