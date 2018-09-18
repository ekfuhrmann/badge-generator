const router = () => {
  const handleEvent = event => {
    let current = event.target

    // walk up DOM tree
    while (!current.hasAttribute('data-route')) {
      current = current.parentElement

      // if no more nodes to climb, exit early
      if (current === document.body) break
    }

    // cache route path
    const route = current.getAttribute('data-route')

    // if no route was found, exit early
    if (!route) return

    // if route found, pass to PJAX handler
    handlePJAX(route)
  }

  const handlePJAX = route => {
    console.log(route)
  }

  document.addEventListener('click', handleEvent)
}

export default router
