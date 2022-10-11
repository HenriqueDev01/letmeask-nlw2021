import React, { memo, useCallback, useState } from 'react';

import './userImage.scss';

interface UserImageProps { 
  userName: string;
  imageSrc?: string;
}
const UserImage: React.FC<UserImageProps> = ({userName, imageSrc}) => {
  const [authorImgSrc, setAuthorImgSrc] = useState<string|undefined>(imageSrc);

  const onLoadImageError = useCallback(() => {
    setAuthorImgSrc(undefined)
  }, []);
  
  if (authorImgSrc) {
    return <img src={authorImgSrc} alt={userName} onError={onLoadImageError}/>
  }
  return <span className="not-image">?</span>
}

export default memo(UserImage);