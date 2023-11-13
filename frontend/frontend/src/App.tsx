import { useEffect, useState } from "react";
import "./App.css";

import QueryBox from "./components/QueryBox";
import QueryForm from "./components/QueryForm";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div>
      <QueryBox />
      <br />
      <QueryForm />
      <br />
      <ChatBox />
    </div>
  );
}

export default App;
