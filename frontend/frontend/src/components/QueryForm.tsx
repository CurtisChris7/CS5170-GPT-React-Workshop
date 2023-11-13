import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  createResponseService,
  createParentalService,
  createExpertResponseService,
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

const schema = z.object({
  subject: z.string(),
  modifier: z.string(),
  additional: z.string(),
});
type FormData = z.infer<typeof schema>;

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

const QueryBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [queryResponse, setQueryResponse] = useState("");

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true);
    const { request, cancel } = createParentalService().post([
      {
        role: "user",
        content: formatString(data.subject, data.modifier, data.additional),
      },
    ]);
    request
      .then((res) => {
        setQueryResponse(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

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

export default QueryBox;
