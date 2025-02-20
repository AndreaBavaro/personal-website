import React, { useState } from 'react';
import { Box } from '@mui/material';
import { validateImageSrc, getDefaultImageSrc } from '../utils/imageUtils';

const SecureImage = ({ src, alt, sx = {}, ...props }) => {
  const [error, setError] = useState(false);
  const [validatedSrc, setValidatedSrc] = useState(() => {
    return validateImageSrc(src) ? src : getDefaultImageSrc();
  });

  const handleError = () => {
    console.error('Image failed to load:', src);
    setError(true);
    setValidatedSrc(getDefaultImageSrc());
  };

  // Re-validate when src changes
  React.useEffect(() => {
    if (validateImageSrc(src)) {
      setValidatedSrc(src);
      setError(false);
    } else {
      handleError();
    }
  }, [src]);

  return (
    <Box
      component="img"
      src={validatedSrc}
      alt={alt || 'Image'}
      onError={handleError}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        ...sx
      }}
      {...props}
    />
  );
};

export default SecureImage;
