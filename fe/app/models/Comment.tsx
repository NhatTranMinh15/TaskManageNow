export type Comment = {
    id: string;
    content: string;
    replies: Comment[] | null;
    createdAt: Date;
    createdBy: string;
    updatedBy: string | null;
    updatedAt: Date | null;
}

export type CreateCommentModel = {
    content: string;
    parentId?: string;
}

export enum PostUrl {
    BLOG = "/blogs/comments",
    TASK = "/tasks/comments"
}

export const comments: Comment[] = [
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "This is a great post! Thanks for sharing.",
        createdAt: new Date("2024-11-01T10:00:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "I agree with Alice. Very informative.",
                createdAt: new Date("2024-11-01T11:00:00Z"),
                replies: [
                    {
                        id: Math.random().toString(),
                        createdBy: Math.random().toString(),
                        content: "Thanks you",
                        createdAt: new Date("2024-11-02T10:00:00Z"),
                        replies: [],
                        updatedBy: null,
                        updatedAt: null
                    },
                    {
                        id: Math.random().toString(),
                        createdBy: Math.random().toString(),
                        content: "So do I.",
                        createdAt: new Date("2024-11-03T11:00:00Z"),
                        replies: [],
                        updatedBy: null,
                        updatedAt: null
                    }
                ],
                updatedBy: null,
                updatedAt: null
            },
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "I agree with Alice. Very informative.",
                createdAt: new Date("2024-11-01T11:00:00Z"),
                replies: [
                    {
                        id: Math.random().toString(),
                        createdBy: Math.random().toString(),
                        content: "Thanks you",
                        createdAt: new Date("2024-11-02T10:00:00Z"),
                        replies: [],
                        updatedBy: null,
                        updatedAt: null
                    },
                    {
                        id: Math.random().toString(),
                        createdBy: Math.random().toString(),
                        content: "So do I.",
                        createdAt: new Date("2024-11-03T11:00:00Z"),
                        replies: [],
                        updatedBy: null,
                        updatedAt: null
                    }
                ],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I have a question about the topic discussed.",
        createdAt: new Date("2024-11-02T09:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what would you like to know?",
                createdAt: new Date("2024-11-02T10:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I have a question about the audio content.",
        createdAt: new Date("2024-11-02T09:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what would you like to know?",
                createdAt: new Date("2024-11-02T10:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I have a question about the video content.",
        createdAt: new Date("2024-11-03T09:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what would you like to know?",
                createdAt: new Date("2024-11-03T10:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I have a question about the gallery content.",
        createdAt: new Date("2024-11-04T09:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what would you like to know?",
                createdAt: new Date("2024-11-04T10:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },

    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I have a question about the gallery content.",
        createdAt: new Date("2024-11-04T09:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what would you like to know?",
                createdAt: new Date("2024-11-04T10:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "Can you provide more details about the audio content?",
        createdAt: new Date("2024-11-05T08:15:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Sure, what specifically would you like to know?",
                createdAt: new Date("2024-11-05T09:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "I found the video content very interesting!",
        createdAt: new Date("2024-11-06T07:45:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "I'm glad you enjoyed it! Do you have any questions?",
                createdAt: new Date("2024-11-06T08:30:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    },
    {
        id: Math.random().toString(),
        createdBy: Math.random().toString(),
        content: "This standard ",
        createdAt: new Date("2024-11-07T06:30:00Z"),
        replies: [
            {
                id: Math.random().toString(),
                createdBy: Math.random().toString(),
                content: "Thanks, Dwight! Do you have any follow-up questions?",
                createdAt: new Date("2024-11-07T07:00:00Z"),
                replies: [],
                updatedBy: null,
                updatedAt: null
            }
        ],
        updatedBy: null,
        updatedAt: null
    }
];