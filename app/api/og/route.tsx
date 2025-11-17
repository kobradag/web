import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #00ff00",
            borderRadius: "20px",
            padding: "40px",
            background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,50,0,0.8) 100%)",
          }}
        >
          {/* We can't use Next.js Image component here, so we use a regular img tag */}
          <img
            src="https://www.k0bradag.com/logo.png"
            alt="KODA Cryptocurrency Logo"
            width="400"
            height="400"
            style={{ marginBottom: "20px" }}
          />
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#00ff00",
              margin: "20px 0",
            }}
          >
            KODA
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            Revolutionary Cryptocurrency on BLOCKDAG Network
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}
