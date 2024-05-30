import axios from "axios";

const MERCURE_HUB_URL = process.env.MERCURE_HUB_URL;

export const publishNotification = async (topic: string, data: any) => {
  try {
    await axios.post(
      MERCURE_HUB_URL as string,
      {
        data: data,
        topic: topic,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${process.env.MERCURE_JWT_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to publish notification:", error);
  }
};
