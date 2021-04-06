const addBolAction = (payload, index) => {
    return {
        type: 'ADD_BOL',
        index: index,
        payload
    };
}

export default addBolAction;