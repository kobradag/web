import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "KODA Network"
    const description = searchParams.get("description") || "Revolutionary cryptocurrency built on BLOCKDAG technology"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage: "linear-gradient(to bottom right, #000000, #1a1a1a)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "30px",
              color: "#888",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("OG Image generation error:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
