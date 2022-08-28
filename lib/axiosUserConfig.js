import axios from "axios";

const interceptAxios = axios.create({
  baseURL: "https://eyob-food-recipe.herokuapp.com/",
});

export default interceptAxios;
