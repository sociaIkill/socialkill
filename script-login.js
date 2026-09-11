document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');

    const CORRECT_PASSWORD_HASH = "e14c9ef51257a1558644e79e400884900e170ab35931e19fb999420e88105480"; 

    async function hashPassword(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.style.fill = type === 'text' ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
    });

    async function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (!enteredPassword) {
            triggerError();
            return;
        }

        const enteredHash = await hashPassword(enteredPassword);

        if (enteredHash === CORRECT_PASSWORD_HASH) {
            sessionStorage.setItem('isAuthorized', 'true');
            
            document.body.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            triggerError();
        }
    }

    function triggerError() {
        passwordInput.classList.add('error');
        passwordInput.value = '';
        
        setTimeout(() => {
            passwordInput.classList.remove('error');
        }, 600);
    }

    loginBtn.addEventListener('click', (e) => {
        const circle = document.createElement('span');
        const diameter = Math.max(loginBtn.clientWidth, loginBtn.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - loginBtn.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - loginBtn.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = loginBtn.querySelector('.ripple');
        if (ripple) ripple.remove();
        loginBtn.appendChild(circle);

        checkPassword();
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});

setTimeout(() => {
    const bgPhoto = document.querySelector('.bg-photo-layer');
    if (bgPhoto) {
        bgPhoto.classList.add('looping');
    }
}, 1800);

const dot = document.querySelector('.cursor-dot');
const trace = document.querySelector('.cursor-trace');
let mouseX = 0, mouseY = 0, traceX = 0, traceY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
    if (dot) {
        dot.style.left = `${mouseX}px`; 
        dot.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    traceX += (mouseX - traceX) * 0.15;
    traceY += (mouseY - traceY) * 0.15;
    if (trace) {
        trace.style.left = `${traceX}px`;
        trace.style.top = `${traceY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, .clickable, .eye-icon')) {
        document.body.classList.remove('cursor-hover');
    }
});