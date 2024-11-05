import { useEffect, useState } from "react";
import { createService } from "../services/backend-service.ts";
import { CanceledError } from "../services/api-client.ts";
import { ServiceCategory } from "../types.ts";


const useText = (info: string, serviceString: ServiceCategory) =>{
    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");
    const [textIsLoading, setTextIsLoading] = useState(false);
  
    useEffect(() => {
      setTextIsLoading(true);
  
      const { request, cancel } = createService(serviceString).get(info);
      request
        .then((res) => {
          setText(res.data);
          setTextIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setTextError(err.message);
          setTextIsLoading(false);
        });
  
      return () => cancel();
    }, [info]);

    return { text, textError, textIsLoading, setText, setTextError, setTextIsLoading };
}

export default useText;
