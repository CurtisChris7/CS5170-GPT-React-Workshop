/**
 * This file contains the defition and logic for the creating a ChatRoom component.
 * This includes the submit button as well since this is treated as a form.
 * The component interacts with the backend using pre-defined routes imported from the backend-services module.
 * @author Christopher Curtis
 */
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import {
  // Backend model route options
  createResponseService, // Default
  createParentalService,
  createExpertResponseService,
  createCustomChatService,
  createLikeService,
} from "../services/backend-service";
import "./ChatRoom.css";

// This defines the schema for the form used, expand here for form input validation
const schema = z.object({
  message: z.string(),
});
type FormData = z.infer<typeof schema>;

/**
 * Creates a chatroom, interacting with a gpt backend service.
 * Created using a React Hook Form, with fields as defined in the above schema.
 * @returns a ChatRoom component
 */
function ChatRoom() {
  // These variables are used for interacting with the form's state
  const {
    register, // Tracks the form fields
    handleSubmit, // Calls the on-submit logic
    formState: { errors, isValid }, // Tracks errors and wether or not the form is valid
  } = useForm<FormData>();

  // These variables trach the state of the component
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  // Handles the on-sumbit logic for the form
  const onSubmit = (data: FieldValues) => {
    // Constructs the latest inout for the message history
    const newRequest = {
      role: "user",
      content: data.message,
    };

    setIsLoading(true); // Activates the loading animation
    const originalHistory = [...messageHistory]; // Stores original history

    // Constructs message history payload
    let payload = [];
    for (let i = 0; i < messageHistory.length; i++) {
      payload.push({
        role: i % 2 === 0 ? "user" : "assistant",
        content: messageHistory[i],
      });
    }
    payload.push(newRequest); // Adds newest message to the end of the message history

    // console.log("PAYLOAD", payload);
    // We construct post request to include the interaction history
    const { request, cancel } = createCustomChatService().postMessages(payload);

    // Sends request
    request
      .then((res) => {
        // Succesful request logic
        setMessageHistory([...messageHistory, data.message, res.data]); // Updates the message history
        // console.log(res.data);
        setIsLoading(false); // Stops the loading animation
      })
      .catch((err) => {
        setError(err.message); // We display the error message
        setMessageHistory([...originalHistory]); // Reverts the message history
        setIsLoading(false); // Stops the loading animation
      });
  };

  // We return the react markup needed for the component
  return (
    <>
      <h1>Chat with me!</h1>
      <ul className="list-group ChatRoom">
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

export default ChatRoom;
