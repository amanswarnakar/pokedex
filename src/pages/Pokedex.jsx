import { Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

const Pokedex = () => {
  let navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([...pokemons]);
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [refresh, setRefresh] = useState(false);

  const getPokemons = () => {
    // let id;
    for (let id = 1; id <= 151; id++) {
      // console.log(id);
      // id == 150 && setRefresh(prev => !prev)
      const url = "https://pokeapi.co/api/v2/pokemon/" + id;
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // setFilteredPokemons(
          //   (prev) => !filteredPokemons.includes(data) && [...prev, data]
          // );
          setPokemons((prev) => !pokemons?.includes(data) && [...prev, data]);
          /* .then(() => {
            setPokemons(
              pokemons.sort((p1, p2) =>
                p1.id < p2.id ? 1 : p1.id > p2.id ? -1 : 0
              )
            );
          } ); */
        });
    }
    // if (id == 800) {
    // console.log(filteredPokemons);
    // }
  };
  // console.log(filteredPokemons);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.sort((p1, p2) => (p1.id > p2.id ? 1 : p1.id < p2.id ? -1 : 0))
    );
  }, [pokemons?.length]);

  const goToHomePage = () => {
    navigate("/pokedex/", { replace: true });
  };

  const titleCase = (s) =>
    s
      ?.replace(/^[-_]*(.)/, (_, c) => c?.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => " " + c?.toUpperCase());

  const Card = (props) => {
    const { details } = props;
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

    const id = details?.id.toString().padStart(3, "0");
    const pokeTypes = details?.types?.map((type) => type.type.name);
    const type = mainTypes?.filter(
      (type) => details?.types?.map((type) => type.type.name).indexOf(type) > -1
    );
    const color = colors[type[0]];
    const style = { backgroundColor: color };
    const name = details.name[0].toUpperCase() + details.name.slice(1);

    return (
      <div
        className="poke-card"
        style={style}
        onClick={() => {
          navigate("/pokemon/" + details?.id, { replace: true });
        }}
      >
        <div className="img-container">
          <img src={details?.sprites?.front_default} alt="" />
        </div>
        <div className="info">
          <span className="number">#{id}</span>
          <h3 className="name">{titleCase(name)}</h3>
          <small className="type">
            Type: <span>{titleCase(type[0])}</span>
          </small>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setFilteredPokemons(pokemons);
    if (searchTerm !== "" || searchTerm !== null) {
      const searchPokemons = (term) => {
        return pokemons?.filter((data) => {
          return data?.name?.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
      };
      // console.log(searchTerm);
      setFilteredPokemons(searchPokemons(searchTerm));
      // console.log(searchPokemons(searchTerm));
    }
  }, [searchTerm]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
    if (searchType !== "" || searchType !== null) {
      const filterPokemons = (term) => {
        return pokemons?.filter((data) => {
          const pokeTypes = data?.types?.map((type) => type.type.name);
          const temp = pokeTypes?.filter(
            (type) => type.toLowerCase().indexOf(term.toLowerCase()) > -1
          );
          if (temp.length) {
            return data;
          }
        });
      };
      setFilteredPokemons(filterPokemons(searchType));
    }
  }, [search]);


  // useEffect(() => {
  //   setRefresh(prev => !prev);
  // }, [searchTerm, search])
  

  // console.log(filteredPokemons);

  return (
    <div className="pokedex-container">
      <div className="back-route" onClick={goToHomePage}>
        <h1>Pokédex</h1>
        <h1 className="background-header">Pokédex</h1>
      </div>
      <div className="search-bar">
        <TextField
          className="search-term"
          value={searchTerm}
          label="Search Pokémon"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          className="search-type"
          value={searchType}
          label="Filter by type"
          onChange={(e) => setSearchType(e.target.value)}
          select
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="fire">Fire</MenuItem>
          <MenuItem value="grass">Grass</MenuItem>
          <MenuItem value="water">Water</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
          <MenuItem value="ground">Ground</MenuItem>
          <MenuItem value="rock">Rock</MenuItem>
          <MenuItem value="fairy">Fairy</MenuItem>
          <MenuItem value="poison">Poison</MenuItem>
          <MenuItem value="bug">Bug</MenuItem>
          <MenuItem value="dragon">Dragon</MenuItem>
          <MenuItem value="flying">Flying</MenuItem>
          <MenuItem value="psychic">Psychic</MenuItem>
          <MenuItem value="fighting">Fighting</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          onClick={() => {
            setSearch((prev) => !prev);
            setSearchTerm("");
          }}
        >
          GO
        </Button>
      </div>
      <div className="poke-grid">
        {filteredPokemons?.length == 0 && <h2>No Pokémons to display.</h2>}
        {filteredPokemons.map((pokemon) => {
          return <Card key={pokemon.id} details={pokemon} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Pokedex;
