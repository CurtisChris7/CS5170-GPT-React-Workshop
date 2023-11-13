import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  createResponseService,
  createParentalService,
  createExpertResponseService,
  createLikeService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";
import Like from "./Like";

const schema = z.object({
  query: z.string(),
});
type FormData = z.infer<typeof schema>;

const QueryBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [queryResponse, setQueryResponse] = useState("");

  const onLike = () => {
    const { request, cancel } = createLikeService().post([
      { role: "user", content: query },
      { role: "assistant", content: queryResponse },
    ]);
    request
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.message);
        return false;
      });

    return true;
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true);
    const { request, cancel } = createResponseService().post([
      { role: "user", content: data.query },
    ]);
    request
      .then((res) => {
        setQuery(data.query);
        setQueryResponse(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setQuery("");
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        <label htmlFor="query" className="form-label">
          Ask me something:
        </label>
        <div className="mb-3 d-flex justify-content-between">
          <input
            {...register("query")}
            id="query"
            type="text"
            className="form-control"
          />
          <button className="btn btn-primary">Submit</button>
          {query && <Like color="red" onClick={onLike} />}
        </div>
        <div></div>
      </form>
      {isLoading && <div className="spinner-border"></div>}
      <ExpandableText>{queryResponse}</ExpandableText>
    </div>
  );
};

export default QueryBox;
