import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Ruti nije definisan CORS, znaci po default-u je sve zabranjeno
app.get("/no-cors", (c) => {
  return c.html(
    "Kors nije postavljen i nije definisan. Ovo ne bi trebalo da radi"
  );
});

// Ruti je definisan CORS samo za tačan origin https://www.zapadbanka.me
app.get("/with-cors", cors({ origin: "https://www.zapadbanka.me" }), (c) => {
  return c.html(
    "Kors je postavljen samo za https://www.zapadbanka.me. Ostali origin-i neće biti dozvoljeni."
  );
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
