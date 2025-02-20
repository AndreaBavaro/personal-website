const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
const ALLOWED_IMAGE_DOMAINS = ['localhost', window.location.hostname];

export const validateImageSrc = (src) => {
  try {
    // For absolute URLs
    if (src.startsWith('http')) {
      const url = new URL(src);
      if (!ALLOWED_IMAGE_DOMAINS.includes(url.hostname)) {
        console.error('Invalid image domain:', url.hostname);
        return false;
      }
    }
    
    // For relative URLs, ensure they start with / and have valid extension
    if (src.startsWith('/')) {
      const extension = src.split('.').pop().toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
        console.error('Invalid image extension:', extension);
        return false;
      }
      // Prevent directory traversal
      if (src.includes('..')) {
        console.error('Directory traversal attempt detected');
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error validating image source:', error);
    return false;
  }
};

export const getDefaultImageSrc = () => '/placeholder-image.jpg';
