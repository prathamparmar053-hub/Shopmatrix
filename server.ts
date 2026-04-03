import express from "express";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let twilioClient: twilio.Twilio | null = null;

  function getTwilio() {
    if (!twilioClient) {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      if (sid && token) {
        if (!sid.startsWith('AC')) {
          console.warn("Invalid TWILIO_ACCOUNT_SID: must start with 'AC'. Please update your Secrets.");
          return null;
        }
        twilioClient = twilio(sid, token);
      }
    }
    return twilioClient;
  }

  // API routes
  app.post("/api/notify", async (req, res) => {
    try {
      const { message } = req.body;
      const client = getTwilio();
      
      if (!client) {
        console.warn("Twilio not configured. Skipping SMS:", message);
        return res.json({ success: false, reason: "Twilio not configured" });
      }

      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      if (!fromNumber) {
        console.warn("TWILIO_PHONE_NUMBER not set. Skipping SMS.");
        return res.json({ success: false, reason: "TWILIO_PHONE_NUMBER not set" });
      }

      await client.messages.create({
        body: message,
        from: fromNumber,
        to: "+917990921284",
      });

      res.json({ success: true });
    } catch (error) {
      console.error("SMS Error:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
