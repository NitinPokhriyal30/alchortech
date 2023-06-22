import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import { formInputTypeMap } from '../../pages/SurveryCreatePage'

export default function SurveySidebar({ setShowSidebar, dispatch }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const formInputs = Object.keys(formInputTypeMap)
  return (
    <Paper elevation={1} sx={{ backgroundColor: 'white', height: '100%' }}>
      <List>
        <ListItem sx={{ borderBottom: '1px solid', borderColor: 'gray' }}>
          {!isDesktop && (
            <IconButton onClick={() => setShowSidebar((p) => !p)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">Form Controls Toolbar</Typography>
        </ListItem>

        {formInputs.map((formInputName) => (
          <ListItem sx={{ padding: 1 }} key={formInputName}>
            <ListItemButton
              sx={{ padding: 1 }}
              type="button"
              onClick={() => dispatch({ action: 'addInputControl', formInputName })}
            >
              {formInputName}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
