import React  from 'react'
import { Grid } from 'semantic-ui-react'
import Bugs from './Bugs'
import AddBug from './AddBug'

function Home() {
  return(
    <Grid padded stackable centered>
      <Grid.Row>
        <AddBug />
        <Bugs />
      </Grid.Row>
    </Grid>
)
}

export default Home