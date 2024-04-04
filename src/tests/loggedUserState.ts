import { RootState } from "../store";

export const loggedUserState:RootState = {
  user: {
    loggedUser: {
      id: "4",
      firstName: "Diana",
      lastName: "I",
      username: "diana",
      created: "2024-04-02T18:35:24.000Z",
      accessToken: "token-valid-for-4",
    },
    currentUser: {
      id: "4",
      firstName: "Diana",
      lastName: "I",
      username: "diana",
      created: "2024-04-02T18:35:24.000Z",
    },
  },
  post: {
    posts: [
      {
        id: "58",
        title: "1",
        content: "1",
        created: "2024-04-03T14:53:56.000Z",
        modified: "2024-04-03T14:53:56.000Z",
        userId: 4,
        author: {
          id: "4",
          firstName: "Diana",
          lastName: "I",
          username: "diana",
          created: "2024-04-02T18:35:24.000Z",
        },
      },
      {
        id: "59",
        title: "2",
        content: "2",
        created: "2024-04-03T14:53:58.000Z",
        modified: "2024-04-03T14:53:58.000Z",
        userId: 4,
        author: {
          id: "4",
          firstName: "Diana",
          lastName: "I",
          username: "diana",
          created: "2024-04-02T18:35:24.000Z",
        },
      },
      {
        id: "60",
        title: "3",
        content: "3",
        created: "2024-04-03T14:54:00.000Z",
        modified: "2024-04-03T14:54:00.000Z",
        userId: 4,
        author: {
          id: "4",
          firstName: "Diana",
          lastName: "I",
          username: "diana",
          created: "2024-04-02T18:35:24.000Z",
        },
      },
    ],
    totalPostsCount: 6,
    comments: {
     
    },
    totalCommentsCount: {
      
    },
  },
};

