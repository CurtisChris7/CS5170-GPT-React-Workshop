import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { string, z } from "zod";
import {
  createResponseService,
  createParentalService,
  createExpertResponseService,
} from "../services/backend-service";
import "./ChatBox.css";

const schema = z.object({
  message: z.string(),
});
type FormData = z.infer<typeof schema>;

function ChatBox() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const onSubmit = (data: FieldValues) => {
    const newRequest = {
      role: "user",
      content: data.message,
    };

    setIsLoading(true);
    const originalHistory = [...messageHistory];

    let payload = [];
    for (let i = 0; i < messageHistory.length; i++) {
      payload.push({
        role: i % 2 === 0 ? "user" : "assistant",
        content: messageHistory[i],
      });
    }
    payload.push(newRequest);

    console.log("PAYLOAD", payload);

    const { request, cancel } = createResponseService().post(payload);
    request
      .then((res) => {
        setMessageHistory([...messageHistory, data.message, res.data]);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setMessageHistory([...originalHistory]);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Chat with me!</h1>
      <ul className="list-group ChatBox">
        {messageHistory.length === 0 ? (
          <p>Let's get started!</p>
        ) : (
          messageHistory.map((item, index) => (
            <li
              className={"list-group-item " + (index % 2 === 0 ? "" : "")}
              key={index}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {index % 2 === 0 ? "User" : "Bot"}
                </div>
                {item}
              </div>
            </li>
          ))
        )}
        {isLoading && <div className="spinner-border"></div>}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        <label htmlFor="message" className="form-label">
          Ask me something:
        </label>
        <div className="mb-3 d-flex justify-content-between">
          <input
            {...register("message")}
            id="message"
            type="text"
            className="form-control"
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
}

export default ChatBox;
