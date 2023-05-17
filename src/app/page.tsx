"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  // call the API route to execute the prompt
  const executePrompt = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/ask", {
        method: "post",
        body: JSON.stringify({
          prompt: formData.get("prompt"),
        }),
      });

      // Form submitted successfully
      const { data } = await response.json();

      setUrl(`${window.location.host}/search/${data}`);
    } catch (error) {
      // Handle network error
      console.log("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Let me GPT that for you</h1>
      <div className="z-10 w-full max-w-5xl items-center  font-mono text-sm">
        <form onSubmit={executePrompt} className="w-full">
          <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
            <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
              <textarea
                className="m-0 w-full outline-none resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
                style={{ maxHeight: 200 }}
                name="prompt"
                placeholder="Send a message"
              />
            </div>
          </div>
          <button className="px-4 py-2 mt-2 text-sm font-medium tracking-wider text-white uppercase bg-indigo-500 rounded-lg focus:outline-none hover:bg-indigo-600 focus:bg-indigo-600">
            Submit
          </button>
        </form>

        {/* url box */}
        <div>
          <p>{url}</p>
        </div>
      </div>
    </main>
  );
}
