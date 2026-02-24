document.addEventListener('DOMContentLoaded', () => {
    // ✅ Initialize EmailJS with your public key FIRST
    emailjs.init('xp4xX9Fo7dHhC1Mq6');

    initTyping();
    initScrollSpy();
    initScrollToTop();
    initContactForm();
});

// ============================================
// Typing Effect
// ============================================
function initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    const text = 'Specializing in NLP, Deep Learning, and Intelligent Systems...';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            setTimeout(type, 70);
        }
    };
    setTimeout(type, 500);
}

// ============================================
// ✅ Scroll Spy — getBoundingClientRect (reliable & accurate)
// ============================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Section is considered "active" when its top passed 150px from viewport top
            if (rect.top <= 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // run on page load
}

// ============================================
// Scroll To Top Button
// ============================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ✅ Contact Form via EmailJS
// ============================================
function initContactForm() {
    const EMAILJS_SERVICE_ID  = 'service_dkhpi79';
    const EMAILJS_TEMPLATE_ID = 'template_fj6hzid';
    const EMAILJS_PUBLIC_KEY  = 'xp4xX9Fo7dHhC1Mq6';

    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn    = form.querySelector('button[type="submit"]');
        const nameInput    = form.querySelector('input[type="text"]');
        const emailInput   = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showToast('⚠️ Please fill in all fields.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const templateParams = {
            from_name:  nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message:    messageInput.value.trim(),
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function() {
                showToast('✅ Message sent successfully! I will get back to you soon.', 'success');
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                showToast('❌ Failed to send. Please try again or email me directly.', 'error');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            });
    });
}

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
    const existing = document.getElementById('toast-notification');
    if (existing) existing.remove();

    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            @keyframes toastIn {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes toastOut {
                from { opacity: 1; transform: translateY(0) scale(1); }
                to   { opacity: 0; transform: translateY(20px) scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    }

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 28px;
        border-radius: 14px;
        font-size: 0.95rem;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        z-index: 99999;
        max-width: 380px;
        line-height: 1.5;
        animation: toastIn 0.35s ease forwards;
        background: ${type === 'success' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 60, 60, 0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 229, 255, 0.5)' : 'rgba(255, 60, 60, 0.5)'};
        color: ${type === 'success' ? '#00e5ff' : '#ff6b6b'};
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 30px ${type === 'success' ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 60, 60, 0.15)'};
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.35s ease forwards';
        setTimeout(() => toast.remove(), 350);
    }, 4000);
}