import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/`
});

export default axiosClient;