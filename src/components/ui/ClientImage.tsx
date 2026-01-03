'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

interface ClientImageProps extends Omit<ImageProps, 'objectFit'> {
  fallback: React.ReactNode;
  objectFit?: ObjectFit;
}

export default function ClientImage({
  src,
  fallback,
  objectFit = 'cover', // Default to 'cover'
  alt,
  ...props
}: ClientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt || ''}
      fill
      style={{ objectFit }}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
