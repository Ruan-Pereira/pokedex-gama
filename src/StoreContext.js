import React, { useState, useEffect } from 'react';

export const StoreContext = React.createContext();

export const Storage = ({ children }) => {
  const [data, setData] = useState();
  const [openCart, setOpenCart] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [valueMinicart, setValueMinicart] = useState(0);

  const addToCart = (product) => {
    var checkItem = items.find((element) => element.id === product.id);

    if (!checkItem) {
      var pokemon = {
        id: product.id,
        name: product.name,
        image: product.sprites.other.home.front_default,
        value: product.base_experience,
        qtd: 1,
      };

      setItems([...items, pokemon]);
    }

    setOpenCart(true);
  };

  const updateCart = (product, conditional) => {
    var findItemIndex = items.findIndex((element) => element.id === product.id);

    if (conditional) {
      items[findItemIndex].qtd = items[findItemIndex].qtd + 1;
    } else if (items[findItemIndex].qtd <= 1) {
      items.splice(findItemIndex, 1);
    } else {
      items[findItemIndex].qtd = items[findItemIndex].qtd - 1;
    }

    setItems([...items]);
  };

  useEffect(() => {
    const init = async () => {
      var pathname = window.location.pathname;
      setData(pathname);

      if (localStorage.getItem('minicart')) {
        var items = localStorage.getItem('minicart');
        setItems(JSON.parse(items));
      }
    };
    init();
  }, []);

  useEffect(() => {
    localStorage.setItem('minicart', JSON.stringify(items));
    var sum = items.reduce(function (accumulator, object) {
      return accumulator + object.value * object.qtd;
    }, 0);

    setValueMinicart(sum);
  }, [items]);

  return (
    <StoreContext.Provider
      value={{
        data,
        openCart,
        items,
        valueMinicart,
        openType,
        search,
        setOpenType,
        setOpenCart,
        addToCart,
        updateCart,
        setSearch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
