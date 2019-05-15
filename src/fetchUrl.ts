export type FetchState<T> = 'loading' | 'failed' | T;

export const fetchUrl = <T>(url: string, setState: (state: FetchState<T>) => void): void => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(json => setState(json))
    .catch(() => setState('failed'));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkStates = (...states: FetchState<any>[]): FetchState<any> => {
  if (states.includes('failed')) {
    return 'failed';
  } else if (states.includes('loading')) {
    return 'loading';
  } else {
    return states;
  }
};
