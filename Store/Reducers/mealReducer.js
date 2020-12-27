
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVS } from '../Actions/mealActions';
import { SET_FILTERS } from '../Actions/mealActions';
const initialState={
    meals:MEALS,
    filteredMeals : MEALS,
    favouriteMeals : []

}
const mealReducer=(state=initialState,action)=>{
    switch (action.type) {
        case TOGGLE_FAVS:
            const getIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)
            if(getIndex >=0 )
            {
                const updatedFavs = [...state.favouriteMeals];
                updatedFavs.splice(getIndex,1)
               return { ...state, favouriteMeals : updatedFavs}
            }
            else{
                const mealToBeAdded = state.meals.find(meal=>meal.id === action.mealId)
               return {...state,favouriteMeals:state.favouriteMeals.concat(mealToBeAdded)}
            }
            
        case SET_FILTERS:
           const appliedFilters = action.filters;
           const updatedFilteredMeals = state.meals.filter(meal=>{
               if(appliedFilters.GlutenFree && !meal.isGlutenFree)
               {
                   return false;
               }
               if(appliedFilters.LactoseFree && !meal.isLactoseFree)
               {
                   return false;
               }
               if(appliedFilters.Vegetarian && !meal.isVegeterian)
               {
                   return false;
               }
               if(appliedFilters.Vegan && !meal.isVegan)
               {
                   return false;
               }
               return true
            })
           return {...state, filteredMeals:updatedFilteredMeals}
        default:
            return state;
    }
}
export default mealReducer;