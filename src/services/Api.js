export const API_URL = 'https://pokeapi.co/api/v2/';

// Solicita o token do usuario após autenticação
export function Get_Type(type) {
  return {
    url: API_URL + `type/${type}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function Get_Pokemons(limit, offset) {
  return {
    url: API_URL + `pokemon?limit=${limit}&offset=${offset}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function Get_Pokemon(name) {
  return {
    url: API_URL + `pokemon/${name}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function Get_Types() {
  return {
    url: API_URL + `type`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function Get_Pokemons_By_Type(type) {
  return {
    url: API_URL + `type/${type}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
