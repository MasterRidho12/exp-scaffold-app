import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  const error = useRouteError();
  try {
    return boundary.error(error);
  } catch (e) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "#d82c0d" }}>Error</h2>
        <p style={{ color: "#333" }}>{error?.message || error?.statusText || "An unexpected error occurred."}</p>
        <a href="/app" style={{ color: "#008060", textDecoration: "underline", fontWeight: "bold" }}>← Back to QR Codes</a>
      </div>
    );
  }
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};