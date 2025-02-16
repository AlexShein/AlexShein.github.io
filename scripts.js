const sections = document.querySelectorAll("section")
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      } else {
        entry.target.classList.remove("visible")
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

document.querySelectorAll("summary").forEach((element) =>
  element.addEventListener("click", (event) => {
    const detailsElement = event.target.parentElement
    const contentElement = event.target.nextElementSibling

    if (contentElement.classList.contains("animation")) {
      contentElement.classList.remove("animation", "collapsing")
      void element.offsetWidth
      return
    }

    const onAnimationEnd = (cb) => contentElement.addEventListener("animationend", cb, { once: true })

    requestAnimationFrame(() => contentElement.classList.add("animation"))
    onAnimationEnd(() => contentElement.classList.remove("animation"))

    const isDetailsOpen = detailsElement.getAttribute("open") !== null
    if (isDetailsOpen) {
      event.preventDefault()
      contentElement.classList.add("collapsing")
      onAnimationEnd(() => {
        detailsElement.removeAttribute("open")
        contentElement.classList.remove("collapsing")
      })
    }
  }),
)

// Get the button
const backToTopButton = document.getElementById("backToTop")

// Show the button when the user scrolls down 300px from the top
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopButton.style.opacity = "1" // Show button
  } else {
    backToTopButton.style.opacity = "0" // Hide button
  }
}

// When the button is clicked, scroll to the top of the document
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
