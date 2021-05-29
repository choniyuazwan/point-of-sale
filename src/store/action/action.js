export function addToReduxCart(item) {
    return dispatch => {
        dispatch({ type: 'ADDITEM', payload: item  })
    }
}

export function putKeyInCheckArray(key) {
    return dispatch => {
        dispatch({ type: 'ADDITEMKEY', payload: key  })
    }
}

export function incrementCounter(i) {
    return dispatch => {
        dispatch({ type: 'ADDCOUNTER', payload: i  })
    }
}

export function clearCart() {
    return dispatch => {
        dispatch({ type: 'CLEARITEM' })
    }
}

export function resetCounter() {
    return dispatch => {
        dispatch({ type: 'RESETCOUNTER' })
    }
}

export function clearItemKey() {
    return dispatch => {
        dispatch({ type: 'CLEARITEMKEY' })
    }
}

export function addHistory(item) {
    return dispatch => {
        dispatch({ type: 'ADDHISTORY', payload: item  })
    }
}
