// import './App.scss';
import React, { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../../StoreContext';
import useFetch from '../../hooks/useFetch';

import Shelf from '../../components/Shelf';
import Error from '../../helper/Error';
import Loading from '../../helper/Loading';
import { Get_Pokemons, Get_Pokemons_By_Type } from '../../services/Api';
import iconTypePokemon from '../../images/icon-type-pokemon.png';
import Menutypes from '../../components/MenuTypes';

import Banner from '../../images/Banner-principal.jpg';

import './index.scss';

function Home() {
  const datas = useContext(StoreContext);
  const { setOpenType, search, setSearch } = datas;
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
  const [msgNotSearch, setMsgNotSearch] = useState(false);
  const [type, setType] = useState(false);
  const [page, setPage] = useState();

  const { response, error, loading, request } = useFetch();

  useEffect(() => {
    setPage(24);
  }, []);

  useEffect(() => {
    if (!type) {
      const { url, options } = Get_Pokemons(24, page);
      request(url, options);
    } else {
      const { url, options } = Get_Pokemons_By_Type(type);

      request(url, options);
    }
  }, [page, type]);

  useEffect(() => {
    if (response && !type) {
      var newState = [...pokemons, ...response.results];
      setPokemons(newState);
    } else if (response && type) {
      var newState = [...pokemons, ...response.pokemon];
      setPokemons(newState);
    }
  }, [response]);

  function updateType(type) {
    setPokemons([]);
    setSearch('');
    setType(type);
  }

  useEffect(() => {
    if (search !== '') {
      const filteredPokemons = pokemons.filter(function (pokemon) {
        var name =
          pokemon.pokemon !== undefined ? pokemon.pokemon.name : pokemon.name;

        return name.includes(search);
      });

      if (filteredPokemons.length) {
        setPokemonsFiltered(filteredPokemons);
        setMsgNotSearch(false);
      } else {
        setPokemonsFiltered([]);
        setMsgNotSearch(
          'Sorry No Pokemon found! Try filtering by pokemon type',
        );
      }
    } else {
      setPokemonsFiltered([]);
      setMsgNotSearch(false);
    }
  }, [search]);

  function getMorePokemons(e) {
    setPage(page + 24);
  }

  return (
    <div className="home">
      <div className="banner-top">
        <img src={Banner} alt="Banner-pokedex" />
      </div>
      <div className="container filter__types">
        <button className="icon__type" onClick={(e) => setOpenType(true)}>
          <img src={iconTypePokemon} alt="icon-open" />
          <span>Filter by Type</span>
        </button>
        <Menutypes updateType={updateType} />
      </div>
      {error && <Error error={error} />}
      {loading && <Loading />}

      {msgNotSearch && <h2 className="container">{msgNotSearch}</h2>}
      <ul className="container shelf__pokemons">
        {pokemons
          ? !pokemonsFiltered.length &&
            pokemons.map((item, key) => <Shelf key={key} req={item} />)
          : ''}

        {pokemonsFiltered.length
          ? pokemonsFiltered.map((item, key) => (
              <Shelf key={item.name} req={item} />
            ))
          : ''}
      </ul>

      {!type && (
        <button className="button__seeMore" onClick={(e) => getMorePokemons()}>
          Veja Mais
        </button>
      )}
    </div>
  );
}

export default Home;
