import React from "react";
import { api } from "~/utils/api";

interface Props {
  onMessageSent?: () => void;
}

const HomeComponent: React.FC<Props> = ({ onMessageSent }) => {
  const { mutate, isLoading } = api.message.create.useMutation({
    onSuccess: () => {
      onMessageSent?.();
    },
  });
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return alert("Please enter your message");
    mutate({ text: message });
  };

  return (
    <div className="my-12 mx-auto px-4 text-slate-700">
      <h2 className="text-4xl font-semibold">
        Hi, I am <span className="name-marker">Rayhan</span>
      </h2>

      <div className="mt-8 text-left">
        <h1 className="inline-flex flex-col gap-3 text-2xl md:text-3xl">
          <span className="call-to-action-text call-to-action-text--line-1">
            Ask me anything
          </span>
          <span>
            I will give you anwer at my{" "}
            <a href="#" className="bg-[#1877F2] px-2 text-white">
              Facebook
            </a>
          </span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          rows={3}
          name="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-solid border-slate-800 bg-transparent p-4"
        ></textarea>

        <button
          disabled={isLoading}
          className=" bg-slate-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default HomeComponent;
