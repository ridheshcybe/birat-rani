const supabase = require("../config/supabase");

module.exports.getTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from("testimonial")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error.message);
    return [];
  }
};
