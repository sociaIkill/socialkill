let particlesArray = [];
let isBoosted = false;
const canvas = document.getElementById('particles-bg');
const ctx = canvas ? canvas.getContext('2d') : null;

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                typeWriter("SOCIALKILL", "hero-title", 120);
                initObserver();
                initParticles();
                animate();
            }, 800);
        }, 1000);
    }
});

function typeWriter(text, elementId, speed) {
    let i = 0;
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = "";
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset(true); 
    }
    reset(isInit = false) {
        this.x = Math.random() * canvas.width;
        this.y = isInit ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseSpeed = -(Math.random() * 0.5 + 0.2);
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        let speed = isBoosted ? this.baseSpeed * 15 : this.baseSpeed;
        this.y += speed;
        if (this.y < -10) this.reset(false);
    }
    draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    if (!canvas) return;
    particlesArray = [];
    for (let i = 0; i < 100; i++) particlesArray.push(new Particle());
}

function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

let logoClicks = 0;
document.addEventListener('click', (e) => {
    if (e.target.id === 'hero-title') {
        logoClicks++;
        if (logoClicks === 2) {
            isBoosted = true;
            logoClicks = 0;
        }
        setTimeout(() => { logoClicks = 0; }, 500);
    }
});

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('counter') && !entry.target.dataset.counted) {
                    startCounter(entry.target);
                    entry.target.dataset.counted = "true";
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up, .counter').forEach(el => observer.observe(el));
}

function startCounter(el) {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const speed = target / 50;
    const update = () => {
        count += speed;
        if (count < target) {
            el.innerText = Math.ceil(count);
            requestAnimationFrame(update);
        } else {
            el.innerText = target;
        }
    };
    update();
}

function updateCountdown() {
    const target = new Date('June 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;
    const el = document.getElementById('countdown');
    if (!el) return;

    if (diff <= 0) {
        el.innerText = "SYSTEM_ACTIVE";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    el.innerText = `${days.toString().padStart(3, '0')}:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

const dot = document.querySelector('.cursor-dot');
const trace = document.querySelector('.cursor-trace');
let mouseX = 0, mouseY = 0, traceX = 0, traceY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    if(dot) {
        dot.style.left = `${mouseX}px`; 
        dot.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    traceX += (mouseX - traceX) * 0.15;
    traceY += (mouseY - traceY) * 0.15;
    if(trace) {
        trace.style.left = `${traceX}px`;
        trace.style.top = `${traceY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    const progress = document.getElementById("scroll-progress");
    if(progress) progress.style.width = scrolled + "%";
});
const modalData = {
'???': {
    type: 'member',
    name: '// ???',
    role: 'DEVELOPER',
    bio: 'Python exploit developer. Reverse engineering enthusiast. Founder of SOCIALKILL.',
    image: 'img/name.jpg',
    tg_link: 'https://t.me/sociaIkillowner',
    tg_name: '@socialkillowner'
},
'orbital-rat': {
    type: 'project',
    title: "SCD_RAT [v1]",
    content: `
        <div style="color: #000; font-family: 'Inter', sans-serif;">
            <div style="display: flex; gap: 30px; margin-bottom: 30px; align-items: center; flex-wrap: wrap;">
                <img src="img/work.png" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border: 1px solid #000; filter: contrast(1.2) grayscale(1);">
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 10px; font-weight: 900; letter-spacing: 2px; color: #ff0000; margin-bottom: 5px;">[ CLASSIFIED_INFORMATION ]</div>
                    <p style="font-size: 14px; line-height: 1.4; opacity: 0.8;">
                        Усовершенствованный инструмент удаленного доступа, использующий Discord API как скрытый канал управления (C2). 
                        Разработан для обхода современных систем обнаружения (EDR).
                    </p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px;">
                <div>
                    <h4 style="font-size: 12px; font-weight: 900; text-transform: uppercase; margin-bottom: 10px;">> CORE_FEATURES:</h4>
                    <ul style="font-size: 13px; list-style: none; padding: 0; line-height: 2;">
                        <li>• Stealth Persistence</li>
                        <li>• Real-time Screen Capture</li>
                    </ul>
                </div>
                <div>
                    <h4 style="font-size: 12px; font-weight: 900; text-transform: uppercase; margin-bottom: 10px;">> TECH_SPEC:</h4>
                    <ul style="font-size: 13px; list-style: none; padding: 0; line-height: 2;">
                        <li>• Language: Python 3.11</li>
                        <li>• Footprint: Minimal</li>
                    </ul>
                </div>
            </div>
        </div>
                    <div style="margin: 30px 0; padding: 20px; border: 1px solid #000; background: #f9f9f9;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span style="font-weight: 900; letter-spacing: 1px;">LICENSE_ACCESS:</span>
                    <span style="font-family: monospace; font-weight: 900; color: #ff0000;">$10.00 / LIFETIME</span>
                </div>
                <a href="https://t.me/sociaIkill_bot" target="_blank" class="buy-button-modal">
                    [ BUY ]
                </a>
            </div>`
}
};

document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-modal]');
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');

    if (card && overlay && body) {
        const id = card.getAttribute('data-modal');
        const data = modalData[id];

        if (data) {
            if (data.type === 'member') {
                body.innerHTML = `
                    <div class="member-profile" style="display: flex; gap: 40px; align-items: center; color: #000;">
                        <img src="${data.image}" style="width: 220px; height: 220px; object-fit: cover; filter: grayscale(1); border: 1px solid #000; padding: 5px; background: #fff;">
                        <div>
                            <small style="letter-spacing: 4px; opacity: 0.4; font-weight: 900; text-transform: uppercase; font-size: 10px;">[ ${data.role} ]</small>
                            <h1 style="font-size: 3.5rem; margin: 10px 0; font-weight: 900; letter-spacing: -3px; line-height: 1;">${data.name}</h1>
                            <p style="font-size: 1rem; line-height: 1.6; opacity: 0.6; margin-bottom: 25px; max-width: 380px;">${data.bio}</p>
                            
                            <div style="padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.08);">
                                <a href="${data.tg_link}" target="_blank" class="clean-tg-link">
                                    <span style="font-size: 9px; font-weight: 900; opacity: 0.3; display: block; letter-spacing: 2px; margin-bottom: 8px;">ENCRYPTED_LINK:</span>
                                    <span class="link-text">${data.tg_name}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                body.innerHTML = `
                    <div style="color: #000;">
                        <h1 style="font-size: 3.5rem; font-weight: 900; letter-spacing: -3px; margin-bottom: 15px; line-height: 1;">${data.title}</h1>
                        ${data.content}
                    </div>
                `;
            }
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    }

    if (e.target.id === 'modal-close' || e.target === overlay) {
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});