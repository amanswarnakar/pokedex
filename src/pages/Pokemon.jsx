import React, { useState, useEffect } from "react";
// import Slider from "@mui/material/Slider";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import Footer from "./components/Footer";

const Pokemon = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const url = "http://localhost:3000/pokemon/" + id;

  const fetchDetails = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokeDetails(data);
      });

    // await fetch("https://pokeapi.glitch.me/v1/pokemon/" + id, {
    //   method: "GET",
    //   mode: "no-cors",
    //   headers: {
    //     "User-Agent": "PokedexByAman (https://sankarsankampa.com, 1.0.0)",
    //     "content-type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     Accept: "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setPokemon(data);
    //   });

    // await axios("https://pokeapi.glitch.me/v1/pokemon/" + id, {
    //   method: "get",
    //   mode: "no-cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "User-Agent": "PokedexByAman (" + url + ", 1.0.0)",
    //   },
    // }).then((response) => {
    //   console.log(response.data);
    // });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const pokeStats = pokeDetails?.stats;

  const titleCase = (s) =>
    s
      ?.replace(/^[-_]*(.)/, (_, c) => c?.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => " " + c?.toUpperCase());

  const normalAbilities = pokeDetails?.abilities?.filter(
    (ability) => !ability?.is_hidden
  );
  const hiddenAbilities = pokeDetails?.abilities?.filter(
    (ability) => ability?.is_hidden
  );
  console.log(normalAbilities, hiddenAbilities);

  const TypeChip = ({ type }) => {
    return <div className="type-chip">{titleCase(type)}</div>;
  };

  const StatBar = ({ stats }) => {
    // console.log(stats);
    const value = "" + stats.base_stat / 2.55 + "%";
    // console.log(value);
    const statStyle = { width: value };
    const [name, setName] = useState(stats.stat.name);
    name === "special-defense" && setName("sp. defense");
    name === "special-attack" && setName("sp. attack");
    return (
      <div className="stat flex">
        <div className="left">
          <div className="stat-name">{name}</div>
          <div className="stat-value-container">
            <div className="stat-border"></div>
            <div className="stat-value" style={statStyle}></div>
          </div>
        </div>
        {/* <div className="right">
          {stats.base_stat}
        </div> */}
      </div>
    );
  };

  const AbilityNormal = ({ ability }) => {
    return <div className="normal-chip">{titleCase(ability.ability.name)}</div>;
  };

  const AbilityHidden = ({ ability }) => {
    return <div className="hidden-chip">{titleCase(ability.ability.name)}</div>;
  };

  const goToHomePage = () => {
    navigate("/pokedex/", { replace: true });
  };

  const paddedId = id.toString().padStart(3, "0");

  const colors = {
    fire: "#fddfdf",
    grass: "#defde0",
    electric: "#fcf7de",
    water: "#def3fd",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#f5f5f5",
    fighting: "#e6e0d4",
    normal: "#f5f5f5",
  };
  const mainTypes = Object.keys(colors);
  const pokeTypes = pokeDetails?.types?.map((type) => type.type.name);
  const height = "" + pokeDetails?.height * 10 + " cm";
  const weight = "" + pokeDetails?.weight / 10.0 + " kgs";
  const type = mainTypes?.filter(
    (type) =>
      pokeDetails?.types?.map((type) => type.type.name).indexOf(type) > -1
  );
  const color = colors[type[0]];
  const cardStyle = { backgroundColor: color };

  console.log(pokeDetails);
  return (
    <div className="card-container">
      <div className="back-route" onClick={goToHomePage}>
        <h1>Pokédex</h1>
        <h1 className="background-header">Pokédex</h1>
      </div>
      <div className="card" style={cardStyle}>
        <div className="left flex-column">
          <div className="top">
            <img src={pokeDetails?.sprites?.front_default} alt="" />
            <div className="id">#{paddedId}</div>
            <div className="name">{titleCase(pokeDetails?.name)}</div>
          </div>
        </div>

        <div className="right">
          {/* <div className="description">{pokemon?.description}</div> */}
          <div className="bottom flex justify-between">
            <span>
              <span className="bold">Height:&nbsp;</span> {height}
            </span>
            <span>
              <span className="bold">Weight:&nbsp;</span> {weight}
            </span>
          </div>
          <div className="stats">
            {pokeStats?.map((ps) => (
              <StatBar key={ps.stat.name} stats={ps} />
            ))}
          </div>

          <div className="poke-type">
            <div className="header">Type: </div>
            {pokeTypes?.map((type) => (
              <TypeChip key={type} type={type} />
            ))}
          </div>

          <div className="ability-container">
            <div className="header">Abilities:</div>
            <div className="abilities">
              {normalAbilities?.map((ability) => (
                <AbilityNormal key={ability} ability={ability} />
              ))}
              {hiddenAbilities?.map((ability) => (
                <AbilityHidden key={ability} ability={ability} />
              ))}
            </div>
          </div>

          {/* <div className="evolution-line">
            <div className="header">Evolution Line:</div>
            <div className="flex evolution-pokemons">
              {pokemon?.family?.evolutionLine?.map((name) => {
                return (
                  <div className="evolution" key={name}>
                    {name} <ChevronRightIcon />
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pokemon;
