/**
 * This file contains the defition and logic for the creating a query box component.
 * This includes the submit and like components as well since this is treated as a form.
 * The component interacts with the backend using pre-defined routes imported from the backend-services module.
 * @author Christopher Curtis
 */
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  // Backend model route options
  createResponseService, // Default
  createParentalService,
  createExpertResponseService,
  createVeryRudeService,
  createLikeService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";
import Like from "./Like";

// This defines the schema for the form used, expand here for form input validation
const schema = z.object({
  query: z.string(),
});
type FormData = z.infer<typeof schema>;

/**
 * Creates a query box, interacting with a gpt backend service.
 * Created using a React Hook Form, with fields as defined in the above schema.
 * @returns a QueryBox component
 */
const QueryBox = () => {
  // These variables are used for interacting with the form's state
  const {
    register, // Tracks the form fields
    handleSubmit, // Calls the on-submit logic
    formState: { errors, isValid }, // Tracks errors and wether or not the form is valid
  } = useForm<FormData>();

  // These variables trach the state of the component
  const [isLoading, setIsLoading] = useState(false); // Wether to show loading animation or not
  const [error, setError] = useState(""); // The error message (if any)
  const [query, setQuery] = useState(""); // The most recent user query
  const [queryResponse, setQueryResponse] = useState(""); // The most recent query response

  // Handles the on-sumbit logic for the form
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true); // Triggers the loading animation

    // Creates post request for backend gpt model
    const { request, cancel } = createVeryRudeService().postMessages([
      { role: "user", content: data.query },
    ]);

    // Request is sent
    request
      .then((res) => {
        // Succesful request logic
        setQuery(data.query); // We track the most recent query
        setQueryResponse(res.data); // We update the most recent query response
        console.log(res.data);
        setIsLoading(false); // We stop the loading animation
      })
      .catch((err) => {
        // Error handling logic
        setQuery(""); // We do not keep track of the failed query
        setError(err.message); // We display the error message
        setIsLoading(false); // We stop the loading animation
      });
  };

  // Handles the like functionality
  const onLike = () => {
    // We construct post request to include the interaction history
    const { request, cancel } = createLikeService().post([
      { role: "user", content: query },
      { role: "assistant", content: queryResponse },
    ]);
    // Request is sent
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

  // We return the react markup needed for the component
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
