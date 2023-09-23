import { useState, useReducer } from 'react';
import './index.css';

const languages = [
  {id: 1, name: "HTML"},
  {id: 2, name: "CSS"},
  {id: 3, name: "JavaScript"},
  {id: 4, name: "React"},
  {id: 5, name: "Python"},
];

const defaultState = {
  items: languages,
  isLoading: false
}

const reducer = (state, action) => {
  if (action.type === 'DELETE_ITEM') {
    const newItems = state.items.filter((item) => item.id !== action.payload.id);
    return {...state, items: newItems};
  }
  if (action.type === 'CLEAR_ITEM') {
    return {...state, items: []};
  }
  if (action.type === 'RESET_ITEM') {
    return {...state, items: languages};
  }

  throw new Error(`No matching "${action.type}" - action type`);
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: {id}});
  }
  const clearItem = () => {
    dispatch({ type: 'CLEAR_ITEM'});
  }
  const resetItem = () => {
    dispatch({ type: 'RESET_ITEM'});
  }
  return (
    <div className="container">
      <h2>Use Reducer for Removing items</h2>
      {state.items.map((item) => {
        const { id, name } = item;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button 
            className="btn" 
            onClick={() => deleteItem(id)}>
              Delete
            </button>
          </div>
        );
      })}
      {
        state.items.length < 1 ? (
          <button 
          className="btn reset-btn"
          onClick={resetItem}>
            Reset
          </button>
        ) : (
          <button className='btn clear-btn'
          onClick={clearItem}>
            Clear
          </button>
        )}
    </div>
  );
}

export default App
