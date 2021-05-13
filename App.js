import Axios from "axios";
import { useState } from "react";
import "./app.css";
import RecipeTile from "./components/recipe-tile";
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const[healthLabels,sethealthLabels] = useState("vegan");

  const YOUR_APP_ID = `c1fc15d7`;
  const YOUR_APP_KEY = "4d977c53aa3ba00dfe867186854b0d3d";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>DEVIS Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter ingridient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />

        <select className="healthLabels">
          <option onClick={()=>sethealthLabels("vegan")}>Vegetarian</option>
          <option onClick={()=>sethealthLabels("sugar-free")}>sugarfree</option>
          <option onClick={()=>sethealthLabels("gluton-free")}>glutonfree</option>
          <option onClick={()=>sethealthLabels("low sugar")}>low sugar</option>
          <option onClick={()=>sethealthLabels("egg-free")}>egg-free</option>
          <option onClick={()=>sethealthLabels("dairy-free")}>dairy-free</option>

        </select>

      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;