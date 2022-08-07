// import './App.scss';
import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import './index.scss';

function Minicart(pokemon) {
  const datas = useContext(StoreContext);
  const { openCart, setOpenCart, items, updateCart, valueMinicart } = datas;

  useEffect(() => {
    const init = async () => {};
    init();
  }, [items]);

  return (
    items && (
      <>
        <div
          className={`overlay ${openCart ? 'overlay--active' : ''}`}
          onClick={(e) => setOpenCart(false)}
        ></div>
        <div className={`minicart ${openCart ? 'minicart--active' : ''}`}>
          <div className="minicart__header">
            <button
              className="button__closed__minicart"
              onClick={(e) => setOpenCart(false)}
            >
              ⇐
            </button>{' '}
            Store Poke
          </div>
          <div className="minicart__items">
            <ul>
              {items.map((item) => (
                <li className="minicart__item">
                  <div className="minicart__item__img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="minicart__item__info">
                    <div className="minicart__item__name">{item.name}</div>
                    <div className="minicart__item__price">
                      {item.value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </div>
                    <div className="minicart__item__quantity">
                      <button
                        className="skuquantity__button skuquantity__button--minus"
                        data-term="-1"
                        onClick={(e) => updateCart(item, 0)}
                      >
                        -
                      </button>
                      <span>{item.qtd}</span>
                      <button
                        className="skuquantity__button skuquantity__button--plus"
                        data-term="1"
                        onClick={(e) => updateCart(item, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="minicart__value">
            <span>Total: </span>{' '}
            <strong>
              {valueMinicart.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'USD',
              })}
            </strong>
          </div>
          <div className="minicart__buy__button">
            <button className="buy__button">Finalizar Compra</button>
          </div>
        </div>
      </>
    )
  );
}

export default Minicart;
