// Mobile Hamburger Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Menu close hoga jab kisi link par click hoga (Mobile View)
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// Dynamic Typing Effect
const roles = ["Frontend Developer",  "UI/UX ", "Web Creator"];
let roleIndex = 0;
let charIndex = 0;
const typingTextElement = document.getElementById("typing-text");

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingTextElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingTextElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});




// Animated Counters on Scroll
const statCards = document.querySelectorAll('.stat-card h4');
let animated = false;

window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about-section');
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
        statCards.forEach(counter => {
            const target = +counter.innerText.replace('+', '').replace('%', '');
            let count = 0;
            const speed = target / 30; // speed control

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + "+";
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
                }
            };
            updateCount();
        });
        animated = true;
    }
});



// Dynamic Filtering for Frontend Tabs
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
});


//  all project show
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const viewMoreBtn = document.getElementById('view-more-btn');
  const btnText = viewMoreBtn.querySelector('.btn-text');
  
  // Kitne projects shuru me dikhane hain? (Default: 1)
  const initialLimit = 2; 
  let isExpanded = false;

  // Function: Toggle Project Visibility
  function updateProjectVisibility() {
    projectCards.forEach((card, index) => {
      if (!isExpanded && index >= initialLimit) {
        card.classList.add('hide-project');
      } else {
        card.classList.remove('hide-project');
      }
    });
  }

  // Initial Run: Sirf 1 Project Show Karein
  updateProjectVisibility();

  // Button Click Event
  viewMoreBtn.addEventListener('click', () => {
    isExpanded = !isExpanded; // Switch State

    if (isExpanded) {
      btnText.textContent = "Show Less";
      viewMoreBtn.classList.add('active');
    } else {
      btnText.textContent = "View All Projects";
      viewMoreBtn.classList.remove('active');
      
      // Smooth Scroll Back to Projects Section Title when closing
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }

    updateProjectVisibility();
  });
});


// Animated Skill Progress Bars on Scroll
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skills-section');
  const progressFills = document.querySelectorAll('.progress-fill');

  if (!skillsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressFills.forEach((fill) => {
            const targetWidth = fill.style.getPropertyValue('--target-width');
            fill.style.width = targetWidth; // Fill the bar to specified %
          });
          observer.unobserve(entry.target); 
        }
      });
    },
    { threshold: 0.3 } 
  );

  observer.observe(skillsSection);
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formResponse = document.getElementById('form-response');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Default submission rokein

    // 1. Validation Check: Agar koi field khali hai
    if (!contactForm.checkValidity()) {
      if (formResponse) {
        formResponse.textContent = '⚠️ Please fill out all required fields before submitting!';
        formResponse.className = 'form-response error';
        formResponse.style.display = 'block';

        // 3 second baad Error warning message gayab ho jayega
        setTimeout(() => {
          formResponse.style.display = 'none';
        }, 3000);
      }
      return; // Code aage nahi badhega
    }

    // 2. Agar Saare Fields Bhare Hain (Success Flow)
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    setTimeout(() => {
      btnText.textContent = 'Message Sent!';
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '#238636'; // Green color

      if (formResponse) {
        formResponse.textContent = '✓ Thank you! Your message has been sent successfully.';
        formResponse.className = 'form-response success';
        formResponse.style.display = 'block';
      }

      contactForm.reset(); // Inputs clear karein

      // 3.5 Seconds baad Reset karein
      setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.style.background = ''; // Original gradient
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        
        if (formResponse) {
          formResponse.style.display = 'none';
        }
      }, 3500);

    }, 1500);
  });
});