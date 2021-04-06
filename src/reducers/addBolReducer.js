const initialState = {
    bolEntered: []
};

const addBolReducer = (bolEntered = initialState.bolEntered, action) => {
    if(action.type === 'ADD_BOL'){
        return [
            ...bolEntered.slice(0, action.index),
            action.payload,
            ...bolEntered.slice(action.index+1)
        ]
    }else{ 
        return bolEntered;
    }
}

export default addBolReducer;