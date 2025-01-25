const sections = document.querySelectorAll('section')
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      } else {
        entry.target.classList.remove('visible')
      }
    })
  },
  {
    threshold: 0.1,
  },
)

sections.forEach((section) => {
  observer.observe(section)
})

const canvas = document.getElementById('bgCanvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const drawPattern = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < canvas.width; i += 50) {
    for (let j = 0; j < canvas.height; j += 50) {
      ctx.beginPath()
      ctx.moveTo(i, j)
      ctx.lineTo(i + 25, j + 50)
      ctx.lineTo(i + 50, j)
      ctx.closePath()

      ctx.strokeStyle = `rgba(0, 188, 212, ${Math.random()})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }
}

drawPattern()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  drawPattern()
})

document.querySelectorAll('summary').forEach((element) =>
  element.addEventListener('click', (event) => {
    const detailsElement = event.target.parentElement
    const contentElement = event.target.nextElementSibling

    if (contentElement.classList.contains('animation')) {
      contentElement.classList.remove('animation', 'collapsing')
      void element.offsetWidth
      return
    }

    const onAnimationEnd = (cb) =>
      contentElement.addEventListener('animationend', cb, { once: true })

    requestAnimationFrame(() => contentElement.classList.add('animation'))
    onAnimationEnd(() => contentElement.classList.remove('animation'))

    const isDetailsOpen = detailsElement.getAttribute('open') !== null
    if (isDetailsOpen) {
      event.preventDefault()
      contentElement.classList.add('collapsing')
      onAnimationEnd(() => {
        detailsElement.removeAttribute('open')
        contentElement.classList.remove('collapsing')
      })
    }
  }),
)

// Get the button
const backToTopButton = document.getElementById('backToTop')

// Show the button when the user scrolls down 300px from the top
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopButton.style.opacity = '1' // Show button
  } else {
    backToTopButton.style.opacity = '0' // Hide button
  }
}

// When the button is clicked, scroll to the top of the document
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})
