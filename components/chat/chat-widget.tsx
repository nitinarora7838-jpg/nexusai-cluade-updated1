'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, MessageCircle, RotateCcw, Sparkles, X } from 'lucide-react';
import { RichText } from '@/components/chat/rich-text';
import { ctaHref, ctaLabel, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  error?: boolean;
}

const STORAGE_KEY = 'nexus-chat-v1';
const MAX_LENGTH = 1000;

const GREETING =
  'Hi! I’m the Nexus AI assistant. Ask me anything about **AI Automation**, **AI Voice Chat** or **AI Voice Agents**: what they do, how setup works, or which one fits your business.';

const SUGGESTIONS = [
  'What’s the difference between voice chat and voice agents?',
  'How long does it take to go live?',
  'How does pricing work?',
  'Which tools can you connect to?',
];

const newId = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
const newSessionId = () => newId().slice(0, 16);

function loadState(): { sessionId: string; messages: ChatMessage[] } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.sessionId === 'string' && Array.isArray(parsed?.messages)) return parsed;
  } catch {
    /* storage unavailable or corrupt: start fresh */
  }
  return null;
}

function saveState(sessionId: string, messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, messages: messages.slice(-40) }));
  } catch {
    /* ignore */
  }
}

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);

  const panelId = useId();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Render only in the browser (the chat needs JavaScript), and restore this tab's conversation.
  useEffect(() => {
    const saved = loadState();
    setSessionId(saved?.sessionId ?? newSessionId());
    setMessages(saved?.messages ?? []);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && sessionId) saveState(sessionId, messages);
  }, [mounted, sessionId, messages]);

  // Keep the latest message in view
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Auto-grow the text box up to ~5 lines
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [input]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_LENGTH);
      if (!question || pending) return;

      setInput('');
      setMessages((prev) => [...prev.filter((m) => !m.error), { id: newId(), role: 'user', text: question }]);
      setPending(true);

      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 60_000);
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question, sessionId }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        const data = await res.json().catch(() => ({}));
        if (!res.ok || typeof data.reply !== 'string') {
          throw new Error(typeof data.error === 'string' ? data.error : 'failed');
        }
        setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: data.reply }]);
      } catch (err) {
        const message =
          err instanceof Error && err.message && err.message !== 'failed' && err.name !== 'AbortError'
            ? err.message
            : 'Sorry, I couldn’t answer that just now. Please try again in a moment.';
        setMessages((prev) => [
          ...prev,
          {
            id: newId(),
            role: 'assistant',
            error: true,
            text: `${message} You can also email us at [${siteConfig.email}](mailto:${siteConfig.email}).`,
          },
        ]);
      } finally {
        setPending(false);
        inputRef.current?.focus();
      }
    },
    [pending, sessionId],
  );

  const retry = () => {
    const lastQuestion = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastQuestion) return;
    setMessages((prev) => prev.filter((m) => !m.error && m.id !== lastQuestion.id));
    send(lastQuestion.text);
  };

  const startOver = () => {
    setMessages([]);
    setSessionId(newSessionId());
    setInput('');
    inputRef.current?.focus();
  };

  if (!mounted) return null;

  const showSuggestions = messages.length === 0 && !pending;

  return (
    <>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex animate-fade-up flex-col overflow-hidden bg-panel backdrop-blur-xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-line-2 sm:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_60px_-24px_rgba(76,141,255,0.55)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
            <span className="icon-tile relative grid h-10 w-10 shrink-0 place-items-center rounded-full">
              <Sparkles className="h-5 w-5 text-[#BFD6FF]" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#05070d] bg-ok" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="font-space text-base font-semibold leading-tight">
                Ask Nexus AI
              </h2>
              <p className="text-xs text-muted">AI assistant · replies in seconds</p>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={startOver}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-fg"
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={close}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-fg"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            <AssistantBubble>
              <RichText text={GREETING} />
            </AssistantBubble>

            {showSuggestions && (
              <div className="flex flex-col items-start gap-2 pl-10">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="glass-chip rounded-xl px-3 py-2 text-left text-sm text-body transition-colors hover:border-brand/60 hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-solid px-4 py-2.5 text-sm leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <AssistantBubble key={m.id} error={m.error}>
                  <RichText text={m.text} />
                  {m.error && (
                    <button
                      type="button"
                      onClick={retry}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      Try again
                    </button>
                  )}
                </AssistantBubble>
              ),
            )}

            {pending && (
              <AssistantBubble>
                <span className="flex items-center gap-1 py-1" role="status">
                  <span className="sr-only">The assistant is typing</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-pulse rounded-full bg-muted"
                      style={{ animationDelay: `${delay}ms` }}
                      aria-hidden="true"
                    />
                  ))}
                </span>
              </AssistantBubble>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-line px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 rounded-2xl border border-line-2 bg-[rgba(2,6,20,0.45)] p-1.5 pl-4 transition-colors focus-within:border-brand/60"
            >
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Type your question
              </label>
              <textarea
                id={`${panelId}-input`}
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_LENGTH}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask a question…"
                className="max-h-[132px] flex-1 resize-none bg-transparent py-2 text-base text-fg placeholder:text-muted focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || pending}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-solid text-white transition-opacity hover:bg-brand-solid-hover disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs leading-snug text-muted">AI can make mistakes. For a tailored plan, talk to us.</p>
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-full border border-white/20 bg-transparent px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-brand/60 hover:text-brand"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Launcher: transparent, frosted-glass button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          'btn-glass-glow fixed bottom-4 right-4 z-[61] inline-flex h-14 items-center gap-2.5 rounded-full px-4 text-sm font-semibold text-fg sm:bottom-6 sm:right-6 sm:px-5',
          open && 'max-sm:hidden',
        )}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5 text-brand" aria-hidden="true" />
        )}
        <span className={cn(open ? 'sr-only' : 'max-sm:sr-only')}>{open ? 'Close chat' : 'Ask Nexus AI'}</span>
      </button>
    </>
  );
}

function AssistantBubble({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="icon-tile mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
        aria-hidden="true"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#BFD6FF]" />
      </span>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl rounded-tl-md border px-4 py-2.5 text-sm leading-relaxed',
          error ? 'border-red-400/30 bg-red-400/10 text-red-100' : 'border-line-2 bg-[rgba(76,141,255,0.07)] text-body',
        )}
      >
        {children}
      </div>
    </div>
  );
}
