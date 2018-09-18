const inview = checkFuncs => {
  let ticking

  const handleEvent = () => {
    // if already in a frame, exit early
    if (ticking) return

    // otherwise request one
    window.requestAnimationFrame(handleFrame)
    ticking = true
  }

  const handleFrame = () => {
    // run each check function
    checkFuncs.forEach(func => func())

    // indicate the frame is complete
    ticking = false
  }

  // check initial viewport
  handleEvent()

  // bind passive scroll event listener
  window.addEventListener('scroll', handleEvent, { passive: true })
}

export default inview
