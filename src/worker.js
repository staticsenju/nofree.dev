export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle Pre-flight checks (Browser safety stuff)
    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (method === "GET") {
      const intensity = parseInt(url.searchParams.get("intensity")) || 5;
      
      const { results } = await env.DB.prepare(
        "SELECT * FROM messages WHERE intensity <= ? ORDER BY RANDOM() LIMIT 1"
      ).bind(intensity + 2).all();

      if (!results || results.length === 0) {
        return new Response(JSON.stringify({ error: "No messages found" }), { 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      return new Response(JSON.stringify(results[0]), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (method === "POST" && url.pathname === "/submit") {
      try {
        const body = await request.json();
        
        if (!body.content || !body.intensity) {
            return new Response("Missing content or intensity", { status: 400, headers: corsHeaders });
        }
        if (body.intensity < 1 || body.intensity > 10) {
            return new Response("Intensity must be between 1 and 10", { status: 400, headers: corsHeaders });
        }

        await env.DB.prepare(
          "INSERT INTO messages (content, intensity) VALUES (?, ?)"
        ).bind(body.content, body.intensity).run();

        return new Response(JSON.stringify({ success: true, msg: "Added to database!" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      } catch (err) {
        return new Response("Error processing request", { status: 500, headers: corsHeaders });
      }
    }

    if (method === "POST" && url.pathname === "/vote") {
      try {
        const body = await request.json();
        
        if (!body.id) return new Response("Missing ID", { status: 400, headers: corsHeaders });

        await env.DB.prepare(
          "UPDATE messages SET votes = votes + 1 WHERE id = ?"
        ).bind(body.id).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      } catch (err) {
        return new Response("Error voting", { status: 500, headers: corsHeaders });
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};
