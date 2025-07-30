  // Particle Animation
        const particleCanvas = document.getElementById('particleCanvas');
        const pCtx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
                if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
            }
            draw() {
                pCtx.fillStyle = 'rgba(0, 234, 255, 0.7)';
                pCtx.beginPath();
                pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                pCtx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.size <= 0.2) {
                    particles.splice(index, 1);
                    particles.push(new Particle());
                }
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Matrix Effect
        const matrixCanvas = document.getElementById('matrixCanvas');
        const mCtx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chars = '01';
        const fontSize = 14;
        let columns = matrixCanvas.width / fontSize;
        let drops = Array(Math.floor(columns)).fill(0);

        function drawMatrix() {
            mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            mCtx.fillStyle = '#00ff00';
            mCtx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const text = chars.charAt(Math.random() * chars.length);
                mCtx.fillText(text, i * fontSize, y * fontSize);
                if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }

        function startMatrixEffect(url) {
            matrixCanvas.style.display = 'block';
            const matrixInterval = setInterval(drawMatrix, 50);
            setTimeout(() => {
                clearInterval(matrixInterval);
                matrixCanvas.style.display = 'none';
                window.location.href = url;
            }, 2000);
        }

        // Ensure buttons are interactive
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = button.getAttribute('href');
                startMatrixEffect(url);
            });
        });

        // Fireworks Effect
        const fireworksCanvas = document.getElementById('fireworksCanvas');
        const fCtx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;

        const fireworks = [];
        class Firework {
            constructor() {
                this.x = Math.random() * fireworksCanvas.width;
                this.y = Math.random() * fireworksCanvas.height;
                this.size = Math.random() * 3 + 2;
                this.speedX = Math.random() * 6 - 3;
                this.speedY = Math.random() * 6 - 3;
                this.opacity = 1;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.02;
                if (this.opacity < 0) this.opacity = 0;
            }
            draw() {
                fCtx.fillStyle = this.color;
                fCtx.globalAlpha = this.opacity;
                fCtx.beginPath();
                fCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                fCtx.fill();
            }
        }

        function animateFireworks() {
            fCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            fCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
            fireworks.forEach((firework, index) => {
                firework.update();
                firework.draw();
                if (firework.opacity <= 0) {
                    fireworks.splice(index, 1);
                }
            });
            if (fireworks.length > 0) {
                requestAnimationFrame(animateFireworks);
            } else {
                fireworksCanvas.style.display = 'none';
                fCtx.globalAlpha = 1;
            }
        }

        document.getElementById('nameTrigger').addEventListener('click', () => {
            fireworksCanvas.style.display = 'block';
            document.getElementById('fireworksSound').play();
            for (let i = 0; i < 50; i++) {
                fireworks.push(new Firework());
            }
            animateFireworks();
            setTimeout(() => {
                fireworks.length = 0;
            }, 2000);
        });

        // Music Player
        const audio = document.getElementById('sadMusic');
        let isPlaying = false;

        function toggleMusic() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                document.querySelector('.music-player-btn').textContent = '🎵';
                document.getElementById('soundWaveCanvas').style.display = 'none';
            } else {
                audio.play();
                isPlaying = true;
                document.querySelector('.music-player-btn').textContent = '⏸';
                document.getElementById('soundWaveCanvas').style.display = 'block';
            }
        }

        // Sound Wave Effect
        const soundWaveCanvas = document.getElementById('soundWaveCanvas');
        const sCtx = soundWaveCanvas.getContext('2d');
        soundWaveCanvas.width = window.innerWidth;
        soundWaveCanvas.height = window.innerHeight;

        const waves = [];
        class SoundWave {
            constructor() {
                this.radius = 0;
                this.maxRadius = 100;
                this.opacity = 1;
                this.color = Math.random() > 0.5 ? '#00eaff' : '#00ff00';
            }
            update() {
                this.radius += 2;
                this.opacity -= 0.02;
                if (this.opacity < 0) this.opacity = 0;
            }
            draw() {
                sCtx.strokeStyle = this.color;
                sCtx.globalAlpha = this.opacity;
                sCtx.beginPath();
                sCtx.arc(btnX + 30, btnY + 30, this.radius, 0, Math.PI * 2);
                sCtx.stroke();
            }
        }

        function animateSoundWaves() {
            sCtx.clearRect(0, 0, soundWaveCanvas.width, soundWaveCanvas.height);
            if (isPlaying && Math.random() < 0.2) {
                waves.push(new SoundWave());
            }
            waves.forEach((wave, index) => {
                wave.update();
                wave.draw();
                if (wave.opacity <= 0) {
                    waves.splice(index, 1);
                }
            });
            if (isPlaying) {
                requestAnimationFrame(animateSoundWaves);
            } else {
                waves.length = 0;
                sCtx.globalAlpha = 1;
            }
        }

        audio.addEventListener('play', () => {
            animateSoundWaves();
        });

        // Random Movement for Music Button
        let btnX = window.innerWidth - 80;
        let btnY = window.innerHeight - 80;
        let speedX = (Math.random() * 4 - 2);
        let speedY = (Math.random() * 4 - 2);

        const musicBtn = document.getElementById('musicPlayerBtn');
        function moveButton() {
            const btnWidth = 60;
            const btnHeight = 60;
            const container = document.querySelector('.container');
            const containerRect = container.getBoundingClientRect();

            btnX += speedX;
            btnY += speedY;

            if (btnX < 0 || btnX > window.innerWidth - btnWidth) {
                speedX *= -1;
                btnX = Math.max(0, Math.min(btnX, window.innerWidth - btnWidth));
            }
            if (btnY < 0 || btnY > window.innerHeight - btnHeight) {
                speedY *= -1;
                btnY = Math.max(0, Math.min(btnY, window.innerHeight - btnHeight));
            }

            if (
                btnX + btnWidth > containerRect.left &&
                btnX < containerRect.right &&
                btnY + btnHeight > containerRect.top &&
                btnY < containerRect.bottom
            ) {
                speedX *= -1;
                speedY *= -1;
            }

            musicBtn.style.left = `${btnX}px`;
            musicBtn.style.top = `${btnY}px`;

            if (Math.random() < 0.02) {
                speedX = (Math.random() * 4 - 2);
                speedY = (Math.random() * 4 - 2);
            }

            requestAnimationFrame(moveButton);
        }

        musicBtn.style.position = 'fixed';
        musicBtn.style.left = `${btnX}px`;
        musicBtn.style.top = `${btnY}px`;
        moveButton();

        // Secret Button Logic
        const secretBtn = document.getElementById('secretBtn');
        let clickCount = 0;
        let lastClickTime = 0;

        document.getElementById('destination').addEventListener('click', () => {
            const currentTime = Date.now();
            if (currentTime - lastClickTime < 2000) {
                clickCount++;
            } else {
                clickCount = 1;
            }
            lastClickTime = currentTime;

            if (clickCount >= 3) {
                secretBtn.style.display = 'flex';
                secretBtn.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
                secretBtn.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
                clickCount = 0;
            }
        });

        secretBtn.addEventListener('click', () => {
            document.getElementById('secretMessage').style.display = 'block';
            for (let i = 0; i < 50; i++) {
                fireworks.push(new Firework());
            }
            fireworksCanvas.style.display = 'block';
            animateFireworks();
            setTimeout(() => {
                document.getElementById('secretMessage').style.display = 'none';
                secretBtn.style.display = 'none';
                fireworks.length = 0;
            }, 2000);
        });

        // Digital Clock
        const clock = document.getElementById('clock');
        function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            clock.textContent = `${hours}:${minutes}:${seconds}`;
            requestAnimationFrame(updateClock);
        }

        updateClock();

        // Resize Handling
        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            fireworksCanvas.width = window.innerWidth;
            fireworksCanvas.height = window.innerHeight;
            soundWaveCanvas.width = window.innerWidth;
            soundWaveCanvas.height = window.innerHeight;
            drops.length = Math.floor(matrixCanvas.width / fontSize);
            drops.fill(0);
            btnX = Math.min(btnX, window.innerWidth - 80);
            btnY = Math.min(btnY, window.innerHeight - 80);
        });

const secretBtn = document.getElementById('secretBtn');
const secretMessage = document.getElementById('secretMessage');

secretBtn.addEventListener('click', () => {
  secretMessage.style.display = 'block';

  setTimeout(() => {
    secretMessage.style.display = 'none';
  }, 7000); // يخفي الرسالة بعد 7 ثوانٍ
});

