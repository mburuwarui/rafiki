import { Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { useForm } from "@mantine/form";
import { type Dispatch, type SetStateAction, useState } from "react";
import { HandleSubmit } from "./HandleSubmit";
import type { Session } from "next-auth";

const initialValues = {
  comment: "",
  slug: "",
};

interface CommentProps {
  slug: string;
  parentId?: number;
  setReplying: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
}

export function CommentTiptap(
  { slug, parentId, setReplying, session }: CommentProps,
) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your comment" }),
    ],
  });

  const { validate } = useForm({
    initialValues,
    validate: {
      comment: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });
  const [visible, setVisible] = useState(false);

  return (
    <HandleSubmit
      parentId={parentId}
      slug={slug}
      setReplying={setReplying}
      editor={editor}
      setVisible={setVisible}
      visible={visible}
      validate={validate}
      session={session}
    />
  );
}
