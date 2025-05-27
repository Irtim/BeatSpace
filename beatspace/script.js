document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.profile-tabs')) {
        initTabs();
    }
    if (document.getElementById('cover-file')) {
        initFileUploads();
    }
    if (document.querySelector('.beats-grid')) {
        populateBeatsGrid();
    }
    if (document.getElementById('upload-form')) {
        initUploadForm();
    }
});
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}
function initFileUploads() {
    const coverFileInput = document.getElementById('cover-file');
    const coverPreview = document.getElementById('cover-preview');
    const audioFileInput = document.getElementById('audio-file');
    coverFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                coverPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    audioFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('Аудиофайл выбран:', file.name);
        }
    });
}
function populateBeatsGrid() {
    const beatsGrid = document.querySelector('.beats-grid');
    if (!beatsGrid) return;
    const beats = [
        {
            id: 1,
            title: "Dark Trap Beat",
            producer: "Артём",
            genre: "Трэп",
            bpm: 140,
            key: "A#",
            price: 29.99,
            cover: "assets/beat-cover1.jpg"
        },
        {
            id: 2,
            title: "Melodic Drill",
            producer: "Lost21",
            genre: "Дрилл",
            bpm: 145,
            key: "F#",
            price: 34.99,
            cover: "assets/beat-cover2.jpg"
        },
        {
            id: 3,
            title: "Smooth R&B",
            producer: "Katagoth",
            genre: "R&B",
            bpm: 92,
            key: "D",
            price: 24.99,
            cover: "assets/beat-cover3.jpg"
        },
        {
            id: 4,
            title: "Boom Bap",
            producer: "Wayx",
            genre: "Хип-хоп",
            bpm: 88,
            key: "C",
            price: 19.99,
            cover: "assets/beat-cover4.jpg"
        },
        {
            id: 5,
            title: "Trap Wave",
            producer: "Memories21",
            genre: "Трэп",
            bpm: 150,
            key: "G#",
            price: 39.99,
            cover: "assets/beat-cover5.jpg"
        },
        {
            id: 6,
            title: "Pop Instrumental",
            producer: "Aburabik",
            genre: "Поп",
            bpm: 120,
            key: "E",
            price: 27.99,
            cover: "assets/beat-cover6.jpg"
        }
    ];
    beatsGrid.innerHTML = '';
    beats.forEach(beat => {
        const beatCard = document.createElement('div');
        beatCard.className = 'beat-card';
        beatCard.innerHTML = `
            <img src="${beat.cover}" alt="${beat.title}" class="beat-cover">
            <div class="beat-info">
                <h3 class="beat-title">${beat.title}</h3>
                <p class="beat-producer">${beat.producer}</p>
                <div class="beat-meta">
                    <span>${beat.genre}</span>
                    <span>${beat.bpm} BPM • ${beat.key}</span>
                </div>
                <div class="beat-price">$${beat.price.toFixed(2)}</div>
                <div class="beat-actions">
                    <button class="play-btn"><i class="fas fa-play"></i> Слушать</button>
                    <button class="buy-btn"><a href="profile.html">Купить</button></a>
                </div>
            </div>
        `;
        beatsGrid.appendChild(beatCard);
    });
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Воспроизведение бита');
        });
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Покупка бита');
        });
    });
}
function initUploadForm() {
    const uploadForm = document.getElementById('upload-form');

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            title: document.getElementById('beat-title').value,
            genre: document.getElementById('genre').value,
            bpm: document.getElementById('bpm').value,
            key: document.getElementById('key').value,
            tags: document.getElementById('tags').value,
            description: document.getElementById('description').value,
            prices: {
                basic: document.querySelectorAll('.price-input input')[0].value,
                premium: document.querySelectorAll('.price-input input')[1].value,
                unlimited: document.querySelectorAll('.price-input input')[2].value,
                exclusive: document.querySelectorAll('.price-input input')[3].value
            }
        };
        console.log('Данные для загрузки:', formData);
        alert('Бит успешно загружен! (в реальном приложении данные будут отправлены на сервер)');
        uploadForm.reset();
        document.getElementById('cover-preview').src = 'assets/default-cover.jpg';
    });
}
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}