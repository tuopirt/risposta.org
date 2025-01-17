import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { APIState } from "lib/state.ts";
import { bad, success } from "lib/response.ts";


export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // Get user information
    const user = ctx.state.user;

    // new username thats passed through
    const { newUsername } = await req.json();

    
    // Update the username with the new name
    const { error: updateError } = await supabase.from("users")
      .update({ name: newUsername })
      .eq("id", user.id);
      

    // Handle member insertion errors
    if (updateError) return bad("Failed to update username.");

    // Return success response
    return success("Username updated successfully.");
  }
};
