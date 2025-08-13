import { neon } from "@neondatabase/serverless";

const db = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  
  try {
    const { name, email, clerkId } = await request.json();
    console.log("2"); 

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    debugger;
    console.log("3"); 
    const response = await db`
    Insert into users (name, email, clerk_id) values (${name}, ${email}, ${clerkId}); `;

    return new Response(JSON.stringify({ data: response }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
