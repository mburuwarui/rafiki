import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `rafiki_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const newsLetter = mysqlTable(
  "newsLetter",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    email: varchar("email", { length: 256 }),
  },
  (newsLetter) => ({
    emailIndex: index("email_idx").on(newsLetter.email),
  }),
);

export const bookDemo = mysqlTable(
  "bookDemo",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    number: varchar("number", { length: 256 }),
  },
  (bookDemo) => ({
    emailIndex: index("email_idx").on(bookDemo.email),
    number: index("number_idx").on(bookDemo.number),
  }),
);

export const contactBook = mysqlTable(
  "contactBook",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    number: varchar("number", { length: 256 }),
    residence: varchar("number", { length: 256 }),
    property: varchar("number", { length: 256 }),
    units: varchar("number", { length: 256 }),
    volume: varchar("number", { length: 256 }),
    message: varchar("number", { length: 256 }),
  },
  (contactBook) => ({
    emailIndex: index("email_idx").on(contactBook.email),
    number: index("number_idx").on(contactBook.number),
  }),
);

export const commentPost = mysqlTable(
  "commentPost",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    comment: varchar("comment", { length: 256 }),
    slug: varchar("slug", { length: 256 }),
    userId: varchar("userId", { length: 255 }).notNull(),
    parentId: bigint("parentId", { mode: "number" }),
    likeCount: bigint("likeCount", { mode: "number" }),
  },
  (commentPost) => ({
    userIdIdx: index("userId_idx").on(commentPost.userId),
    parentIdIdx: index("parentId_idx").on(commentPost.parentId),
  }),
);

export const commentPostRelations = relations(commentPost, ({ one, many }) => ({
  user: one(users, { fields: [commentPost.userId], references: [users.id] }),
  parent: one(commentPost, {
    fields: [commentPost.parentId],
    references: [commentPost.id],
    relationName: "comment_children",
  }),
  children: many(commentPost, {
    relationName: "comment_children",
  }),
  likes: many(commentLike),
}));

export const commentLike = mysqlTable(
  "commentLike",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    commentPostId: bigint("commentPostId", { mode: "number" }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    like: boolean("like").default(false),
  },
  (commentLike) => ({
    commentPostIdIdx: index("commentPostId_idx").on(
      commentLike.commentPostId,
    ),
    userIdIdx: index("userId_idx").on(commentLike.userId),
  }),
);

export const commentLikeRelations = relations(
  commentLike,
  ({ one }) => ({
    commentPost: one(commentPost, {
      fields: [commentLike.commentPostId],
      references: [commentPost.id],
    }),
    user: one(users, {
      fields: [commentLike.userId],
      references: [users.id],
    }),
  }),
);

export const slugLike = mysqlTable(
  "slugLike",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    slugId: varchar("slug", { length: 256 }),
    userId: varchar("userId", { length: 255 }).notNull(),
    like: boolean("like").default(false),
  },
  (slugLike) => ({
    slugPostIdIdx: index("slugPostId_idx").on(
      slugLike.slugId,
    ),
    userIdIdx: index("userId_idx").on(commentLike.userId),
  }),
);

export const slugLikeRelations = relations(
  slugLike,
  ({ one }) => ({
    commentPost: one(commentPost, {
      fields: [slugLike.slugId],
      references: [commentPost.slug],
    }),
    user: one(users, {
      fields: [slugLike.userId],
      references: [users.id],
    }),
  }),
);

export const slugBookmark = mysqlTable(
  "slugBookmark",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    slugId: varchar("slug", { length: 256 }),
    userId: varchar("userId", { length: 255 }).notNull(),
    bookmark: boolean("like").default(false),
  },
  (slugBookmark) => ({
    BookmarkPostIdIdx: index("BookmarkPostId_idx").on(
      slugBookmark.slugId,
    ),
    userIdIdx: index("userId_idx").on(commentLike.userId),
  }),
);

export const slugBookmarkRelations = relations(
  slugBookmark,
  ({ one }) => ({
    commentPost: one(commentPost, {
      fields: [slugBookmark.slugId],
      references: [commentPost.slug],
    }),
    user: one(users, {
      fields: [slugBookmark.userId],
      references: [users.id],
    }),
  }),
);
