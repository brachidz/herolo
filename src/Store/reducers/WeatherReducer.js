import produce from 'immer';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

import { actions } from '../actions';
import createReducer from './ReducerUtils';


export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_PRODUCT_PRICE = 'SET_PRODUCT_PRICE';
const initialState = {

    a: [
        {
            id: "",
            name: "salad with cheese",
           
            price: 50,
            qty: 1,
            description: "salad with 3 kinds of cheese"
        }
    ],
    days:[
        {

        }
    ],
    currentCity:"Tel-Aviv",
    weatherText:"sunny ",
    key:"90",
    temp:"34",
    regions:[],
    cart: [],
    favourites:[],
    fiveDays:[]

}
const weather = {
    addToCart(state = initialState, action) {
        const newCart = [...state.cart, action.payload];
        state.cart = newCart;
        console.log(initialState.cart);
    },
    addToFavourites(state = initialState, action) {
        debugger
        const newFavourites = [...state.favourites, action.payload];
        state.favourites = newFavourites;
        console.log(initialState.favourites);
    },
    deleteFromFavourites(state = initialState.favourites, action) {
        debugger
        let arr = action.payload[1]
        arr = arr.filter((item) => item.id !== action.payload[1][action.payload[0]].id).map(({ id, name, weatherText }) => ({ id, name, weatherText }));
        state.favourites = arr;
        // console.log(state.cart.length); ‏
    },
    
    addToRegions(state = initialState, action) {
        debugger
        state.regions=action.payload;
        console.log(initialState.regions);
    },
    setCurrentCity(state=initialState,action){
        
    state.currentCity=action.payload;
    },
    setKey(state=initialState,action){
        
        state.key=action.payload;
        },
    setWeatherText(state=initialState,action){
        debugger
    state.weatherText=action.payload;
    },
    setTemp(state=initialState,action){
        debugger
    state.temp=action.payload;
    },


    add(state = initialState, action) {
        const index = action.payload;
        const newArray = [...state.cart];
        newArray[index].qty++;
        state.cart = newArray;
    },
    decrease(state = initialState, action) {
        const index = action.payload;
        const newArray = [...state.cart];
        if (newArray[index].qty > 0) {
            newArray[index].qty--;
        }
        state.cart = newArray;
    },
    delete(state = initialState.cart, action) {
        let arr = action.payload[1]
        arr = arr.filter((item) => item.id !== action.payload[1][action.payload[0]].id).map(({ id, name, image, price, qty, description }) => ({ id, name, image, price, qty, description }));
        state.cart = arr;
        // console.log(state.cart.length); ‏
    }

};
export default produce((state, action) => createReducer(state, action, weather), initialState);
