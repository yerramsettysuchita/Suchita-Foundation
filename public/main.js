// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeNavigation();
    initializeScrollEffects();
    initializeVideoPlaylists();
});
// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    document.querySelector('.search-container')?.appendChild(searchResults);

    searchInput?.addEventListener('input', debounce(async (e) => {
        const searchTerm = e.target.value;
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`/api/search?q=${searchTerm}`);
            const results = await response.json();
            
            searchResults.innerHTML = results.map(result => `
                <a href="/${result.slug}" class="search-result-item">
                    <h3>${result.title}</h3>
                    <p>${result.content.substring(0, 100)}...</p>
                </a>
            `).join('');
            
            searchResults.style.display = results.length ? 'block' : 'none';
        } catch (error) {
            console.error('Search error:', error);
        }
    }, 300));
}

// Navigation Functionality
function initializeNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', async (e) => {
            e.preventDefault();
            const path = item.getAttribute('href');
            navigateTo(path);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            navigateTo(e.state.path, false);
        }
    });
}

function navigateTo(path, pushState = true) {
    // Check if it's an external link or new tab request
    if (path.startsWith('http') || path.startsWith('//')) {
        window.open(path, '_blank');
        return;
    }

    const specialRoutes = {
        '/': '/',
        '/about-us': '/about.html',
        '/our-work': '/our-work.html'  // Add direct link to our-work.html
    };

    if (specialRoutes.hasOwnProperty(path)) {
        window.location.href = specialRoutes[path];
        return;
    }

    // For other pages, use API
    fetchPageContent(path, pushState);
}

async function fetchPageContent(path, pushState) {
    try {
        const response = await fetch(`/api/pages${path}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pageData = await response.json();
        
        document.querySelector('main').innerHTML = pageData.content;
        
        if (pushState) {
            history.pushState({ path: path }, '', path);
        }
    } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to direct page load if API fails
        window.location.href = path;
    }
}

function updateInterventionsContent(section, data) {
    const interventionsGrid = section.querySelector('.interventions-grid');
    interventionsGrid.innerHTML = data.map(intervention => `
        <div class="intervention-card">
            <img src="${intervention.image}" alt="${intervention.title}">
            <div class="card-content">
                <h3>${intervention.title}</h3>
                <p>${intervention.description}</p>
                <div class="details">${intervention.details}</div>
            </div>
        </div>
    `).join('');
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}
// Video Playlists Functionality
function initializeVideoPlaylists() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    const viewPlaylistButtons = document.querySelectorAll('.view-playlist');

    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const playlistId = this.dataset.playlistId;
            if (playlistId) {
                // Open video in new tab instead of loading in place
                window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
            }
        });
    });

    viewPlaylistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default action
            const playlistId = this.dataset.playlistId;
            if (playlistId) {
                window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
            }
        });
    });
}


// Function to load YouTube playlist
function loadYouTubePlaylist(playlistId, container) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('src', `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    
    container.innerHTML = '';
    container.appendChild(iframe);
}

// Helper function for debouncing search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}