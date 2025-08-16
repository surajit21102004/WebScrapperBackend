const supabase = require('../config/database');

class Website {
  async create(websiteData) {
    try {
      const { data, error } = await supabase
        .from('websites')
        .insert([{
          url: websiteData.url,
          brand_name: websiteData.brand_name,
          description: websiteData.description,
          title: websiteData.title,
          enhanced_description: websiteData.enhanced_description
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Website already exists');
      }
      throw error;
    }
  }

  async findAll() {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async findById(id) {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async update(id, updateData) {
    const { data, error } = await supabase
      .from('websites')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
}

module.exports = new Website();