/**
 * Interactive romantic website script
 * Features: Sparkles, Floating Hearts, Twinkling Stars, Love Timer, Interactive Storybook, Slideshow Carousel
 */

// ==========================================
// 1. CONFIGURATION (Edit values here)
// ==========================================
const CONFIG = {
    // Names of the couple
    boyName: "Your Name", // Replace with your name
    girlName: "Mansi",    // Replace with her name
    
    // Anniversary Date (Year, Month - 1, Day, Hour, Minute)
    // Note: Month is 0-indexed (0 = January, 1 = February, 5 = June, etc.)
    anniversaryDate: new Date(2025, 5, 9, 0, 0, 0), // e.g. June 9, 2025
    
    // Path to the background music file
    musicPath: "romantic-music.mp3", // Replace with your music path later (mp3, wav, ogg)
    
    // A cute surprise message that pops up when she clicks the gift box
    surpriseMessage: "To the girl who changed my world: You are my best friend, my favorite conversation, and my favorite plot twist. Thank you for showing me what love truly feels like. I love you, now and always! 💖✨"
};

// ==========================================
// 2. STATE VARIABLES
// ==========================================
let audio = null;
let currentSlide = 0;
let slides = [];
let slideInterval = null;
let currentBookPage = 0;
let bookPages = [];

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Set names in placeholders
    document.querySelectorAll(".girl-name-placeholder").forEach(el => el.textContent = CONFIG.girlName);
    document.querySelectorAll(".boy-name-placeholder").forEach(el => el.textContent = CONFIG.boyName);
    
    // Initialize audio element
    audio = new Audio(CONFIG.musicPath);
    audio.loop = true;
    
    // Get gallery slides
    slides = document.querySelectorAll(".slide");
    
    // Get book pages
    bookPages = document.querySelectorAll(".book-page");
    
    // Initialize stars background
    initStars();
    
    // Start continuous floating hearts background
    setInterval(createFloatingHeart, 600);
    
    // Initialize click sparkle effect
    document.addEventListener("click", spawnSparkles);
    
    // Initialize scroll-reveal for poem lines
    initPoemReveal();
    
    // Initialize love timer counter (updates every second)
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);
});

// ==========================================
// 4. ANIMATED STAR BACKGROUND
// ==========================================
function initStars() {
    const starsContainer = document.getElementById("bg-stars");
    if (!starsContainer) return;
    
    const starCount = window.innerWidth < 768 ? 40 : 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Random sizes
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random positions
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animations properties
        star.style.setProperty("--duration", `${Math.random() * 4 + 2}s`);
        star.style.setProperty("--max-opacity", Math.random() * 0.7 + 0.3);
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// ==========================================
// 5. FLOATING HEARTS BACKGROUND
// ==========================================
function createFloatingHeart() {
    const container = document.getElementById("bg-hearts-container");
    if (!container) return;
    
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    
    // Select a random heart emoji
    const hearts = ["❤️", "💖", "💕", "💝", "💗", "🌸", "✨"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Randomize position
    heart.style.left = `${Math.random() * 100}vw`;
    
    // Randomize animation properties
    const size = Math.random() * 20 + 15;
    heart.style.setProperty("--size", `${size}px`);
    
    const speed = Math.random() * 8 + 6;
    heart.style.setProperty("--speed", `${speed}s`);
    
    const opacity = Math.random() * 0.6 + 0.3;
    heart.style.setProperty("--opacity", opacity);
    
    const drift = Math.random() * 100 - 50; // drift left or right
    heart.style.setProperty("--drift", `${drift}px`);
    
    const spin = Math.random() * 180 + 90; // random rotation amount
    heart.style.setProperty("--spin", `${spin}deg`);
    
    container.appendChild(heart);
    
    // Remove heart after animation completes to avoid bloating the DOM
    setTimeout(() => {
        heart.remove();
    }, speed * 1000);
}

// ==========================================
// 6. BUTTON SPARKLE CLICK EFFECTS
// ==========================================
function spawnSparkles(e) {
    // Spawns sparkles at click coordinates
    const sparkleCount = 8;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("click-sparkle");
        
        // Start position centered at the click
        sparkle.style.left = `${e.pageX - 4}px`;
        sparkle.style.top = `${e.pageY - 4}px`;
        
        // Random ending displacements (X and Y vectors)
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 20;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        sparkle.style.setProperty("--x", `${dx}px`);
        sparkle.style.setProperty("--y", `${dy}px`);
        
        // Random sparkle color (mostly gold/pink shades)
        const colors = [CONFIG.gold, "#ffd1dc", "#e6a1ff", "#ffffff"];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        
        // Cleanup particle
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// ==========================================
// 7. LANDING SCREEN BUTTON BEHAVIOR
// ==========================================
let noClicks = 0;

function handleNoClick() {
    const card = document.querySelector(".landing-card");
    const title = document.getElementById("landing-question");
    const noBtn = document.getElementById("btn-no");
    const yesBtn = document.getElementById("btn-yes");
    const okYesBtn = document.getElementById("btn-ok-yes");
    
    // Add cute card shake animation
    card.classList.add("shake-animation");
    setTimeout(() => {
        card.classList.remove("shake-animation");
    }, 600);
    
    noClicks++;
    
    if (noClicks === 1) {
        // Change text and buttons
        title.innerHTML = "Are you absolutely sure? 🥺";
        noBtn.style.display = "none";
        yesBtn.style.display = "none";
        okYesBtn.style.display = "flex";
    }
}

function handleYesClick() {
    // Hide landing page with smooth transition
    const landing = document.getElementById("landing-screen");
    const mainWeb = document.getElementById("main-website");
    
    landing.style.opacity = "0";
    setTimeout(() => {
        landing.style.display = "none";
        
        // Reveal main website
        mainWeb.style.display = "block";
        setTimeout(() => {
            mainWeb.style.opacity = "1";
            mainWeb.style.visibility = "visible";
            // Start slideshow when main site appears
            startSlideshow();
        }, 50);
    }, 1000);
    
    // Play music automatically since the user interacted
    playMusic();
}

// ==========================================
// 8. MUSIC SYSTEM CONTROLS
// ==========================================
function playMusic() {
    if (!audio) return;
    
    const promise = audio.play();
    if (promise !== undefined) {
        promise.then(() => {
            const musicBtn = document.getElementById("floating-music-btn");
            if (musicBtn) {
                musicBtn.classList.add("playing");
                updateMusicIcon(true);
            }
        }).catch(error => {
            console.log("Audio autoplay prevented or failed: ", error);
        });
    }
}

function toggleMusic() {
    const musicBtn = document.getElementById("floating-music-btn");
    if (!audio) return;
    
    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.classList.add("playing");
            updateMusicIcon(true);
        });
    } else {
        audio.pause();
        musicBtn.classList.remove("playing");
        updateMusicIcon(false);
    }
}

function updateMusicIcon(isPlaying) {
    const musicBtn = document.getElementById("floating-music-btn");
    if (!musicBtn) return;
    
    if (isPlaying) {
        // SVG for Play/Sound active
        musicBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
        `;
    } else {
        // SVG for Muted/Sound paused
        musicBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l6 6 1.27-1.27L4.27 3zM10 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4-12h4V3h-6v5.18l2 2z"/>
            </svg>
        `;
    }
}

// ==========================================
// 9. LOVE COUNTER CALCULATION
// ==========================================
function updateLoveCounter() {
    const startDate = CONFIG.anniversaryDate;
    const now = new Date();
    
    const diffMs = now - startDate;
    
    // Calculations
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    // Render values
    document.getElementById("timer-days").textContent = days;
    document.getElementById("timer-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("timer-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("timer-seconds").textContent = String(seconds).padStart(2, "0");
}

// ==========================================
// 10. INTERACTIVE MEMORY BOOK
// ==========================================
function changeBookPage(direction) {
    if (!bookPages || bookPages.length === 0) return;
    
    // Remove active class from current page
    bookPages[currentBookPage].classList.remove("active");
    
    // Update index
    currentBookPage += direction;
    
    // Bound checks
    if (currentBookPage < 0) currentBookPage = 0;
    if (currentBookPage >= bookPages.length) currentBookPage = bookPages.length - 1;
    
    // Add active class to new page
    bookPages[currentBookPage].classList.add("active");
    
    // Update progress text
    const progressEl = document.getElementById("book-progress");
    if (progressEl) {
        progressEl.textContent = `${currentBookPage + 1} / ${bookPages.length}`;
    }
    
    // Enable/disable buttons
    const prevBtn = document.getElementById("book-prev-btn");
    const nextBtn = document.getElementById("book-next-btn");
    
    if (prevBtn) prevBtn.disabled = currentBookPage === 0;
    if (nextBtn) nextBtn.disabled = currentBookPage === bookPages.length - 1;
    
    // Add page turn effect (mini hearts flying inside the story card)
    spawnStoryHearts();
}

function spawnStoryHearts() {
    const card = document.querySelector(".story-glass-card");
    if (!card) return;
    
    const count = 5;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.textContent = "💖";
        heart.style.position = "absolute";
        heart.style.left = `${Math.random() * 80 + 10}%`;
        heart.style.bottom = "20px";
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        heart.style.opacity = "1";
        heart.style.transition = "all 1.5s ease-out";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "5";
        
        card.appendChild(heart);
        
        // Force reflow and animate
        setTimeout(() => {
            heart.style.transform = `translateY(-${Math.random() * 200 + 100}px) translateX(${Math.random() * 100 - 50}px) scale(0.2)`;
            heart.style.opacity = "0";
        }, 50);
        
        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

// ==========================================
// 11. PHOTO GALLERY SLIDESHOW
// ==========================================
function startSlideshow() {
    if (!slides || slides.length === 0) return;
    
    // Reset interval if running
    if (slideInterval) clearInterval(slideInterval);
    
    // Create dots/indicators
    const dotsContainer = document.getElementById("gallery-dots");
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("gallery-dot");
            if (index === 0) dot.classList.add("active");
            dot.onclick = () => showSlide(index);
            dotsContainer.appendChild(dot);
        });
    }
    
    // Start interval
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change photo every 5 seconds
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove("active");
    
    // Update active index
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    // Add active class to new slide
    slides[currentSlide].classList.add("active");
    
    // Update active indicator dot
    const dots = document.querySelectorAll(".gallery-dot");
    dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
    
    // Spawn floating heart particles on top of slideshow
    spawnGalleryHeart();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function spawnGalleryHeart() {
    const container = document.getElementById("gallery-hearts");
    if (!container) return;
    
    const heart = document.createElement("div");
    heart.textContent = ["❤️", "💖", "💕"][Math.floor(Math.random() * 3)];
    heart.style.position = "absolute";
    heart.style.bottom = "0";
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.fontSize = `${Math.random() * 24 + 16}px`;
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "4";
    heart.style.transition = "all 4s ease-out";
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = `translateY(-350px) translateX(${Math.random() * 120 - 60}px) rotate(${Math.random() * 180 - 90}deg) scale(0.5)`;
        heart.style.opacity = "0";
    }, 50);
    
    setTimeout(() => {
        heart.remove();
    }, 4100);
}

// ==========================================
// 12. POEM REVEAL ON SCROLL
// ==========================================
function initPoemReveal() {
    const lines = document.querySelectorAll(".poem-line");
    if (!lines || lines.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delayed animation classes
                entry.target.classList.add("revealed");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    lines.forEach((line, index) => {
        // Apply individual delay values based on order
        line.style.transitionDelay = `${(index % 4) * 0.15}s`;
        observer.observe(line);
    });
}

// ==========================================
// 13. SURPRISE MODAL POPUP
// ==========================================
function openSurpriseModal() {
    const modal = document.getElementById("surprise-modal");
    const modalText = document.getElementById("modal-text-content");
    
    if (modal && modalText) {
        modalText.textContent = CONFIG.surpriseMessage;
        modal.classList.add("active");
        
        // Spawn massive sparkles!
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const rect = document.querySelector(".surprise-btn").getBoundingClientRect();
                const fakeEvent = {
                    pageX: rect.left + rect.width / 2 + (Math.random() * 100 - 50) + window.scrollX,
                    pageY: rect.top + rect.height / 2 + (Math.random() * 60 - 30) + window.scrollY
                };
                spawnSparkles(fakeEvent);
            }, i * 50);
        }
    }
}

function closeSurpriseModal() {
    const modal = document.getElementById("surprise-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}
