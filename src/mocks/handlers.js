import { rest } from "msw";

const baseURL = "https://sheapi-001672ab3b00.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        "pk": 9,
        "username": "Leyla",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 9,
        "profile_image": "https://res.cloudinary.com/dmqc7ioot/image/upload/v1/media/../user_1144760_1_vut7ya"
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];