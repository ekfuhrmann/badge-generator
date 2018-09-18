const enter = viewport => {
  // cache top level nodes and offsets
  const sections = Array
    .from(document.querySelectorAll('main > *'))
    .map(element => ({
      node: element,
      offset: element.hasAttribute('data-offset')
        ? parseInt(element.getAttribute('data-offset'), 10)
        : 75
    }))

  // return a function that adds inview class, based on viewport
  return () => sections.forEach((config, index) => {
    // node bounding rect
    const bounds = config.node.getBoundingClientRect()

    // check if in viewport
    const shouldEnter = bounds.top < (viewport.height * (config.offset / 100))

    // if not in viewport, exit early
    if (!shouldEnter) return

    // add inview class
    config.node.classList.add('is-viewport')

    // remove from sections array
    sections.splice(index, 1)
  })
}

export default enter
