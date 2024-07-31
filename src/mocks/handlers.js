import { rest } from "msw";

// Base URL for your API
const baseURL = "https://sheapi-001672ab3b00.herokuapp.com/";

// Mock handlers for your API endpoints
export const handlers = [
  // Mock GET request for user profile
  rest.get(`${baseURL}profiles/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id: 2,
        owner: "dorikikimori",
        created_at: "18 Jul 2024",
        updated_at: "28 Jul 2024",
        name: "",
        content: "My space for sharing inspiring pictures and stories.",
        image:
          "https://res.cloudinary.com/dmqc7ioot/image/upload/v1/media/images/Ada_Byron_aged_seventeen_1832_itfpgd",
        is_owner: false,
        following_id: null,
        posts_count: 3,
        followers_count: 2,
        following_count: 4,
      })
    );
  }),

  // Mock POST request for user logout
  rest.post(`${baseURL}admin/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
