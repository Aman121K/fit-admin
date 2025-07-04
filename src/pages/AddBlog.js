import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Chip, Stack, Paper, Divider
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';

const categories = ['Motivation', 'Nutrition', 'Workout Tips', 'Success Stories', 'Mental Health', 'Challenges'];
const visibilities = ['Public', 'Private', 'Scheduled'];
const trendingTags = ['motivation', 'zenz', 'fitveda', 'workout', 'nutrition', 'challenge', 'success'];

const AddBlog = () => {
  const [form, setForm] = useState({
    title: '',
    cover: null,
    content: '',
    tags: [],
    tagInput: '',
    category: '',
    author: 'Gym Specialist', // Placeholder
    publishDate: new Date().toISOString().slice(0, 10),
    visibility: 'Public',
    metaTitle: '',
    metaDesc: '',
  });
  const [coverPreview, setCoverPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, cover: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCoverPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setCoverPreview('');
    }
  };

  const handleTagInput = (e) => {
    setForm((prev) => ({ ...prev, tagInput: e.target.value }));
  };

  const addTag = () => {
    const tag = form.tagInput.trim().replace(/^#/, '');
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], tagInput: '' }));
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const addTrendingTag = (tag) => {
    if (!form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.title || !form.content) {
      alert('Title and content are required!');
      return;
    }
    // Log form data
    console.log(form);
    alert('Blog submitted! (see console)');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Add Blog</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Blog Title" name="title" value={form.title} onChange={handleChange} required fullWidth />
          <Box>
            <Typography variant="subtitle1">Cover Image</Typography>
            <input type="file" accept="image/*" onChange={handleCoverChange} />
            {coverPreview && <img src={coverPreview} alt="cover preview" style={{ width: 200, marginTop: 8, borderRadius: 8 }} />}
          </Box>
          <TextField
            label="Content"
            name="content"
            value={form.content}
            onChange={handleChange}
            multiline
            minRows={6}
            required
            fullWidth
            placeholder="Write your blog post here..."
          />
          <Box>
            <Typography variant="subtitle1">Tags / Hashtags</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                label="#hashtag"
                value={form.tagInput}
                onChange={handleTagInput}
                onKeyDown={e => (e.key === 'Enter' ? (e.preventDefault(), addTag()) : null)}
                size="small"
                sx={{ maxWidth: 180 }}
              />
              <Button startIcon={<TagIcon />} onClick={addTag} variant="outlined" size="small">Add</Button>
              <Stack direction="row" spacing={1}>
                {form.tags.map(tag => (
                  <Chip key={tag} label={`#${tag}`} onDelete={() => removeTag(tag)} color="primary" />
                ))}
              </Stack>
            </Stack>
            <Box mt={1}>
              <Typography variant="caption">Trending: </Typography>
              {trendingTags.map(tag => (
                <Chip key={tag} label={`#${tag}`} onClick={() => addTrendingTag(tag)} sx={{ m: 0.5, cursor: 'pointer' }} variant="outlined" />
              ))}
            </Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange} label="Category">
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <TextField label="Author" name="author" value={form.author} disabled fullWidth />
            <TextField label="Publish Date" name="publishDate" type="date" value={form.publishDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select name="visibility" value={form.visibility} onChange={handleChange} label="Visibility">
                {visibilities.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
          <Divider />
          <Typography variant="subtitle1">SEO Meta (optional)</Typography>
          <TextField label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} fullWidth />
          <TextField label="Meta Description" name="metaDesc" value={form.metaDesc} onChange={handleChange} fullWidth />
          <Button type="submit" variant="contained" size="large">Submit Blog</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddBlog; 