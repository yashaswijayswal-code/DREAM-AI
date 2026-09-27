export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/generate" && request.method === "POST") {
      try {
        const { prompt } = await request.json();

        if (!prompt || !prompt.trim()) {
          return Response.json(
            { error: "Please enter a prompt." },
            { status: 400 }
          );
        }

        const result = await env.AI.run(
          "@cf/black-forest-labs/flux-1-schnell",
          {
            prompt: prompt.trim()
          }
        );

        return Response.json({
          image: `data:image/jpeg;base64,${result.image}`
        });

      } catch (error) {
        return Response.json(
          { error: "Image generation failed." },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
