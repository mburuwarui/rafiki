import { RichTextEditor } from "@mantine/tiptap";
import { Button, Group } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import type { Editor } from "@tiptap/react";
import type { Validate } from "node_modules/@mantine/form/lib/types";
import { api } from "~/trpc/react";
import type { Session } from "next-auth";

interface CommentProps {
  parentId?: number;
  slug: string;
  setReplying: Dispatch<SetStateAction<boolean>>;
  editor: Editor | null;
  validate: Validate;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
}

export function HandleSubmit(
  {
    parentId,
    slug,
    setReplying,
    editor,
    validate,
    setVisible,
    visible,
    session,
  }: CommentProps,
) {
  const utils = api.useUtils();

  const postComment = api.commentPost.postComment.useMutation({
    // optimistic updates
    onMutate: async (newEntry) => {
      await utils.commentPost.getCommentsBySlug.cancel();
      // @ts-expect-error: Should expect undefined
      utils.commentPost.getCommentsBySlug.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.commentPost.getCommentsBySlug.invalidate();
    },
  });

  const handleButtonClick = async () => {
    if (!session) {
      // User is not signed in, so sign them in
      await signIn();
    } else {
      // User is signed in, handle sending the comment
      await sendComment();
    }
  };

  const sendComment = async () => {
    // Check if the editor content is empty
    if (editor?.isEmpty) {
      notifications.show({
        title: "Empty content",
        color: "red",
        message: "Please write a comment before submitting.",
        withBorder: true,
      });
      return;
    }

    if (!validate()) {
      return;
    }

    try {
      setVisible(true);
      const htmlContent = editor?.getHTML();
      console.log("JSON Content:", htmlContent);

      await postComment.mutateAsync({
        comment: htmlContent ?? "",
        slug: slug,
        parentId: parentId,
      });

      notifications.show({
        title: "Success submitting",
        color: "green",
        message: "Thank you for your feedback 📢",
        withBorder: true,
      });

      // Reset the editor's content
      editor?.commands.setContent({ content: [] });
    } catch (error) {
      // Handle errors
      console.error("Error submitting:", error);
      notifications.show({
        title: "Error submitting",
        color: "red",
        message: "An error occurred while submitting. Please try again later.",
        withBorder: true,
      });
    } finally {
      // Perform cleanup
      setReplying(false);
      setVisible(false);
    }
  };

  return (
    <form
      className="comment-form"
      style={{ marginBottom: "var(--mantine-spacing-md)" }}
      onSubmit={async (event) => {
        event.preventDefault();
        await handleButtonClick();
      }}
    >
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <Group justify="right" mt="md">
        <Button
          type="submit"
          loading={visible}
          loaderProps={{ type: "dots" }}
        >
          {session ? (parentId ? "Send reply" : "Send comment") : "Sign in"}
        </Button>
      </Group>
    </form>
  );
}
