const supabase = require("../config/supabase");

module.exports.getTeamMembers = async () => {
  try {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching team members:", error.message);
    return [];
  }
};
