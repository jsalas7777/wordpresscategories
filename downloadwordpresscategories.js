require('dotenv').config();  // Load environment variables from .env
const axios = require('axios');

// Function to fetch categories from WordPress
async function getCategories() {
    const wpApiUrl = process.env.WP_API_URL || 'https://YOURWORDPRESSSITE.COM/wp-json/wp/v2'; // Fallback URL if .env is not used

    try {
        // Fetch categories from the WordPress REST API
        const response = await axios.get(`${wpApiUrl}/categories`);
        
        // Check if we got data
        if (response.data && response.data.length > 0) {
            const categoryMap = {};
            response.data.forEach((category) => {
                categoryMap[category.name] = category.id;
            });
            return categoryMap;
        } else {
            console.log('No categories found.');
            return {};
        }
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return {};
    }
}

// Example usage
getCategories().then((categories) => console.log(categories));