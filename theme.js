(function () {
    var STORAGE_KEY = 'theme';
    var root = document.documentElement;
    var buttons = document.querySelectorAll('.theme-btn');

    function systemPrefersDark() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function getSavedChoice() {
        return localStorage.getItem(STORAGE_KEY) || 'system';
    }

    function resolveTheme(choice) {
        return choice === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : choice;
    }

    function setActiveButton(choice) {
        buttons.forEach(function (btn) {
            var isActive = btn.dataset.themeChoice === choice;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    function applyChoice(choice) {
        root.setAttribute('data-theme', resolveTheme(choice));
        setActiveButton(choice);
    }

    applyChoice(getSavedChoice());

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var choice = btn.dataset.themeChoice;
            localStorage.setItem(STORAGE_KEY, choice);
            applyChoice(choice);
        });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (getSavedChoice() === 'system') {
            applyChoice('system');
        }
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    // --- Email Modal Variables ---
    var emailTrigger = document.getElementById('emailTrigger');
    var modalOverlay = document.getElementById('contactModalOverlay');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var copyEmailBtn = document.getElementById('copyEmailBtn');
    var openMailAppBtn = document.getElementById('openMailAppBtn');
    var userEmail = "migzcayetano23@gmail.com";

    // --- Hackathon Modal Variables ---
    var hackathonTrigger = document.getElementById('hackathonTrigger');
    var hackathonModalOverlay = document.getElementById('hackathonModalOverlay');
    var closeHackathonModalBtn = document.getElementById('closeHackathonModalBtn');

    // --- Email Modal Logic ---
    function resetCopyButton() {
        if (copyEmailBtn) {
            copyEmailBtn.innerText = "Copy";
            copyEmailBtn.style.backgroundColor = "";
            copyEmailBtn.style.color = "";
        }
    }

    if (emailTrigger && modalOverlay) {
        emailTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            modalOverlay.classList.remove('modal-hidden');
        });
    }

    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', function () {
            modalOverlay.classList.add('modal-hidden');
            setTimeout(resetCopyButton, 300);
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('modal-hidden');
                setTimeout(resetCopyButton, 300);
            }
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async function () {
            try {
                await navigator.clipboard.writeText(userEmail);
                copyEmailBtn.innerText = "Copied!";
                copyEmailBtn.style.backgroundColor = "#22c55e";
                copyEmailBtn.style.color = "#ffffff";

                setTimeout(resetCopyButton, 2000);
            } catch (err) {
                copyEmailBtn.innerText = "Error";
            }
        });
    }

    if (openMailAppBtn) {
        openMailAppBtn.addEventListener('click', function () {
            window.location.href = "mailto:" + userEmail;
        });
    }

    // --- Hackathon Modal Logic ---
    if (hackathonTrigger && hackathonModalOverlay) {
        hackathonTrigger.addEventListener('click', function () {
            hackathonModalOverlay.classList.remove('modal-hidden');
        });
    }

    if (closeHackathonModalBtn && hackathonModalOverlay) {
        closeHackathonModalBtn.addEventListener('click', function () {
            hackathonModalOverlay.classList.add('modal-hidden');
        });
    }

    // Close when clicking outside the hackathon modal content
    if (hackathonModalOverlay) {
        hackathonModalOverlay.addEventListener('click', function (e) {
            if (e.target === hackathonModalOverlay) {
                hackathonModalOverlay.classList.add('modal-hidden');
            }
        });
    }

    // --- NEW: Universal Navigation Modal Logic ---
    // UPDATED: Idinagdag ang .view-all-link sa selector para isama ang bagong button
    const navModalTriggers = document.querySelectorAll('.side-link[data-modal-target], .view-all-link[data-modal-target]');
    const navCloseButtons = document.querySelectorAll('.modal-overlay .close-btn');
    const navOverlays = document.querySelectorAll('.modal-overlay');

    // Open Modal
    navModalTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = trigger.getAttribute('data-modal-target');
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                targetModal.classList.remove('modal-hidden');
            }
        });
    });

    // Close Modal via Button
    navCloseButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.add('modal-hidden');
            }
        });
    });

    // Close Modal via Outside Click
    navOverlays.forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.classList.add('modal-hidden');
            }
        });
    });
});