export const TOGGLE_FAVS = 'TOGGLE_FAVOURITE';
export const SET_FILTERS = 'SET_FILTERS';
export const toggleFavourites=(id)=>{
    return { type : TOGGLE_FAVS , mealId :id }
}
export const setFilters=(filterSettings)=>{
    return { type:SET_FILTERS,filters : filterSettings }
}