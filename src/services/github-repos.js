import {get} from '../utils/http-github';

const getAll = (username) => get(`/users/${username}/repos`);

export {getAll};
