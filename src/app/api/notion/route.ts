import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(req: NextRequest) {
  try {
    const { day, dayType, topic, notes } = await req.json();

    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
      return NextResponse.json({ 
        success: false, 
        error: "Notion not configured. Add NOTION_API_KEY and NOTION_DATABASE_ID to environment variables." 
      });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          "Post Title": {
            title: [
              {
                text: {
                  content: topic || `${day} Post`,
                },
              },
            ],
          },
          "Day": {
            select: {
              name: day,
            },
          },
          "Type": {
            select: {
              name: dayType,
            },
          },
          "Topic": {
            rich_text: [
              {
                text: {
                  content: topic || "",
                },
              },
            ],
          },
          "Notes": {
            rich_text: [
              {
                text: {
                  content: notes || "",
                },
              },
            ],
          },
          "Status": {
            select: {
              name: "Planned",
            },
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Notion API error:", JSON.stringify(data));
      return NextResponse.json({ success: false, error: data.message || "Failed to create page" });
    }

    return NextResponse.json({ success: true, pageId: data.id, url: data.url });
  } catch (err) {
    console.error("Notion route error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
