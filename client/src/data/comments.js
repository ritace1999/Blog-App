export const getCommentsData = async () => {
  return [
    {
      _id: "10",
      user: {
        _id: "a",
        name: "Monkey D. Luffy",
      },
      desc: "It was a nice post, Thank you!",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-09-31T17:22:05.092+0000",
    },
    {
      _id: "11",
      user: {
        _id: "b",
        name: "Tony Chopper",
      },
      desc: "a reply for Roronoa",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2023-09-31T17:22:05.092+0000",
    },
    {
      _id: "12",
      user: {
        _id: "b",
        name: "Uzimaki Naruto",
      },
      desc: "keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-09-31T17:22:05.092+0000",
    },
    {
      _id: "13",
      user: {
        _id: "c",
        name: "Uchiha Sasuke",
      },
      desc: "I'm always interested in your content :)",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2023-09-31T17:22:05.092+0000",
    },
  ];
};
