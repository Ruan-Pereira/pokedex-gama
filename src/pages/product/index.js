// import './App.scss';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../StoreContext';
import { useParams } from 'react-router-dom';
import Loading from '../../helper/Loading';
import useFetch from '../../hooks/useFetch';
import { Get_Pokemon } from '../../services/Api';
import BarChart from './components/Graphic.js';
import { Link } from 'react-router-dom';

import Pokebola from '../../images/Pokeball.png';
import iconHeight from '../../images/icon-height.png';
import iconWeight from '../../images/icon-weight.png';

import './index.scss';

function Product() {
  const datas = useContext(StoreContext);
  const params = useParams();
  const { response, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = Get_Pokemon(params.product);
    request(url, options);
  }, [params]);

  return (
    <div className="product">
      {error && <h2> Desculpe! Não encontramos o seu pokemon!</h2>}
      {loading && <Loading />}
      {response ? (
        <div className={`content__product bg--${response.types[0].type.name}`}>
          <div className="container">
            <div className="content__product__header">
              <div className="content__name">
                <Link to="/">⇐</Link> <h1>{response.name}</h1>
              </div>
            </div>
            <div className="content__bg">
              <img src={Pokebola} alt={response.species.name} />
            </div>
            <div className="content__img__product">
              <div className="content__img">
                <img src={response.sprites.other.home.front_default} alt="" />
              </div>
            </div>
            <div className="content__info">
              <ul className="lists__types">
                {response.types.map((item, index) => (
                  <li key={item.type.name} className={`bg--${item.type.name}`}>
                    {item.type.name}
                  </li>
                ))}
              </ul>
              <div className="content__info__specifications">
                <div className="measurements__weight">
                  <div className="measurements__header">
                    <img src={iconWeight} alt={response.species.name} />
                    {`${response.weight} `} kg
                  </div>
                  <p>weight</p>
                </div>
                <span className="specifications__separator"></span>
                <div className="measurements__height">
                  <div className="measurements__header">
                    <img src={iconHeight} alt={response.species.name} />
                    {`${response.height} `} cm
                  </div>
                  <p>height</p>
                </div>
                <span className="specifications__separator"></span>
                <div className="content__abilities">
                  <div className="content__header">
                    {response.abilities.map((item, index) => (
                      <strong key={item.ability.name}>
                        {item.ability.name}
                      </strong>
                    ))}
                  </div>
                  <p>Abilities</p>
                </div>
              </div>
              <h4
                className={`product__title color--${response.types[0].type.name}`}
              >
                Base Stats
              </h4>

              <div>
                <BarChart stats={response.stats} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Product;

// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'
