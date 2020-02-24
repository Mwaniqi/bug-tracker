import React  from 'react'
import { Grid } from 'semantic-ui-react'
import Bugs from './Bugs'
import AddBug from './AddBug'
import { BugProvider } from './BugContext'


function Home() {
  return(
    <Grid padded stackable centered>
      <Grid.Row>
        <BugProvider>
          <AddBug />
          <Bugs />
        </BugProvider>
      </Grid.Row>
    </Grid>
  )
}

export default Home