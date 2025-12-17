"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useCallback } from 'react';
import { Heading, Bold, Italic, Strikethrough, List, ListOrdered, Quote, Undo, Redo, Save, Check } from 'lucide-react';
import SlashCommand from '@/components/slash-command';
import DOMPurify from 'dompurify';

// Sanitize HTML content to prevent XSS
const sanitizeContent = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 's', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['class'],
  });
};

const BlockEditor = () => {
  const [showSlash, setShowSlash] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type '/' for commands, or start writing...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-1",
      },
    },
    content: '',
    onUpdate: ({ editor }) => {
      // Reset saved state when content changes
      setIsSaved(false);

      // Check if the last character is '/'
      const { state } = editor.view;
      const { $from } = state.selection;
      const nodeBefore = $from.nodeBefore;

      if (nodeBefore && nodeBefore.text) {
        const text = nodeBefore.text.slice(-1);
        if (text === '/') {
          setShowSlash(true);
        } else {
          setShowSlash(false);
        }
      } else {
        setShowSlash(false);
      }
    },
  });

  // Get sanitized content for saving
  const getSanitizedContent = useCallback(() => {
    if (!editor) return '';
    const html = editor.getHTML();
    return sanitizeContent(html);
  }, [editor]);

  // Save content (placeholder - connect to your backend)
  const handleSave = useCallback(async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const sanitizedContent = getSanitizedContent();
      // TODO: Save to your backend/database
      console.log('Saving sanitized content:', sanitizedContent);

      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [editor, getSanitizedContent]);

  if (!editor) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-2 relative">
      <BubbleMenu
        editor={editor}
        className="flex gap-1 p-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg"
        tippyOptions={{ duration: 100 }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('bold') ? 'bg-zinc-700' : ''}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('italic') ? 'bg-zinc-700' : ''}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('strike') ? 'bg-zinc-700' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-zinc-700 my-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('bulletList') ? 'bg-zinc-700' : ''}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('orderedList') ? 'bg-zinc-700' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('blockquote') ? 'bg-zinc-700' : ''}`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-md hover:bg-zinc-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-700' : ''}`}
          title="Heading"
        >
          <Heading className="w-4 h-4" />
        </button>
      </BubbleMenu>

      <div className="relative">
        <div className="group relative border-l-2 border-transparent hover:border-zinc-700 pl-4 transition-all">
          <EditorContent
            editor={editor}
            className="min-h-[300px] focus:outline-none"
          />

          {showSlash && (
            <SlashCommand
              editor={editor}
              onClose={() => setShowSlash(false)}
            />
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" /> Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="w-4 h-4" /> Redo
          </button>
          <div className="flex-1"></div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
              isSaved
                ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
            } disabled:opacity-50`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" /> Saved
              </>
            ) : isSaving ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4" /> Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
