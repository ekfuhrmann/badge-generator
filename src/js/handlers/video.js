const video = viewport => {
  // create video configuration objects
  // each object contains the video node, and booleans representing loading/playing status
  const videos = Array
    .from(document.getElementsByTagName('video'))
    .map(element => ({
      node: element,
      isLoading: false,
      isPlaying: false
    }))

  // return a function that loads and/or plays videos, based on viewport
  return () => videos.forEach((config, index) => {
    // video bounding rect
    const bounds = config.node.getBoundingClientRect()

    // viewport checks
    const shouldLoad = bounds.top < viewport.height
    const shouldPlay = bounds.top < (viewport.height * .5)

    // if needed, load it
    if (!config.isLoading && shouldLoad) {
      // append source element
      const child = document.createElement('source')
      child.setAttribute('type', 'video/mp4')
      child.setAttribute('src', config.node.getAttribute('data-src'))
      config.node.appendChild(child)

      // add loading class
      config.node.classList.add('is-loading')

      // prevent duplication
      config.isLoading = true
    }

    // if needed, play it
    if (!config.isPlaying && shouldPlay) {
      // play immediately or bind event to play when possible
      config.node.readyState >= 2
        ? config.node.play()
        : config.node.addEventListener('canplaythrough', () => config.node.play())

      // prevent duplication
      config.isPlaying = true
    }

    // if loaded and playing, remove from videos array
    if (config.isLoading && config.isPlaying) {
      videos.splice(index, 1)
    }
  })
}

export default video
