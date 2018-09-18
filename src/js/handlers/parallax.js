const parallax = viewport => {
  // cache nodes to parallax
  const nodes = Array.from(document.querySelectorAll('[data-parallax]'))

  // return a function that updates CSS variable used for parallax
  return () => nodes.forEach(node => {
    // node bounding rect
    const bounds = node.getBoundingClientRect()

    // viewport checks
    const inTop = bounds.top > (0 - bounds.height)
    const inBottom = bounds.top < viewport.height

    // if not in viewport, exit early
    if (!inTop || !inBottom) return

    // find offset from middle of viewport
    const offset = bounds.top - (viewport.height / 2) + (bounds.height / 2)

    // adjust offset to be relative to half the viewport height, plus half the height of the node
    // value ranges from -1 to 1
    const relative = offset / ((viewport.height / 2) + (bounds.height / 2))

    // adjust CSS variable value
    node.style.setProperty('--parallax', relative)
  })
}

export default parallax
