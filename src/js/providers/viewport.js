const viewport = () => {
  const sizes = {}

  const capture = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  }

  let timeout

  const handler = () => {
    clearTimeout(timeout)
    timeout = setTimeout(capture, 250)
  }

  // capture initial size
  capture()

  // bind resize handler
  window.addEventListener('resize', handler)

  // return sizes object
  return sizes
}

export default viewport
