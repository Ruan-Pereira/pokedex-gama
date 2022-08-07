// import './App.scss';
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../StoreContext';
import useFetch from '../../hooks/useFetch';
import Error from '../../helper/Error';
import Loading from '../../helper/Loading';
import { Get_Pokemon } from '../../services/Api';
import './index.scss';

function Shelf(pokemon) {
  const datas = useContext(StoreContext);
  const { addToCart } = datas;
  const { response, error, loading, request } = useFetch();
  useEffect(() => {
    var name =
      pokemon.req.pokemon !== undefined
        ? pokemon.req.pokemon.name
        : pokemon.req.name;
    const init = async () => {
      const { url, options } = Get_Pokemon(name);
      request(url, options);
    };
    init();
  }, [pokemon]);

  return (response &&
    response.sprites.other['official-artwork'].front_default) ||
    (response && response.sprites.other.home.front_default) ? (
    <li className="shelf">
      {error && <Error error={error} />}
      {loading && <Loading />}
      <>
        <Link to={`${response.name}/p`} className="content__link">
          <div className="shelf__img">
            {!response.sprites.other.home.front_default ? (
              <img
                src={response.sprites.other['official-artwork'].front_default}
                alt=""
              />
            ) : (
              <img src={response.sprites.other.home.front_default} alt="" />
            )}
          </div>
          <h4>{response.name}</h4>
          <p>
            Price:{' '}
            <strong>
              {response.base_experience?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'USD',
              })}
            </strong>
          </p>
        </Link>
        <div className="content__addToCard">
          <button
            className={`button__addTocard bg--${response.types[0].type.name}`}
            onClick={() => addToCart(response)}
          >
            Purchase
          </button>
        </div>
      </>
    </li>
  ) : (
    ''
  );
}

export default Shelf;
