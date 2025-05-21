// components/AddSubdomainForm.tsx
"use client";

import { useState } from "react";

export default function AddSubdomainForm() {
  const [deployedUrl, setDeployedUrl] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/add-cname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: "xundan.in", // Replace with your actual domain
          subdomain,
          target: deployedUrl,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error adding CNAME record:", error);
      setStatus("error");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the deployed URL"
        value={deployedUrl}
        onChange={(e) => setDeployedUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subdomain name"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={status === "loading"}>
        {status === "loading" ? "Deploying..." : "Deploy"}
      </button>
      {status === "success" && <p>CNAME record added successfully!</p>}
      {status === "error" && <p>Failed to add CNAME record.</p>}
    </div>
  );
}
