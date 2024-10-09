// if the pen is in thumbnail view, scale it up
if (location.pathname.match(/fullcpgrid/i) ? true : false) {
    document.documentElement.style.fontSize = "32px"
    document.querySelector(".notifications").style.transform = "translate(0.5rem, calc(-50% + 3rem))"
  }
  
  
  class Notifications {
    constructor(el) {
      this.el = el
    }
    
    // function to create new elements with a class (cleans up code)
    createDiv(className = "") {
      const el = document.createElement("div")
      el.classList.add(className)
      return el
    }
    // function to add text nodes to elements
    addText(el, text) {
      el.appendChild(document.createTextNode(text))
    }
    
    create(
      title = "Untitled notification",
      description = "",
      duration = 2,
      destroyOnClick = false,
      clickFunction = undefined
    ) {
      
      // functions
      function destroy(animate) {
        if (animate) {
          notiEl.classList.add("out")
          notiEl.addEventListener("animationend", () => {notiEl.remove()})
        } else {
          notiEl.remove()
        }
      }
      
      // create the elements and add their content
      const notiEl = this.createDiv("noti")
      const notiCardEl = this.createDiv("noticard")
      const glowEl = this.createDiv("notiglow")
      const borderEl = this.createDiv("notiborderglow")
      
      const titleEl = this.createDiv("notititle")
      this.addText(titleEl, title)
      
      const descriptionEl = this.createDiv("notidesc")
      this.addText(descriptionEl, description)
      
      // append the elements to each other
      notiEl.appendChild(notiCardEl)
      notiCardEl.appendChild(glowEl)
      notiCardEl.appendChild(borderEl)
      notiCardEl.appendChild(titleEl)
      notiCardEl.appendChild(descriptionEl)
      
      this.el.appendChild(notiEl)
      
      // transition the height of the container to the height of the visible card
      console.log("height", notiCardEl.scrollHeight)
      requestAnimationFrame(function() {
        notiEl.style.height = "calc(0.25rem + " + notiCardEl.getBoundingClientRect().height + "px)";
      });
  
      // hover animation
      notiEl.addEventListener("mousemove", (event) => {
        const rect = notiCardEl.getBoundingClientRect()
        const localX = (event.clientX - rect.left) / rect.width
        const localY = (event.clientY - rect.top) / rect.height
  
        console.log(localX, localY)
        glowEl.style.left = localX * 100 + "%"
        glowEl.style.top = localY * 100 + "%"
  
        borderEl.style.left = localX * 100 + "%"
        borderEl.style.top = localY * 100 + "%"
      });
      
      // onclick function if one is set
      if (clickFunction != undefined) {
        notiEl.addEventListener("click", clickFunction)
      }
      
      // destroy the notification on click if it is set to do so
      if (destroyOnClick) {
        notiEl.addEventListener("click", () => destroy(true))
      }
      
      
      // remove the notification after the set time if there is one
      if (duration != 0) {
        setTimeout(() => {
          notiEl.classList.add("out")
          notiEl.addEventListener("animationend", () => {notiEl.remove()})
        }, duration * 1000)
      }
      return notiEl
    }
  }
  
  
  notis = new Notifications(document.querySelector(".notifications"))