import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Stack, IconButton, Paper, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const exercises = ['Push Up', 'Squat', 'Deadlift']; // Placeholder
const goals = ['Weight Loss', 'Muscle Gain', 'Maintenance'];

const AddDietPlan = () => {
  const [form, setForm] = useState({
    name: '',
    exercises: [],
    goal: '',
    duration: '',
    description: '',
    meals: [
      { name: '', time: '', items: '', calories: '', carbs: '', protein: '', fat: '', image: null },
    ],
    tips: '',
    water: '',
    supplements: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMealChange = (idx, field, value) => {
    const meals = [...form.meals];
    meals[idx][field] = value;
    setForm((prev) => ({ ...prev, meals }));
  };

  const addMeal = () => setForm((prev) => ({ ...prev, meals: [...prev.meals, { name: '', time: '', items: '', calories: '', carbs: '', protein: '', fat: '', image: null }] }));
  const removeMeal = (idx) => setForm((prev) => ({ ...prev, meals: prev.meals.filter((_, i) => i !== idx) }));

  const handleMealImageChange = (idx, file) => {
    const meals = [...form.meals];
    meals[idx].image = file;
    setForm((prev) => ({ ...prev, meals }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    const newErrors = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.goal) newErrors.goal = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    // Log form data
    console.log(form);
    alert('Diet Plan submitted! (see console)');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Add Diet Plan</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Diet Plan Name" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required fullWidth />
          <FormControl fullWidth>
            <InputLabel>Associated Exercises</InputLabel>
            <Select multiple name="exercises" value={form.exercises} onChange={e => handleMultiChange('exercises', e.target.value)} input={<OutlinedInput label="Associated Exercises" />} renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map(val => <Chip key={val} label={val} />)}</Box>}>
              {exercises.map((ex) => <MenuItem key={ex} value={ex}>{ex}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth required error={!!errors.goal}>
            <InputLabel>Goal</InputLabel>
            <Select name="goal" value={form.goal} onChange={handleChange} label="Goal">
              {goals.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Duration (days/weeks)" name="duration" value={form.duration} onChange={handleChange} type="number" fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline minRows={3} fullWidth />
          <Divider />
          <Typography variant="subtitle1">Meals</Typography>
          {form.meals.map((meal, idx) => (
            <Paper key={idx} sx={{ p: 2, mb: 2, background: '#f5f7fa' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField label="Meal Name" value={meal.name} onChange={e => handleMealChange(idx, 'name', e.target.value)} fullWidth />
                <TextField label="Time" value={meal.time} onChange={e => handleMealChange(idx, 'time', e.target.value)} type="time" fullWidth />
                <TextField label="Calories" value={meal.calories} onChange={e => handleMealChange(idx, 'calories', e.target.value)} type="number" fullWidth />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} alignItems="center">
                <TextField label="Food Items" value={meal.items} onChange={e => handleMealChange(idx, 'items', e.target.value)} fullWidth />
                <TextField label="Carbs (g)" value={meal.carbs} onChange={e => handleMealChange(idx, 'carbs', e.target.value)} type="number" fullWidth />
                <TextField label="Protein (g)" value={meal.protein} onChange={e => handleMealChange(idx, 'protein', e.target.value)} type="number" fullWidth />
                <TextField label="Fat (g)" value={meal.fat} onChange={e => handleMealChange(idx, 'fat', e.target.value)} type="number" fullWidth />
              </Stack>
              <Box mt={2}>
                <Typography variant="caption">Meal Image (optional):</Typography>
                <input type="file" accept="image/*" onChange={e => handleMealImageChange(idx, e.target.files[0])} />
                {meal.image && <Typography variant="caption">Selected: {meal.image.name}</Typography>}
              </Box>
              <Box mt={1} textAlign="right">
                <IconButton onClick={() => removeMeal(idx)} disabled={form.meals.length === 1}><DeleteIcon /></IconButton>
              </Box>
            </Paper>
          ))}
          <Button startIcon={<AddIcon />} onClick={addMeal} sx={{ width: 'fit-content' }}>Add Meal</Button>
          <Divider />
          <TextField label="Tips/Precautions" name="tips" value={form.tips} onChange={handleChange} multiline minRows={2} fullWidth />
          <TextField label="Water Intake (liters)" name="water" value={form.water} onChange={handleChange} type="number" fullWidth />
          <TextField label="Supplements" name="supplements" value={form.supplements} onChange={handleChange} multiline minRows={2} fullWidth />
          <TextField label="Notes" name="notes" value={form.notes} onChange={handleChange} multiline minRows={2} fullWidth />
          <Button type="submit" variant="contained" size="large">Submit Diet Plan</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddDietPlan; 