import { Editor } from '@tiptap/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code2 } from 'lucide-react';

interface SlashCommandProps {
  editor: Editor;
  onClose: () => void;
}

const SlashCommand = ({ editor, onClose }: SlashCommandProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedIndexRef = useRef(selectedIndex);

  // Keep ref in sync with state
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  const commands = [
    { title: 'Heading 1', description: 'Big section heading', icon: Heading1, action: () => { editor.chain().focus().toggleHeading({ level: 1 }).run(); onClose(); } },
    { title: 'Heading 2', description: 'Medium section heading', icon: Heading2, action: () => { editor.chain().focus().toggleHeading({ level: 2 }).run(); onClose(); } },
    { title: 'Heading 3', description: 'Small section heading', icon: Heading3, action: () => { editor.chain().focus().toggleHeading({ level: 3 }).run(); onClose(); } },
    { title: 'Bold', description: 'Ctrl+B', icon: Bold, action: () => { editor.chain().focus().toggleBold().run(); onClose(); } },
    { title: 'Italic', description: 'Ctrl+I', icon: Italic, action: () => { editor.chain().focus().toggleItalic().run(); onClose(); } },
    { title: 'Strike', description: 'Strike through text', icon: Strikethrough, action: () => { editor.chain().focus().toggleStrike().run(); onClose(); } },
    { title: 'Bullet List', description: 'Create a simple list', icon: List, action: () => { editor.chain().focus().toggleBulletList().run(); onClose(); } },
    { title: 'Numbered List', description: 'Create a list with numbering', icon: ListOrdered, action: () => { editor.chain().focus().toggleOrderedList().run(); onClose(); } },
    { title: 'Blockquote', description: 'Capture a quote', icon: Quote, action: () => { editor.chain().focus().toggleBlockquote().run(); onClose(); } },
    { title: 'Code', description: 'Capture a code snippet', icon: Code2, action: () => { editor.chain().focus().toggleCodeBlock().run(); onClose(); } },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : commands.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < commands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commands[selectedIndexRef.current].action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [onClose, editor]);

  // Only add/remove listener once
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div 
      ref={containerRef}
      className="absolute z-50 w-64 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="py-2">
        {commands.map((command, index) => (
          <button
            key={index}
            className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-zinc-700 ${
              index === selectedIndex ? 'bg-zinc-700' : ''
            }`}
            onClick={command.action}
          >
            <command.icon className="w-4 h-4 text-zinc-400" />
            <div className="text-left">
              <div className="text-sm font-medium text-zinc-100">{command.title}</div>
              <div className="text-xs text-zinc-400">{command.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlashCommand;