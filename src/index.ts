import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Route without CORS
app.get("/no-cors", (c) => {
  return c.html("1234");
});

// Route with CORS enabled for all origins
app.get("/with-cors", cors({ origin: "*" }), (c) => {
  return c.html("1234");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
