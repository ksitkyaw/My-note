import React, { useState } from 'react'
import { FormControl, FormLabel, RadioGroup, TextField, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Container } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from "@material-ui/core";
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

{/*useStyles is first assigned to the makeStyles function which can take an object or a function in occation where 
needs access to theme object as an argument */}
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})
{/*classes is used in combination with useStyles above declared, it's duty is to act as a medium to add className
to the components below so that we can customized them. useHistory is a useful hook to direct to different routes
state are used to store form data and those two boolean states are for error effect of textfield */}
export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
{/*the state for errors are made sure to always be false before the conditions are checked */}
  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false);
    setDetailsError(false);

    if (title == '') {
      setTitleError(true)
    }

    if (details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch(".netlify/functions/notes", {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details,  category, id: title })
      }).then(() => history.push('/'))
    }
  }
{/*the user interface include Typography component for heading two TextField components, one is single line and 
one  is multiline with minrows 4 the value is stored inside states and update onChange.error prop is assigned to 
a boolean state to produce an error effect. then Radio button is created with a bunch of components.then the button
component of type submit */}
  return (
    <Container>
      <Typography
        variant='h6'
        color='textSecondary'
        gutterBottom
      >
        Create a new Note
      </Typography>
{/* noValidate is html property and here react used in camelCase, it's effect is that letting the user type text in number field 
coz no validation is done and there may be other abilities */}
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)} 
          variant='outlined'
          color='secondary'
          autoComplete='off'
          error={titleError}
          label='Note title'
          required
          fullWidth
        />
{/*minRows prop here make sure the the textarea to expand for 4 rows in the first place, maxRows might not be 
multiline at first place */}
        <TextField
        className={classes.field}
        onChange={(e) => setDetails(e.target.value)} 
        variant='outlined'
        color='secondary'
        multiline
        minRows={4}
        autoComplete='off'
        error={detailsError}
        label='Note title'
        required
        fullWidth
        />
 {/*FormControl is used in combine with FormLabel which labels the radio group,RadioGroup of course is to wrap 
 Radio buttons of the same group and one thing to notice is the choosed value of radio buttons is handled inside 
 RadioGroup */}
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='money' label='Money' control={<Radio />} />          
            <FormControlLabel value='todos' label='Todos' control={<Radio />} /> {/*value property is necessary for allowing to check radio button */}
            <FormControlLabel value='reminders' label='Reminders' control={<Radio />} />
            <FormControlLabel value='work' label='Work' control={<Radio />} />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
      </form>

      
    </Container>
  )
}
