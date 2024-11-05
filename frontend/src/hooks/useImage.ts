import { useEffect, useState } from "react";
import { createImageService, createSampleImageService } from "../services/backend-service.ts";
import { CanceledError } from "../services/api-client";


const useImage = (info: string) =>{
    const [image, setImage] = useState(new Blob());
    const [imgError, setImgError] = useState("");
    const [imgIsLoading, setImgIsLoading] = useState(false);
  
    useEffect(() => {
        setImgIsLoading(true);
  
      const { request, cancel } = createSampleImageService().getImage("");
      request
        .then((res) => {
          setImage(res.data);
          setImgIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setImgError(err.message);
          setImgIsLoading(false);
        });
  
      return () => cancel();
    }, [info]);

    return { image, imgError, imgIsLoading, setImage, setImgError, setImgIsLoading };
}

export default useImage;
