const path = require("path");
const express = require("express");

const app = express();
app.disable("x-powered-by");

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = Number(process.env.PORT) || 3000;

// Load translations
const locales = {
  pt: require("./locales/pt.json"),
  fr: require("./locales/fr.json"),
  en: require("./locales/en.json")
};

// Static files
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/flags", express.static(path.join(__dirname, "public", "flags")));
app.use("/css", express.static(path.join(__dirname, "public", "css")));

// Serve PDFs and other files from root
app.use(express.static(__dirname, {
  dotfiles: "deny",
  index: false,
  extensions: ["pdf"]
}));

// ==========================================
// ROUTES - Portuguese (default)
// ==========================================
app.get("/", (req, res) => {
  res.render("index", {
    t: locales.pt,
    locale: "pt",
    currentPath: "/"
  });
});

app.get("/contato", (req, res) => {
  res.render("contato", {
    t: locales.pt,
    locale: "pt",
    currentPath: "/contato"
  });
});

// Legacy redirect
app.get("/contato.html", (req, res) => {
  res.redirect(301, "/contato");
});

// ==========================================
// ROUTES - French
// ==========================================
app.get("/fr", (req, res) => {
  res.render("index", {
    t: locales.fr,
    locale: "fr",
    currentPath: "/fr"
  });
});

app.get("/fr/contact", (req, res) => {
  res.render("contato", {
    t: locales.fr,
    locale: "fr",
    currentPath: "/fr/contact"
  });
});

// ==========================================
// ROUTES - English
// ==========================================
app.get("/en", (req, res) => {
  res.render("index", {
    t: locales.en,
    locale: "en",
    currentPath: "/en"
  });
});

app.get("/en/contact", (req, res) => {
  res.render("contato", {
    t: locales.en,
    locale: "en",
    currentPath: "/en/contact"
  });
});

// ==========================================
// 404 Handler
// ==========================================
app.use((req, res) => {
  res.status(404).type("text/plain").send("404 - Not Found");
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Vertech site running on http://0.0.0.0:${port}`);
  console.log(`Languages available: PT (default), FR (/fr), EN (/en)`);
});
