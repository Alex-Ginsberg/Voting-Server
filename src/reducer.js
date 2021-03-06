import {setEntries, next, vote, INITIAL_STATE} from './core'

/*
    Reducer: a generic function that takes any kind of 
    action along with the current state, and invokes
    the core function that matches the action
*/
export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries)
        case 'NEXT':
            return next(state)
        case 'VOTE':
            return state.update('vote', voteState => vote(voteState, action.entry))
    }
    return state
}