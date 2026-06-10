"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  RemoveFormatting,
  Link as LinkIcon,
  Plus,
  ChevronDown,
  Undo2,
  Trash2,
  Table as TableIcon,
} from "lucide-react";

type RichTextEditorFieldProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
};

const fontGroups = [
  {
    group: "System",
    fonts: [
      { label: "Default", value: "" },
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Courier New", value: "Courier New, monospace" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
    ],
  },
  {
    group: "Sans Serif",
    fonts: [
      { label: "Roboto", value: "Roboto, sans-serif" },
      { label: "Open Sans", value: "Open Sans, sans-serif" },
      { label: "Lato", value: "Lato, sans-serif" },
      { label: "Poppins", value: "Poppins, sans-serif" },
      { label: "Raleway", value: "Raleway, sans-serif" },
      { label: "Oswald", value: "Oswald, sans-serif" },
      { label: "Nunito", value: "Nunito, sans-serif" },
      { label: "Montserrat", value: "Montserrat, sans-serif" },
    ],
  },
  {
    group: "Serif",
    fonts: [
      { label: "Playfair Display", value: "Playfair Display, serif" },
      { label: "Merriweather", value: "Merriweather, serif" },
      { label: "Lora", value: "Lora, serif" },
    ],
  },
  {
    group: "Mono",
    fonts: [
      { label: "Source Code Pro", value: "Source Code Pro, monospace" },
      { label: "Fira Code", value: "Fira Code, monospace" },
    ],
  },
  {
    group: "Decorative",
    fonts: [
      { label: "Dancing Script", value: "Dancing Script, cursive" },
      { label: "Pacifico", value: "Pacifico, cursive" },
      { label: "Satisfy", value: "Satisfy, cursive" },
    ],
  },
];

function ToolbarButton({ onClick, active, title, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      title={title}
      variant="ghost"
      size="icon"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`h-7 w-7 ${active ? "bg-muted text-foreground" : "text-muted-foreground"}`}
    >
      {children}
    </Button>
  );
}

function ToolbarSeparator() {
  return <div className="mx-1 h-5 w-px bg-border" />;
}

export default function TipTapTextEditor({
  value = "",
  onChange,
  placeholder = "Write description...",
}: RichTextEditorFieldProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-40 px-3 py-2 focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    if (value && value !== currentHTML) {
      editor.commands.setContent(value, {
        parseOptions: { preserveWhitespace: false },
      });
    }
    if (!value && currentHTML !== "<p></p>") {
      editor.commands.clearContent();
    }
  }, [value, editor]);

  if (!editor) return null;

  const isInTable = editor.isActive("table");

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const getActiveFontLabel = () => {
    for (const group of fontGroups) {
      for (const font of group.fonts) {
        if (font.value && editor.isActive("textStyle", { fontFamily: font.value })) {
          return font.label;
        }
      }
    }
    return "Font";
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&family=Open+Sans&family=Lato&family=Poppins&family=Playfair+Display&family=Merriweather&family=Lora&family=Source+Code+Pro&family=Fira+Code&family=Raleway&family=Nunito&family=Montserrat&family=Oswald&family=Dancing+Script&family=Pacifico&family=Satisfy&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .tiptap-editor table {
          border-collapse: collapse;
          width: 100%;
          font-size: 14px;
          display: block;
          overflow-x: auto;
        }
        .tiptap-editor tbody {
          display: table;
          width: 100%;
        }
        .tiptap-editor tr {
          display: table-row;
        }
        .tiptap-editor td,
        .tiptap-editor th {
          border: 1px solid #000;
          padding: 8px;
          min-width: 100px;
          vertical-align: top;
          position: relative;
        }
        .tiptap-editor th {
          font-weight: bold;
          text-align: center;
        }
        .tiptap-editor .selectedCell:after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(59, 130, 246, 0.15);
          pointer-events: none;
        }
        .tiptap-editor .ProseMirror:focus {
          outline: none;
        }
        .tiptap-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .tiptap-editor a {
          color: #2563eb;
          text-decoration: underline;
        }
        .tiptap-editor p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="tiptap-editor rounded-md border bg-background">
        <div className="flex flex-wrap items-center gap-0.5 border-b px-2 py-1">

          {/* Font Family Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs font-medium text-muted-foreground"
              >
                {getActiveFontLabel()}
                <ChevronDown size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-80 overflow-y-auto" align="start">
              {fontGroups.map((group, groupIndex) => (
                <div key={group.group}>
                  {groupIndex !== 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {group.group}
                  </DropdownMenuLabel>
                  {group.fonts.map((font) => (
                    <DropdownMenuItem
                      key={font.label}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (font.value === "") {
                          editor.chain().focus().unsetFontFamily().run();
                        } else {
                          editor.chain().focus().setFontFamily(font.value).run();
                        }
                      }}
                      style={{ fontFamily: font.value || "inherit" }}
                      className={
                        font.value !== "" &&
                        editor.isActive("textStyle", { fontFamily: font.value })
                          ? "bg-accent text-accent-foreground font-semibold"
                          : ""
                      }
                    >
                      {font.label}
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ToolbarSeparator />

          {/* Text formatting */}
          <ToolbarButton
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={15} />
          </ToolbarButton>

          <ToolbarButton
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={15} />
          </ToolbarButton>

          <ToolbarButton
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <UnderlineIcon size={15} />
          </ToolbarButton>

          <ToolbarButton
            title="Link"
            onClick={setLink}
            active={editor.isActive("link")}
          >
            <LinkIcon size={15} />
          </ToolbarButton>

          <ToolbarSeparator />

          {/* Lists */}
          <ToolbarButton
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={15} />
          </ToolbarButton>

          <ToolbarButton
            title="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={15} />
          </ToolbarButton>

          <ToolbarSeparator />

          {/* Clear formatting */}
          <ToolbarButton
            title="Clear Formatting"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          >
            <RemoveFormatting size={15} />
          </ToolbarButton>

          <ToolbarSeparator />

          {/* Table Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs font-medium text-muted-foreground"
              >
                Table
                <ChevronDown size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">

              {/* Always available */}
              <DropdownMenuItem
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
                }}
              >
                <TableIcon size={13} />
                Insert table
              </DropdownMenuItem>

              <DropdownMenuItem
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().undo().run();
                }}
              >
                <Undo2 size={13} />
                Undo
              </DropdownMenuItem>

              {/* Only when inside a table */}
              {isInTable && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addRowBefore().run();
                    }}
                  >
                    <Plus size={13} />
                    Add row above
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addRowAfter().run();
                    }}
                  >
                    <Plus size={13} />
                    Add row below
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addColumnBefore().run();
                    }}
                  >
                    <Plus size={13} />
                    Add column left
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addColumnAfter().run();
                    }}
                  >
                    <Plus size={13} />
                    Add column right
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteRow().run();
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 size={13} />
                    Delete row
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteColumn().run();
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 size={13} />
                    Delete column
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteTable().run();
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 size={13} />
                    Delete table
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        <EditorContent editor={editor} />
      </div>
    </>
  );
}