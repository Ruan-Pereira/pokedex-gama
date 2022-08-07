// import './App.scss';
import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import { Get_Types } from '../../services/Api';
import useFetch from '../../hooks/useFetch';

import './index.scss';

function Menutypes({ updateType }) {
  const datas = useContext(StoreContext);
  const { openType, setOpenType } = datas;

  const { response, request } = useFetch();

  useEffect(() => {
    const init = async () => {
      const { url, options } = Get_Types();
      request(url, options);
    };
    init();
  }, []);

  return (
    <>
      <div
        className={`overlay ${openType ? 'overlay--active' : ''}`}
        onClick={(e) => setOpenType(false)}
      ></div>
      <div className={`menu__types ${openType ? 'menu__types--active' : ''}`}>
        <h3 className="menu__types__name">Filter by Types</h3>
        <ul className="content__list__types">
          {response &&
            response.results.map((item) => (
              <li
                className={`content__type color--${item.name}`}
                key={item.name}
                onClick={() => updateType(item.name)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Menutypes;
