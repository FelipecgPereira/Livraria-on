import axios from "axios";
//Neste Link Voce vai colocar a url de consumo da api
const api = axios.create({
  baseURL: "https://rocketseat-node.herokuapp.com/api"
});

export default api;
