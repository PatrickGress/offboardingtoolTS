import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper } from '@mui/material';
import React from 'react';

export function FilterPanel({
  search,
  setSearch,
  department,
  setDepartment,
  location,
  setLocation,
  crit,
  setCrit,
  teamleadSearch,
  setTeamleadSearch,
  departments,
  locations,
  criticality,
  onClear,
  nameResults,
  teamleadResults,
  showNameDropdown,
  setShowNameDropdown,
  showTeamleadDropdown,
  setShowTeamleadDropdown,
  nameDropdownClosedByClick,
  teamleadDropdownClosedByClick
}: any) {
  return (
    <Paper elevation={3} sx={{ width: { xs: '1100px', lg: '1320px' }, display: 'flex', alignItems: 'center', gap: 2, px: 4, py: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', position: 'relative' }}>
      <Box sx={{ position: 'relative', minWidth: 220 }}>
        <TextField
          label="Search by name, email, or ID"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
          onFocus={() => setShowNameDropdown(nameResults.length > 0)}
          onBlur={() => setTimeout(() => setShowNameDropdown(false), 150)}
        />
        {showNameDropdown && nameResults.length > 0 && (
          <Box sx={{ position: 'absolute', top: 40, left: 0, zIndex: 10, bgcolor: '#fff', boxShadow: 3, borderRadius: 1, minWidth: 220, maxHeight: 220, overflowY: 'auto', border: '1px solid #e0e0e0', transition: 'box-shadow 0.2s', p: 0 }}>
            {nameResults.map((n: string, i: number) => (
              <Box key={n + i}>
                <MenuItem
                  onMouseDown={() => { setSearch(n); setShowNameDropdown(false); nameDropdownClosedByClick.current = true; }}
                  sx={{
                    px: 2,
                    py: 1.2,
                    fontSize: '1rem',
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' },
                    borderRadius: 0,
                  }}
                >
                  {n}
                </MenuItem>
                {i < nameResults.length - 1 && <Box sx={{ height: 1, bgcolor: '#eee', mx: 2 }} />}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Department</InputLabel>
        <Select value={department} label="Department" onChange={e => setDepartment(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {departments.map((dep: string) => (
            <MenuItem key={dep} value={dep}>{dep}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ position: 'relative', minWidth: 220 }}>
        <TextField
          label="Search Teamlead"
          variant="outlined"
          size="small"
          value={teamleadSearch}
          onChange={e => setTeamleadSearch(e.target.value)}
          sx={{ minWidth: 220 }}
          onFocus={() => setShowTeamleadDropdown(teamleadResults.length > 0)}
          onBlur={() => setTimeout(() => setShowTeamleadDropdown(false), 150)}
        />
        {showTeamleadDropdown && teamleadResults.length > 0 && (
          <Box sx={{ position: 'absolute', top: 40, left: 0, zIndex: 10, bgcolor: '#fff', boxShadow: 3, borderRadius: 1, minWidth: 220, maxHeight: 220, overflowY: 'auto', border: '1px solid #e0e0e0', transition: 'box-shadow 0.2s', p: 0 }}>
            {teamleadResults.map((tl: string, i: number) => (
              <Box key={tl + i}>
                <MenuItem
                  onMouseDown={() => { setTeamleadSearch(tl); setShowTeamleadDropdown(false); teamleadDropdownClosedByClick.current = true; }}
                  sx={{
                    px: 2,
                    py: 1.2,
                    fontSize: '1rem',
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' },
                    borderRadius: 0,
                  }}
                >
                  {tl}
                </MenuItem>
                {i < teamleadResults.length - 1 && <Box sx={{ height: 1, bgcolor: '#eee', mx: 2 }} />}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Location</InputLabel>
        <Select value={location} label="Location" onChange={e => setLocation(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {locations.map((loc: string) => (
            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Criticality</InputLabel>
        <Select value={crit} label="Criticality" onChange={e => setCrit(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {criticality.map((c: any) => (
            <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{ minWidth: 160, fontWeight: 700, boxShadow: 2, ml: 2, height: 40 }}
        onClick={onClear}
      >
        Clear Filters
      </Button>
    </Paper>
  );
}
