const INITIAL_STATE = {
  reduxCart: [],
  reduxCartCounter: 0,
  cartChecker: [],
  history: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADDITEM':
      return {
        ...state,
        reduxCart: [action.payload, ...state.reduxCart]
      }
    case 'ADDITEMKEY':
      return {
        ...state,
        cartChecker: [action.payload, ...state.cartChecker]
      }
    case 'ADDCOUNTER':
      return ({
        ...state,
        reduxCartCounter: action.payload
      })
    case 'CLEARITEM':
      return {
        ...state,
        reduxCart: []
      }
    case 'RESETCOUNTER':
      return {
        ...state,
        reduxCartCounter: 0
      }
    case 'CLEARITEMKEY':
      return {
        ...state,
        cartChecker: []
      }
    case 'ADDHISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history]
      }
    default:
      return state;
  }
}
