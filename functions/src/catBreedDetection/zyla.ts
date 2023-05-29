import { admin } from "../config/firebase";
import { Request, Response } from "express";
import { zylaApiKey, zylaEndPoint } from "./config";

/**
 * Calls the Zyla API with the specified image URL and returns the response data.
 * @async
 * @function
 * @param {string} image - The URL of the image to analyze.
 * @returns {Promise<Object>} - The response data from the Zyla API.
 */
const callZylaApi = async (image: string) => {
  try {
    // Call the Zyla API with the given image URL
    const response = await fetch(`${zylaEndPoint}?url=${image}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zylaApiKey}`,
      },
    });

    // Check if the response is OK, throw an error if not
    if (!response.ok) {
      throw new Error(`Failed to call Zyla API with status ${response.status}`);
    }

    // Parse the response data as JSON and return it
    const data = await response.json();
    console.log("Zyla API response: ");
    return data;
  } catch (error) {
    console.error(`Error calling Zyla API: ${error}`);
    return {};
  }
};

const getBreedInfo = async (req: Request, res: Response) => {
  console.log("handling breed identification");
  const { base64Image } = req.body;
  console.log(`image: ${base64Image}`);
  // Set path and convert base 64 image
  const destinationPath = `cats/${Date.now}.jpg`;
  const bucket = admin.storage().bucket();
  const base64Data = base64Image.replace(
    /^data:image\/(png|jpeg|jpg);base64,/,
    ""
  );
  const buffer = Buffer.from(base64Data, "base64");
  const file = bucket.file(destinationPath);

  // Upload the file to Cloud Storage
  await file.save(buffer, {
    metadata: {},
    contentType: "image/jpeg",
  });

  // Get the signed URL for the file
  const [longUrl] = await file.getSignedUrl({
    action: "read",
    expires: "03-17-2025",
  });

  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
    longUrl
  )}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    const shortUrl = data.trim();
    console.log(`Short URL: ${shortUrl}`);

    // handle the breed identification
    const result = await callZylaApi(shortUrl); // wait for callZylaApi() to finish
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error,
      message: "unable to convert long url to short url",
    });
  }
};

export { getBreedInfo };
