import { Button } from "@mantine/core";
import { getServerAuthSession } from "~/server/auth";

interface Props {
  visible: any;
  parentId?: number;
}

const CommentSubmit = async (props: Props) => {
  const session = await getServerAuthSession();
  return (
    <Button
      type="submit"
      loading={props.visible}
      loaderProps={{ type: "dots" }}
    >
      {session ? (props.parentId ? "Send reply" : "Send comment") : "Sign in"}
    </Button>
  );
};

export default CommentSubmit;
