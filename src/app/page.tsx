"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat, useCompletion } from "@ai-sdk/react";
import { ArrowRightIcon } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const {
    completion,
    setCompletion,
    isLoading,
    handleSubmit,
    handleInputChange,
  } = useCompletion({
    api: "/api/chat",
  });

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    // Scroll to the bottom of the chat
    const chatContainer = document.getElementById("chat");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [completion]);

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-5xl mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: completion }}
        className="py-6 px-2"
        id="chat"
      />

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 sticky bottom-1 bg-slate-100 shadow border border-slate-200 p-4 rounded-2xl transition-all mt-auto"
      >
        <Input
          onChange={handleInputChange}
          placeholder="what are you looking for..."
          className="flex-1 h-12"
        />
        <Button
          type="submit"
          size={"sm"}
          disabled={isLoading}
          className="rounded-full h-10 w-10 -rotate-90 cursor-pointer"
        >
          <ArrowRightIcon />
        </Button>
      </form>
    </div>
  );
}
