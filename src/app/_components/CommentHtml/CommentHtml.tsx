import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import {
  IconBookmark,
  IconBrandFacebook,
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconHeart,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./CommentHtml.module.css";
import { CommentTiptap } from "../CommentTiptap/CommentTiptap";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import { api } from "~/trpc/react";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react";

interface CommentHtmlProps {
  slug: string;
  commentId: number;
  replyCount: number;
  session: Session | null;
}

interface Comment {
  commentPost: {
    id: number;
    parentId: number | null;
    comment: string | null;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  commentLike: {
    id: number;
    commentPostId: number;
  } | null;
}

function getReplyCountText(count: number) {
  if (count === 0) {
    return "No replies";
  }

  if (count === 1) {
    return "1 reply";
  }

  return `${count} replies`;
}

function CommentActions(
  { commentId, slug, replyCount, session }: CommentHtmlProps,
) {
  const [replying, setReplying] = useState(false);
  return (
    <>
      <Group justify="space-between" mb="xs">
        <Button
          size="compact-sm"
          variant="default"
          aria-label="Open in a new tab"
          onClick={() => setReplying(!replying)}
        >
          <Text fz="sm" c="dimmed">
            {replying ? "Cancel" : "Write a reply"}
          </Text>
        </Button>

        <Text mr="xl" fz="sm" c="dimmed">{getReplyCountText(replyCount)}</Text>
      </Group>
      {replying && (
        <CommentTiptap
          slug={slug}
          parentId={commentId}
          setReplying={setReplying}
          session={session}
        />
      )}
    </>
  );
}

// Organize Nested Comments

const organizeComments = (comments: Comment[]) => {
  const commentMap = new Map<number, Comment[]>();

  comments.forEach((comment) => {
    const parentId = comment.commentPost.parentId ?? 0;
    if (!commentMap.has(parentId)) {
      commentMap.set(parentId, []);
    }
    commentMap.get(parentId)?.push(comment);
  });

  return commentMap;
};

export function CommentHtml(
  { slug, session }: CommentHtmlProps,
) {
  const { data: comment } = api.commentPost.getCommentsBySlug.useQuery({
    slug,
  });

  const utils = api.useUtils();
  const deleteComment = api.commentPost.deleteComment.useMutation({
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

  // Slug Like Toggle

  const [likedSlugs, setLikedSlugs] = useLocalStorage<
    Record<string, boolean>
  >({
    key: "liked-slugs",
    defaultValue: {},
  });

  const [likeSlugCounts, setLikeSlugCounts] = useLocalStorage<
    Record<string, number | null>
  >({ key: "like-counts", defaultValue: {} });

  const likeSlug = api.slugLike.likeSlug.useMutation();

  const deleteLikeSlug = api.slugLike.deleteLikeSlug.useMutation();

  const handleLikeSlugToggle = async (slug: string) => {
    const currentLikeSlugStatus = likedSlugs?.[slug] ?? false;
    const newLikeSlugStatus = !currentLikeSlugStatus;

    // Toggle the like status and update the like count
    const currentLikeSlugCount = likeSlugCounts[slug] ?? 0;
    const newLikeSlugCount = currentLikeSlugCount +
      (newLikeSlugStatus ? 1 : -1);

    // Check if newLikeCount is zero and set it to null if it is
    const updatedLikeSlugCounts = { ...likeSlugCounts };
    if (newLikeSlugCount === 0) {
      updatedLikeSlugCounts[slug] = null;
    } else {
      updatedLikeSlugCounts[slug] = newLikeSlugCount;
    }

    // Update the like count in the state
    setLikeSlugCounts(updatedLikeSlugCounts);

    try {
      // Optimistically Update the like status in the local state
      setLikedSlugs((prevLikedSlugs) => ({
        ...prevLikedSlugs,
        [slug]: !currentLikeSlugStatus, // Toggle the like status locally
      }));

      if (currentLikeSlugStatus) {
        await deleteLikeSlug.mutateAsync({ slugId: slug });
      } else {
        // Send the toggle request to the API
        await likeSlug.mutateAsync({
          slugId: slug,
          like: !currentLikeSlugStatus, // Toggle the like status
        });
      }
    } catch (error) {
      // Handle any errors here
      notifications.show({
        title: "Error submitting",
        color: "red",
        message: "An error occurred while submitting. Please try again later.",
        withBorder: true,
      });

      // Revert the local state to the previous state
      setLikedSlugs((prevLikedSlugs) => ({
        ...prevLikedSlugs,
        [slug]: currentLikeSlugStatus,
      }));
    }
  };

  // Slug Bookmark Toggle

  const [bookmarkedSlugs, setBookmarkedSlugs] = useLocalStorage<
    Record<string, boolean>
  >({
    key: "bookmarked-slugs",
    defaultValue: {},
  });

  const [bookmarkSlugCounts, setBookmarkSlugCounts] = useLocalStorage<
    Record<string, number | null>
  >({ key: "bookmarked-counts", defaultValue: {} });

  const bookmarkSlug = api.slugBookmark.bookmarkSlug.useMutation();

  const deleteBookmarkSlug = api.slugBookmark.deleteBookmarkSlug.useMutation();

  const handleBookmarkSlugToggle = async (slug: string) => {
    const currentBookmarkSlugStatus = bookmarkedSlugs?.[slug] ?? false;
    const newBookmarkSlugStatus = !currentBookmarkSlugStatus;

    // Toggle the like status and update the like count
    const currentBookmarkSlugCount = bookmarkSlugCounts[slug] ?? 0;
    const newBookmarkSlugCount = currentBookmarkSlugCount +
      (newBookmarkSlugStatus ? 1 : -1);

    // Check if newLikeCount is zero and set it to null if it is
    const updatedBookmarkSlugCounts = { ...bookmarkSlugCounts };
    if (newBookmarkSlugCount === 0) {
      updatedBookmarkSlugCounts[slug] = null;
    } else {
      updatedBookmarkSlugCounts[slug] = newBookmarkSlugCount;
    }

    // Update the like count in the state
    setBookmarkSlugCounts(updatedBookmarkSlugCounts);

    try {
      // Optimistically Update the like status in the local state
      setBookmarkedSlugs((prevBookmarkedSlugs) => ({
        ...prevBookmarkedSlugs,
        [slug]: !currentBookmarkSlugStatus, // Toggle the like status locally
      }));

      if (currentBookmarkSlugStatus) {
        await deleteBookmarkSlug.mutateAsync({ slugId: slug });
      } else {
        // Send the toggle request to the API
        await bookmarkSlug.mutateAsync({
          slugId: slug,
          bookmark: !currentBookmarkSlugStatus, // Toggle the like status
        });
      }
    } catch (error) {
      // Handle any errors here
      notifications.show({
        title: "Error submitting",
        color: "red",
        message: "An error occurred while submitting. Please try again later.",
        withBorder: true,
      });

      // Revert the local state to the previous state
      setBookmarkedSlugs((prevBookmarkedSlugs) => ({
        ...prevBookmarkedSlugs,
        [slug]: currentBookmarkSlugStatus,
      }));
    }
  };

  // Slug Share Toggle

  const [share, setShare] = useState(false);

  const openShare = (slug: string) => {
    const baseUrl = "http://localhost:3000/blog/"; // Set your base URL
    setShare(!share);
    modals.open({
      title: "Please choose a platform for sharing",
      centered: true,
      children: (
        <Group justify="center">
          <EmailShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandGmail color="var(--mantine-color-teal-filled)" />
            </ActionIcon>
          </EmailShareButton>

          <PinterestShareButton url={baseUrl + slug} media={""}>
            <ActionIcon variant="outline">
              <IconBrandPinterest color="var(--mantine-color-red-filled)" />
            </ActionIcon>
          </PinterestShareButton>
          <TelegramShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandTelegram color="var(--mantine-color-blue-filled)" />
            </ActionIcon>
          </TelegramShareButton>

          <TwitterShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandTwitter color="var(--mantine-color-cyan-filled)" />
            </ActionIcon>
          </TwitterShareButton>
          <LinkedinShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandLinkedin color="var(--mantine-color-blue-filled)" />
            </ActionIcon>
          </LinkedinShareButton>
          <WhatsappShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandWhatsapp color="var(--mantine-color-green-filled)" />
            </ActionIcon>
          </WhatsappShareButton>
          <FacebookShareButton url={baseUrl + slug}>
            <ActionIcon variant="outline">
              <IconBrandFacebook color="var(--mantine-color-blue-filled)" />
            </ActionIcon>
          </FacebookShareButton>
        </Group>
      ),
      onClose: () => {
        setShare(false); // Set 'share' to false when the modal is closed
      },
    });
  };

  // Comment Delete Toggle

  const [deleting, setDeleting] = useState<Record<string, boolean>>({});

  const handleCommentDelete =
    (commentId: number) => (event: { preventDefault: () => void }) => {
      event.preventDefault();
      modals.openConfirmModal({
        title: "Please confirm your action",
        centered: true,
        children: (
          <Text size="sm">
            Are you sure you want to delete your comment?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onCancel: () => console.log("Cancel"),
        onConfirm: async () => {
          event.preventDefault();

          try {
            setDeleting((prevVisibility) => ({
              ...prevVisibility,
              [commentId]: true,
            }));

            await deleteComment.mutateAsync({
              id: commentId,
            });
            notifications.show({
              title: "Successfully deleted",
              color: "green",
              message: "You can write a new comment",
              withBorder: true,
            });

            console.log("Confirmed");
          } catch (error) {
            // Handle errors
            console.error("Error submitting:", error);
            notifications.show({
              title: "Error submitting",
              color: "red",
              message:
                "An error occurred while submitting. Please try again later.",
              withBorder: true,
            });
          } finally {
            // Perform cleanup
            setDeleting((prevVisibility) => ({
              ...prevVisibility,
              [commentId]: false,
            }));
          }
        },
      });
    };

  // Comment Like Toggle

  const [likedComments, setLikedComments] = useLocalStorage<
    Record<string, boolean>
  >({
    key: "liked-comments",
    defaultValue: {},
  });

  const [likeCounts, setLikeCounts] = useLocalStorage<
    Record<string, number | null>
  >({ key: "like-counts", defaultValue: {} });

  const likeComment = api.commentLike.likeComment.useMutation();

  const deleteLike = api.commentLike.deleteLike.useMutation();

  const countLikes = api.commentPost.countLikes.useMutation();

  const handleLikeToggle = async (commentId: number) => {
    const currentLikeStatus = likedComments?.[commentId] ?? false;
    const newLikeStatus = !currentLikeStatus;

    // Toggle the like status and update the like count
    const currentLikeCount = likeCounts[commentId] ?? 0;
    const newLikeCount = currentLikeCount + (newLikeStatus ? 1 : -1);

    // Check if newLikeCount is zero and set it to null if it is
    const updatedLikeCounts = { ...likeCounts };
    if (newLikeCount === 0) {
      updatedLikeCounts[commentId] = null;
    } else {
      updatedLikeCounts[commentId] = newLikeCount;
    }

    // Update the like count in the state
    setLikeCounts(updatedLikeCounts);

    try {
      // Optimistically Update the like status in the local state
      setLikedComments((prevLikedComments) => ({
        ...prevLikedComments,
        [commentId]: newLikeStatus, // Toggle the like status locally
      }));

      if (currentLikeStatus) {
        await deleteLike.mutateAsync({ commentPostId: commentId });
      } else {
        // Send the toggle request to the API
        await likeComment.mutateAsync({
          commentPostId: commentId,
          like: newLikeStatus, // Toggle the like status
        });
      }
      // Update the like count in the database
      await countLikes.mutateAsync({
        id: commentId,
        likeCount: newLikeCount,
      });
    } catch (error) {
      // Handle any errors here
      // Revert the local state to the previous state
      setLikedComments((prevLikedComments) => ({
        ...prevLikedComments,
        [commentId]: currentLikeStatus,
      }));
      // Revert the likeCounts to the previous state, setting it to null if newLikeCount is zero
      setLikeCounts((prevLikeCounts) => {
        return {
          ...prevLikeCounts,
          [commentId]: currentLikeCount === 0 ? null : currentLikeCount,
        };
      });

      notifications.show({
        title: "Error submitting",
        color: "red",
        message: "An error occurred while submitting. Please try again later.",
        withBorder: true,
      });

      if (!session) {
        await signIn();
      }
    }
  };

  // Render Nested Comments

  const organizedComments = organizeComments(comment ?? []);

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => {
      const replies = organizedComments.get(comment.commentPost.id) ?? [];

      return (
        <div key={comment.commentPost.id}>
          <Paper
            shadow="xs"
            withBorder
            radius="md"
            mb="md"
            className={classes.comment}
            key={comment.commentPost.parentId}
          >
            <Group>
              <Avatar
                src={comment.user?.image}
                alt={comment.user?.name ?? "Avatar"}
                radius="xl"
              />

              <div>
                <Text fz="sm">{comment.user?.name}</Text>
                <Text fz="xs" c="dimmed">
                  {comment.commentPost.createdAt.toLocaleString()}
                </Text>
              </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: comment?.commentPost.comment ?? "",
                }}
              />
            </TypographyStylesProvider>
            <Group justify="space-between">
              <Group gap={0}>
                <ActionIcon
                  variant="transparent"
                  c={likedComments?.[comment.commentPost.id]
                    ? "var(--mantine-color-red-filled)"
                    : "var(--mantine-color-red-outline)"}
                  onClick={() => handleLikeToggle(comment.commentPost.id)}
                  className={likedComments?.[comment.commentPost.id]
                    ? classes.like
                    : ""}
                  key={`like-${comment.commentPost.id}`}
                >
                  <IconHeart />
                </ActionIcon>
                <Text fz="xs" c="dimmed">
                  {/** I want to place number of likes for a particular commentId **/}
                  {likeCounts[comment.commentPost.id]}
                </Text>
              </Group>

              {session && session.user.id === comment.user.id
                ? (deleting[comment.commentPost.id]
                  ? (
                    <ActionIcon
                      mr="xl"
                      variant="transparent"
                      loading
                      loaderProps={{ type: "dots" }}
                    />
                  )
                  : (
                    <ActionIcon
                      mr="xl"
                      variant="transparent"
                      aria-label="Open in a new tab"
                      onClick={handleCommentDelete(comment.commentPost.id)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  ))
                : null}
            </Group>

            <Divider my="sm" mr="xl" />
            <CommentActions
              slug={slug}
              commentId={comment.commentPost.id}
              replyCount={replies.length}
              session={session}
            />
            {renderComments(replies)}
          </Paper>
        </div>
      );
    });
  };

  return (
    <>
      <Card mb="md">
        <Card.Section>
          <Group p="md" justify="center">
            <Group gap={0}>
              <ActionIcon
                variant="transparent"
                c={likedSlugs?.[slug]
                  ? "var(--mantine-color-red-filled)"
                  : "var(--mantine-color-red-outline)"}
                onClick={() => handleLikeSlugToggle(slug)}
                className={likedSlugs?.[slug] ? classes.like : ""}
                key={`like-${slug}`}
              >
                <IconHeart />
              </ActionIcon>
              <Text fz="xs" c="dimmed">
                {/** I want to place number of likes for a particular commentId **/}
                {likeSlugCounts[slug]}
              </Text>
            </Group>
            <Group gap={0}>
              <ActionIcon
                variant="transparent"
                c={bookmarkedSlugs?.[slug]
                  ? "var(--mantine-color-teal-filled)"
                  : "var(--mantine-color-teal-outline)"}
                onClick={() => handleBookmarkSlugToggle(slug)}
                className={bookmarkedSlugs?.[slug] ? classes.bookmark : ""}
                key={`like-${slug}`}
              >
                <IconBookmark />
              </ActionIcon>
              <Text fz="xs" c="dimmed">
                {/** I want to place number of likes for a particular commentId **/}
                {bookmarkSlugCounts[slug]}
              </Text>
            </Group>

            <ActionIcon
              variant="transparent"
              c={share
                ? "var(--mantine-color-orange-filled)"
                : "var(--mantine-color-orange-outline)"}
              onClick={() => openShare(slug)}
              className={share ? classes.share : ""}
            >
              <IconShare />
            </ActionIcon>
          </Group>
        </Card.Section>
        <Card.Section>
          {renderComments(organizedComments.get(0) ?? [])}
        </Card.Section>
      </Card>
      {/** eslint-disable-next-line @typescript-eslint/no-empty-function**/}
      <CommentTiptap
        slug={slug}
        parentId={undefined}
        setReplying={() => {}}
        session={session}
      />
    </>
  );
}
