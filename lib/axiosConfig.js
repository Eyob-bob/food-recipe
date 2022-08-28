import axios from "axios";

const instance = axios.create({
  baseURL: "https://eyob-food-recipe.herokuapp.com/",
});

export default instance;
