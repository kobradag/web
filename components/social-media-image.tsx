import Image from "next/image"

export function SocialMediaImage() {
  return (
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
        <Image
          src="/logo.png"
          alt="KODA Cryptocurrency Logo"
          width={400}
          height={400}
          style={{ marginBottom: "20px" }}
        />
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #00ff00 0%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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
    </div>
  )
}
