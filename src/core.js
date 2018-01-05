import {List, Map} from 'immutable'

export function setEntries(state, entries) {
    return state.set('entries', List(entries))
}

export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    })
}

/*
    How updateIn works:
    Reach into the nested data structure path [vote, tally, Trainspotting]
    If the value at the end of the path is missing, make it 0
    Update the value with the third argument
*/
export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    )
}
