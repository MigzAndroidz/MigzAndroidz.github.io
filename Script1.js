document.addEventListener('DOMContentLoaded', () => {
    let cards = Array.from(document.querySelectorAll('.project-card'));

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('card-active', 'card-prev', 'card-next', 'card-hidden');

            if (index === 0) {
                card.classList.add('card-active');    
            } else if (index === 1) {
                card.classList.add('card-next');      
            } else if (index === cards.length - 1) {
                card.classList.add('card-prev');      
            } else {
                card.classList.add('card-hidden');    
            }
        });
    }

    cards.forEach((card) => {
        card.addEventListener('click', function() {
            if (this.classList.contains('card-active')) return;

            if (this.classList.contains('card-next')) {
                cards.push(cards.shift());
            } else if (this.classList.contains('card-prev')) {
                cards.unshift(cards.pop());
            }
            
            updateCarousel();
        });
    });

    updateCarousel();

    const modalTriggers = document.querySelectorAll("[data-modal-target]");
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = trigger.getAttribute("data-modal-target");
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                targetModal.classList.remove("modal-hidden");
            }
        });
    });

    const closeButtons = document.querySelectorAll(".close-btn");
    
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal-overlay") || btn.closest("[id*='Modal']");
            if (modal) {
                modal.classList.add("modal-hidden");
            }
        });
    });

    const overlays = document.querySelectorAll(".modal-overlay, [id*='ModalOverlay'], [id*='Modal']");
    
    overlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.add("modal-hidden");
            }
        });
    });

    const emailTrigger = document.getElementById("emailTrigger");
    const contactModal = document.getElementById("contactModalOverlay");
    
    if (emailTrigger && contactModal) {
        emailTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            contactModal.classList.remove("modal-hidden");
        });
    }

    const hackathonTrigger = document.getElementById("hackathonTrigger");
    const hackathonModal = document.getElementById("hackathonModalOverlay");
    
    if (hackathonTrigger && hackathonModal) {
        hackathonTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            hackathonModal.classList.remove("modal-hidden");
        });
    }
});