// ============================================
// BLOG POST NAVIGATION & RELATED POSTS
// ============================================


class BlogPostNavigation {
    constructor() {
        this.allPosts = [];
        this.currentPost = null;
        this.currentSlug = this.getCurrentSlug();
    }


    getCurrentSlug() {
        // Extract slug from URL
        // URL format: blog/posts/post-slug.html
        const path = window.location.pathname;
        const match = path.match(/\/posts\/([^/]+)\.html$/);
        return match ? match[1] : null;
    }


    async init() {
        if (!this.currentSlug) {
            console.log('Not on a blog post page');
            return;
        }


        console.log('🔗 Initializing post navigation...');


        // Load all posts data
        await this.loadPostsData();


        // Find current post
        this.currentPost = this.allPosts.find(post => post.slug === this.currentSlug);


        if (!this.currentPost) {
            console.warn('Current post not found in posts data');
            return;
        }


        // Generate navigation
        this.generatePrevNextNav();
        this.generateRelatedPosts();


        console.log('✅ Post navigation initialized');
    }


    async loadPostsData() {
        // In a real setup, this would load from a JSON file or API
        // For now, we'll use the blogPosts array from blog.js
        
        // Check if blogPosts is available globally
        if (typeof blogPosts !== 'undefined') {
            this.allPosts = [...blogPosts];
        } else {
            // If not available, try to fetch from a JSON file
            try {
                const response = await fetch('../../blog-posts-data.json');
                if (response.ok) {
                    const data = await response.json();
                    this.allPosts = data.posts || data;
                }
            } catch (error) {
                console.warn('Could not load posts data:', error);
                // Fallback: try to load from blog.js script
                await this.loadBlogScript();
            }
        }


        // Sort by date (newest first)
        this.allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }


    async loadBlogScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '../../assets/js/blog.js';
            script.onload = () => {
                if (typeof blogPosts !== 'undefined') {
                    this.allPosts = [...blogPosts];
                    resolve();
                } else {
                    reject(new Error('blogPosts not defined'));
                }
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }


    generatePrevNextNav() {
        const currentIndex = this.allPosts.findIndex(post => post.slug === this.currentSlug);
        
        if (currentIndex === -1) return;


        const prevPost = this.allPosts[currentIndex + 1]; // Next in array is older
        const nextPost = this.allPosts[currentIndex - 1]; // Previous in array is newer


        // Find the navigation container
        const navContainer = document.querySelector('.post-navigation-container');
        if (!navContainer) {
            console.warn('Navigation container not found');
            return;
        }


        let html = '<div class="grid md:grid-cols-2 gap-8">';


        // Previous (older) post
        if (prevPost) {
            html += `
                <a href="${prevPost.slug}.html" class="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500">
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        <span>Previous Post</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition line-clamp-2">
                        ${prevPost.title}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        ${prevPost.excerpt}
                    </p>
                </a>
            `;
        } else {
            html += '<div></div>'; // Empty space if no previous post
        }


        // Next (newer) post
        if (nextPost) {
            html += `
                <a href="${nextPost.slug}.html" class="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-all text-right border-2 border-transparent hover:border-green-500">
                    <div class="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Next Post</span>
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition line-clamp-2">
                        ${nextPost.title}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        ${nextPost.excerpt}
                    </p>
                </a>
            `;
        }


        html += '</div>';


        navContainer.innerHTML = html;
    }


    generateRelatedPosts() {
        const relatedContainer = document.querySelector('.related-posts-container');
        if (!relatedContainer) {
            console.warn('Related posts container not found');
            return;
        }


        // Find related posts by category and tags
        const relatedPosts = this.findRelatedPosts();


        if (relatedPosts.length === 0) {
            relatedContainer.innerHTML = '<p class="text-center text-gray-600 dark:text-gray-400">No related posts found.</p>';
            return;
        }


        let html = '<div class="grid md:grid-cols-3 gap-8">';


        relatedPosts.slice(0, 3).forEach(post => {
            const categoryColors = {
                sustainability: 'bg-green-500',
                recycling: 'bg-blue-500',
                community: 'bg-purple-500',
                innovation: 'bg-red-500',
                news: 'bg-amber-500'
            };


            const categoryColor = categoryColors[post.category] || 'bg-gray-500';


            html += `
                <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div class="relative h-48 overflow-hidden">
                        <img 
                            src="${post.image}" 
                            alt="${post.title}"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            onerror="this.src='../../assets/images/blog/placeholder.jpg'"
                        >
                        <span class="absolute bottom-4 right-4 ${categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                            ${post.category}
                        </span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            ${post.title}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                            ${post.excerpt}
                        </p>
                        <a 
                            href="${post.slug}.html" 
                            class="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
                        >
                            Read More
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </article>
            `;
        });


        html += '</div>';


        relatedContainer.innerHTML = html;
    }


    findRelatedPosts() {
        // Exclude current post
        const otherPosts = this.allPosts.filter(post => post.slug !== this.currentSlug);


        // Score posts by relevance
        const scoredPosts = otherPosts.map(post => {
            let score = 0;


            // Same category = +5 points
            if (post.category === this.currentPost.category) {
                score += 5;
            }


            // Shared tags = +2 points each
            const sharedTags = post.tags.filter(tag => 
                this.currentPost.tags.includes(tag)
            );
            score += sharedTags.length * 2;


            // Recent posts = +1 point if within 6 months
            const postDate = new Date(post.date);
            const currentDate = new Date(this.currentPost.date);
            const monthsDiff = Math.abs((postDate - currentDate) / (1000 * 60 * 60 * 24 * 30));
            if (monthsDiff <= 6) {
                score += 1;
            }


            return { post, score };
        });


        // Sort by score (highest first)
        scoredPosts.sort((a, b) => b.score - a.score);


        // Return top posts (only those with score > 0)
        return scoredPosts
            .filter(item => item.score > 0)
            .map(item => item.post);
    }
}


// Initialize on post pages
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a blog post page
    if (document.querySelector('.prose') && window.location.pathname.includes('/posts/')) {
        setTimeout(() => {
            const navigation = new BlogPostNavigation();
            navigation.init();
        }, 500);
    }
});
