import { state,increase,decrease,get } from './actions.js';

increase(state);
decrease(state)
get(state)

state = {
    value: 1,
}

export const createStore = (initial) => {
    let state = [initial]
    const update = (action) =>{
        if (typeof action !== 'function'){
            throw new Error('action is required to be a function')
        }
        const prev = Object.freeze({...state[0]})
        const next = Object.freeze({...action(prev)})

        state.unshift(next)
    }
    return {
        update,
    }
}

