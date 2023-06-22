function sidebarReducer(state = false, action) {
  switch (action.type) {
    case 'sidebar': {
      const { show } = action
      if (typeof show === 'function') return show(state)
      else return show
    }

    default:
      return state
  }
}

export default sidebarReducer
