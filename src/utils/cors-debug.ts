/**
 * Utility functions to help debug CORS issues
 */

/**
 * Tests a CORS preflight request to the API
 * Call this function in your development environment to check CORS configuration
 */
export const testCorsConfiguration = async (url: string): Promise<void> => {
  try {
    console.log(`Testing CORS configuration for: ${url}`);

    // First try a preflight OPTIONS request using fetch
    const response = await fetch(url, {
      method: "OPTIONS",
      headers: {
        Origin: window.location.origin,
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "Content-Type,Authorization",
      },
    });

    console.log("CORS Preflight Status:", response.status);

    if (response.ok) {
      console.log("CORS preflight successful. Checking actual request...");

      // Try actual GET request
      const apiResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("API Response Status:", apiResponse.status);
      console.log("CORS setup is working correctly");
    } else {
      console.error("CORS preflight failed. Check server configuration.");
    }
  } catch (error) {
    console.error("CORS Test Error:", error);
    console.log("Suggestions:");
    console.log("1. Check if the backend has CORS enabled for", window.location.origin);
    console.log("2. Ensure credentials mode is configured correctly on both ends");
    console.log("3. Verify the server is responding to OPTIONS requests");
  }
};
