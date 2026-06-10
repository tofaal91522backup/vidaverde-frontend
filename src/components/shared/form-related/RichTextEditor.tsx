import TipTapTextEditor from "./TipTapTextEditor";

type RichTextEditorFieldProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function RichTextEditorField({
  value = "",
  onChange,
  placeholder = "Write description...",
}: RichTextEditorFieldProps) {
  return (
    <div className="rounded-md border bg-background">
      <TipTapTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

// "use client";

// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// type RichTextEditorFieldProps = {
//   value?: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// };

// export default function RichTextEditorField({
//   value = "",
//   onChange,
//   placeholder = "Write description...",
// }: RichTextEditorFieldProps) {
//   return (
//     <div className="rounded-md border bg-background">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="[&_.ql-container]:min-h-40 [&_.ql-container]:border-0 [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b"
//       />
//     </div>
//   );
// }
