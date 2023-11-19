/**
 * This file contains the defition and logic for the creating a query form component.
 * This includes the submit button as well since this is treated as a form.
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
  createLikeService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

// This defines the schema for the form used, expand here for form input validation
const schema = z.object({
  subject: z.string(),
  modifier: z.string(),
  additional: z.string(),
});
type FormData = z.infer<typeof schema>;

/**
 * Formats the string in a parsable way for the GPT model on the backend
 * @param subject the subject to ask the GPT model about
 * @param modifier tone modifiers to tailor the response
 * @param additional additional info the for the model to be aware of
 * @return formated string to be sent as query to model
 */
const formatString = (
  subject: string,
  modifier: string,
  additional: string
) => {
  return (
    "Tell me about: [" +
    subject +
    "], answer me with the following tones in mind: [" +
    modifier +
    "]" +
    ", also please keep this in mind : [" +
    additional +
    "]."
  );
};

/**
 * Creates a query box, interacting with a gpt backend service.
 * Created using a React Hook Form, with fields as defined in the above schema.
 * @returns a QueryBox component
 */
const QueryForm = () => {
  // These variables are used for interacting with the form's state
  const {
    register, // Tracks the form fields
    handleSubmit, // Calls the on-submit logic
    formState: { errors, isValid }, // Tracks errors and wether or not the form is valid
  } = useForm<FormData>();

  // These variables trach the state of the component
  const [isLoading, setIsLoading] = useState(false); // Wether to show loading animation or not
  const [error, setError] = useState(""); // The error message (if any)
  const [queryResponse, setQueryResponse] = useState(""); // The most recent query response

  // Handles the on-sumbit logic for the form
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true); // Triggers the loading animation

    // Creates post request for backend gpt model
    const { request, cancel } = createResponseService().post([
      {
        role: "user",
        content: formatString(data.subject, data.modifier, data.additional),
      },
    ]);

    // Request is sent
    request
      .then((res) => {
        // Succesful request logic
        setQueryResponse(res.data); // We update the most recent query response
        console.log(res.data);
        setIsLoading(false); // We stop the loading animation
      })
      .catch((err) => {
        // Error handling logic
        setError(err.message); // We display the error message
        setIsLoading(false); // We stop the loading animation
      });
  };

  // We return the react markup needed for the component
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        <p>Ask me about something</p>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            What do you want to ask me about?
          </label>
          <input
            {...register("subject")}
            id="subject"
            type="text"
            className="form-control"
          />

          <label htmlFor="modifier" className="form-label">
            Describe the tone you want the response in:
          </label>
          <input
            {...register("modifier")}
            id="modifier"
            type="text"
            className="form-control"
          />

          <label htmlFor="additional" className="form-label">
            Is there anything else you want me to know about?:
          </label>
          <input
            {...register("additional")}
            id="additional"
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mb-3">Submit</button>
      </form>

      {isLoading && <div className="spinner-border"></div>}
      <ExpandableText>{queryResponse}</ExpandableText>
    </div>
  );
};

export default QueryForm;
