"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StartChatButtonProps = {
  targetUserId: string;
  targetUserName?: string;
  className?: string;
};

export function StartChatButton({ targetUserId, targetUserName, className }: StartChatButtonProps) {
  const { user } = useAuth();
  const [canChat, setCanChat] = useState(false);

  useEffect(() => {
    if (user?.id && user.id !== targetUserId) {
      setCanChat(true);
    }
  }, [user?.id, targetUserId]);

  const handleOpenChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat", {
        detail: { recipientId: targetUserId },
      })
    );
  };

  if (!canChat) return null;

  return (
    <Button onClick={handleOpenChat} className={cn("glass-btn", className)}>
      <MessageCircle className="w-4 h-4 mr-2" />
      {`Conversar${targetUserName ? ` com ${targetUserName}` : ""}`}
    </Button>
  );
} 