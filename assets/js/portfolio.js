// Portfolio functionality for Mohan Kumar's Video Editing Portfolio

class Portfolio {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('featuredWorkModal');
        this.modalClose = document.getElementById('featuredWorkModalClose');
        this.videos = [];
        
        this.init();
    }

    async init() {
        await this.loadVideos();
        this.setupEventListeners();
        this.renderPortfolioItems();
    }

    async loadVideos() {
        try {
            const response = await fetch('videos-data.json');
            this.videos = await response.json();
        } catch (error) {
            console.error('Error loading videos:', error);
            this.videos = []; // Use empty array if loading fails
        }
    }

    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-filter');
                this.filterPortfolio(category);
            });
        });

        // Modal close button
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    renderPortfolioItems() {
        if (!this.portfolioGrid) return;

        this.portfolioGrid.innerHTML = this.videos.map((video, index) => {
            const category = this.getCategoryFromTitle(video.title);
            return `
                <div class="portfolio-item fade-in" data-category="${category}" style="animation-delay: ${index * 0.1}s">
                    <div class="relative group">
                        <img 
                            src="${video.thumbnail}" 
                            alt="${video.title}"
                            class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                        >
                        <button 
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-accent)] w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                            onclick="window.open('${video.driveLink}', '_blank')"
                        >
                            <i data-lucide="play" class="w-6 h-6"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-white">${this.formatTitle(video.title)}</h3>
                        <p class="text-gray-400 mb-4">Beautiful cinematic video capturing memorable moments</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-[var(--color-accent)]">${category.charAt(0).toUpperCase() + category.slice(1)} Video</span>
                            <button 
                                class="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white rounded-md transition-colors"
                                onclick="window.open('${video.driveLink}', '_blank')"
                            >
                                Watch Now
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Initialize Lucide icons for new elements
        lucide.createIcons();
    }

    filterPortfolio(category) {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || category === itemCategory) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }

    formatTitle(title) {
        return title
            .replace('.mp4', '')
            .split(/[_-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getCategoryFromTitle(title) {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('wedding') || lowerTitle.includes('bride') || lowerTitle.includes('groom')) return 'wedding';
        if (lowerTitle.includes('event')) return 'event';
        if (lowerTitle.includes('festival') || lowerTitle.includes('fest')) return 'festival';
        if (lowerTitle.includes('corporate') || lowerTitle.includes('business')) return 'corporate';
        return 'other';
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.add('opacity-0', 'pointer-events-none');
        const iframe = this.modal.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
    }
    
    setupMasonryLayout() {
        if (!this.grid) return;
        
        // Simple masonry-like layout using CSS Grid
        this.grid.style.display = 'grid';
        this.grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        this.grid.style.gap = '2rem';
        
        // Add staggered animation
        this.items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.items.forEach(item => {
            observer.observe(item);
        });
    }
    
    addHoverEffects() {
        this.items.forEach(item => {
            const videoCard = item.querySelector('.video-card');
            
            if (videoCard) {
                videoCard.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = 'var(--shadow-xl)';
                });
                
                videoCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'var(--shadow-md)';
                });
            }
        });
    }
}

class VideoPreview {
    constructor() {
        this.videoCards = document.querySelectorAll('.video-card');
        this.previewTimeout = null;
        this.currentPreview = null;
        
        this.init();
    }
    
    init() {
        this.addPreviewHandlers();
    }
    
    addPreviewHandlers() {
        this.videoCards.forEach(card => {
            const thumbnail = card.querySelector('.video-thumbnail');
            
            if (thumbnail) {
                thumbnail.addEventListener('mouseenter', (e) => {
                    this.startPreview(card);
                });
                
                thumbnail.addEventListener('mouseleave', (e) => {
                    this.stopPreview(card);
                });
            }
        });
    }
    
    startPreview(card) {
        // Clear any existing preview
        this.stopPreview();
        
        const videoSrc = card.getAttribute('data-video-src');
        if (!videoSrc) return;
        
        // Create preview video element
        const previewVideo = document.createElement('video');
        previewVideo.src = videoSrc;
        previewVideo.muted = true;
        previewVideo.loop = true;
        previewVideo.autoplay = true;
        previewVideo.className = 'video-preview';
        
        // Style the preview video
        previewVideo.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
        `;
        
        // Add to thumbnail
        const thumbnail = card.querySelector('.video-thumbnail');
        thumbnail.style.position = 'relative';
        thumbnail.appendChild(previewVideo);
        
        this.currentPreview = previewVideo;
        
        // Set timeout to stop preview
        this.previewTimeout = setTimeout(() => {
            this.stopPreview(card);
        }, 5000); // 5 second preview
    }
    
    stopPreview(card = null) {
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
            this.previewTimeout = null;
        }
        
        if (this.currentPreview) {
            this.currentPreview.pause();
            this.currentPreview.remove();
            this.currentPreview = null;
        }
        
        // If specific card provided, stop its preview
        if (card) {
            const previewVideo = card.querySelector('.video-preview');
            if (previewVideo) {
                previewVideo.pause();
                previewVideo.remove();
            }
        }
    }
}

class PortfolioSearch {
    constructor() {
        this.searchInput = document.querySelector('.portfolio-search input');
        this.searchResults = document.querySelector('.search-results');
        this.allItems = document.querySelectorAll('.portfolio-item');
        
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        this.searchInput.addEventListener('focus', () => {
            this.showSearchResults();
        });
    }
    
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.showAllItems();
            return;
        }
        
        this.allItems.forEach(item => {
            const title = item.querySelector('h3, h4')?.textContent.toLowerCase() || '';
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            const category = item.getAttribute('data-category') || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
        
        this.updateSearchResults(query);
    }
    
    showAllItems() {
        this.allItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('hidden');
        });
    }
    
    updateSearchResults(query) {
        if (!this.searchResults) return;
        
        const visibleItems = Array.from(this.allItems).filter(item => 
            !item.classList.contains('hidden')
        );
        
        if (query && visibleItems.length === 0) {
            this.searchResults.innerHTML = '<p>No results found for "' + query + '"</p>';
            this.searchResults.style.display = 'block';
        } else {
            this.searchResults.style.display = 'none';
        }
    }
    
    showSearchResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'block';
        }
    }
}

class PortfolioSort {
    constructor() {
        this.sortSelect = document.querySelector('.portfolio-sort select');
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.items = Array.from(document.querySelectorAll('.portfolio-item'));
        
        this.init();
    }
    
    init() {
        if (this.sortSelect) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.sortSelect.addEventListener('change', (e) => {
            this.sortItems(e.target.value);
        });
    }
    
    sortItems(sortBy) {
        const sortedItems = [...this.items].sort((a, b) => {
            switch (sortBy) {
                case 'title-asc':
                    return this.getTitle(a).localeCompare(this.getTitle(b));
                case 'title-desc':
                    return this.getTitle(b).localeCompare(this.getTitle(a));
                case 'category-asc':
                    return this.getCategory(a).localeCompare(this.getCategory(b));
                case 'category-desc':
                    return this.getCategory(b).localeCompare(this.getCategory(a));
                case 'date-newest':
                    return this.getDate(b) - this.getDate(a);
                case 'date-oldest':
                    return this.getDate(a) - this.getDate(b);
                default:
                    return 0;
            }
        });
        
        // Reorder items in DOM
        sortedItems.forEach(item => {
            this.portfolioGrid.appendChild(item);
        });
        
        // Animate reordered items
        this.animateSortedItems();
    }
    
    getTitle(item) {
        return item.querySelector('h3, h4')?.textContent || '';
    }
    
    getCategory(item) {
        return item.getAttribute('data-category') || '';
    }
    
    getDate(item) {
        const dateAttr = item.getAttribute('data-date');
        return dateAttr ? new Date(dateAttr).getTime() : 0;
    }
    
    animateSortedItems() {
        this.items.forEach((item, index) => {
            item.style.transition = 'transform 0.3s ease';
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 50);
        });
    }
}

// Initialize portfolio functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize portfolio filter
    window.portfolioFilter = new PortfolioFilter();
    
    // Initialize portfolio grid
    window.portfolioGrid = new PortfolioGrid();
    
    // Initialize video preview
    window.videoPreview = new VideoPreview();
    
    // Initialize search if search input exists
    if (document.querySelector('.portfolio-search input')) {
        window.portfolioSearch = new PortfolioSearch();
    }
    
    // Initialize sort if sort select exists
    if (document.querySelector('.portfolio-sort select')) {
        window.portfolioSort = new PortfolioSort();
    }
    
    // Add lazy loading for images
    addLazyLoading();
    
    // Add infinite scroll if needed
    addInfiniteScroll();
}

function addLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function addInfiniteScroll() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // Add more items here
                this.textContent = 'Load More';
                this.disabled = false;
            }, 1000);
        });
    }
}

// Utility functions
function filterPortfolio(category) {
    if (window.portfolioFilter) {
        window.portfolioFilter.setActiveFilter(category);
    }
}

function searchPortfolio(query) {
    if (window.portfolioSearch) {
        window.portfolioSearch.performSearch(query);
    }
}

function sortPortfolio(sortBy) {
    if (window.portfolioSort) {
        window.portfolioSort.sortItems(sortBy);
    }
}

// Export for use in other files
window.PortfolioFilter = PortfolioFilter;
window.PortfolioGrid = PortfolioGrid;
window.VideoPreview = VideoPreview;
window.PortfolioSearch = PortfolioSearch;
window.PortfolioSort = PortfolioSort;
window.filterPortfolio = filterPortfolio;
window.searchPortfolio = searchPortfolio;
window.sortPortfolio = sortPortfolio;
