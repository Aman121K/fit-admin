import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Stack, IconButton, Paper, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Cardio', 'Core'];
const muscles = ['Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Glutes', 'Abs', 'Calves', 'Forearms', 'Lats', 'Pecs', 'Deltoids'];
const equipment = ['Dumbbell', 'Barbell', 'Machine', 'Bodyweight', 'Kettlebell', 'Cable', 'Resistance Band'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const suitableFor = ['Men', 'Women', 'Seniors', 'Beginners'];
const dietPlans = ['Plan A', 'Plan B', 'Plan C']; // Placeholder

function getYouTubeThumbnail(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
}

const AddExercise = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    targetMuscles: [],
    equipment: [],
    difficulty: '',
    description: '',
    youtubeUrl: '',
    image: null,
    steps: [''],
    tips: '',
    mistakes: '',
    duration: '',
    sets: '',
    reps: '',
    rest: '',
    calories: '',
    suitableFor: [],
    dietPlans: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (idx, value) => {
    const steps = [...form.steps];
    steps[idx] = value;
    setForm((prev) => ({ ...prev, steps }));
  };

  const addStep = () => setForm((prev) => ({ ...prev, steps: [...prev.steps, ''] }));
  const removeStep = (idx) => setForm((prev) => ({ ...prev, steps: prev.steps.filter((_, i) => i !== idx) }));

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    const newErrors = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.category) newErrors.category = 'Required';
    if (!form.youtubeUrl) newErrors.youtubeUrl = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    // Log form data
    console.log(form);
    alert('Exercise submitted! (see console)');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Add Exercise</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Exercise Name" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required fullWidth />
          <FormControl fullWidth required error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange} label="Category">
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Target Muscles</InputLabel>
            <Select multiple name="targetMuscles" value={form.targetMuscles} onChange={e => handleMultiChange('targetMuscles', e.target.value)} input={<OutlinedInput label="Target Muscles" />} renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map(val => <Chip key={val} label={val} />)}</Box>}>
              {muscles.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Equipment Needed</InputLabel>
            <Select multiple name="equipment" value={form.equipment} onChange={e => handleMultiChange('equipment', e.target.value)} input={<OutlinedInput label="Equipment Needed" />} renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map(val => <Chip key={val} label={val} />)}</Box>}>
              {equipment.map((eq) => <MenuItem key={eq} value={eq}>{eq}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Difficulty Level</InputLabel>
            <Select name="difficulty" value={form.difficulty} onChange={handleChange} label="Difficulty Level">
              {difficulties.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline minRows={3} fullWidth />
          <TextField label="YouTube Video URL" name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} error={!!errors.youtubeUrl} helperText={errors.youtubeUrl} required fullWidth />
          {form.youtubeUrl && getYouTubeThumbnail(form.youtubeUrl) && (
            <Box>
              <Typography variant="caption">YouTube Thumbnail Preview:</Typography>
              <img src={getYouTubeThumbnail(form.youtubeUrl)} alt="YouTube Thumbnail" style={{ width: 240, marginTop: 8, borderRadius: 8 }} />
            </Box>
          )}
          <Box>
            <Typography variant="subtitle1">Image Upload</Typography>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {form.image && <Typography variant="caption">Selected: {form.image.name}</Typography>}
          </Box>
          <Divider />
          <Typography variant="subtitle1">Step-by-Step Instructions</Typography>
          {form.steps.map((step, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1} mb={1}>
              <TextField label={`Step ${idx + 1}`} value={step} onChange={e => handleStepChange(idx, e.target.value)} fullWidth />
              <IconButton onClick={() => removeStep(idx)} disabled={form.steps.length === 1}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addStep} sx={{ width: 'fit-content' }}>Add Step</Button>
          <TextField label="Tips/Precautions" name="tips" value={form.tips} onChange={handleChange} multiline minRows={2} fullWidth />
          <TextField label="Common Mistakes" name="mistakes" value={form.mistakes} onChange={handleChange} multiline minRows={2} fullWidth />
          <Divider />
          <Stack direction="row" spacing={2}>
            <TextField label="Duration (sec)" name="duration" value={form.duration} onChange={handleChange} type="number" fullWidth />
            <TextField label="Sets" name="sets" value={form.sets} onChange={handleChange} type="number" fullWidth />
            <TextField label="Reps" name="reps" value={form.reps} onChange={handleChange} type="number" fullWidth />
            <TextField label="Rest Time (sec)" name="rest" value={form.rest} onChange={handleChange} type="number" fullWidth />
          </Stack>
          <TextField label="Calories Burned" name="calories" value={form.calories} onChange={handleChange} type="number" fullWidth />
          <FormControl fullWidth>
            <InputLabel>Suitable For</InputLabel>
            <Select multiple name="suitableFor" value={form.suitableFor} onChange={e => handleMultiChange('suitableFor', e.target.value)} input={<OutlinedInput label="Suitable For" />} renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map(val => <Chip key={val} label={val} />)}</Box>}>
              {suitableFor.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Link Diet Plan</InputLabel>
            <Select multiple name="dietPlans" value={form.dietPlans} onChange={e => handleMultiChange('dietPlans', e.target.value)} input={<OutlinedInput label="Link Diet Plan" />} renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map(val => <Chip key={val} label={val} />)}</Box>}>
              {dietPlans.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" size="large">Submit Exercise</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddExercise; 