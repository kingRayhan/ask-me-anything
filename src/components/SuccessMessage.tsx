import React from "react";

interface Props {
  onBack?: () => void;
}

const SuccessMessage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="my-12 mx-auto px-4 text-slate-700">
      <h2 className="text-4xl font-semibold">
        Thanks for your message, I will reply soon
      </h2>

      <div className=" my-2">
        <button
          onClick={() => onBack?.()}
          className=" bg-slate-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send Another Message
        </button>
      </div>

      <iframe
        src="https://giphy.com/embed/26ufdipQqU2lhNA4g"
        width="480"
        height="480"
        allowFullScreen
        className="my-8 mx-auto"
      ></iframe>
    </div>
  );
};

export default SuccessMessage;
