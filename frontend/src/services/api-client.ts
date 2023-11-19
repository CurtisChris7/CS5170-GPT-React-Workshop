import axios, { CanceledError } from 'axios';

// Creates an axios connection to the set baseurl
export default axios.create({
    baseURL: "http://127.0.0.1:8080/"
})

export { CanceledError };
