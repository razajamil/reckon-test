import React from 'react'
import { selectStockPricesSummary } from '../state/stockPrices'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Grid } from '@material-ui/core'

import './stockQuotesSummary.scss'
import { arrayHasValue } from '../helpers'

const StockQuotesSummary = () => {
  const { stock_quotes_summary } = useSelector(selectStockPricesSummary)

  return (
    <Box className='stockQuotesSummary' p={2}>
      <div className='header'>
        <Typography variant='h4'>Summary</Typography>
      </div>
      <div className='summaryItemsContainer'>
        <Grid container>
          <Grid item sm={2}>
            <Typography variant='h6'>Stock</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant='h6'>Starting</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant='h6'>Lowest</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant='h6'>Highest</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant='h6'>Current</Typography>
          </Grid>

          {arrayHasValue(stock_quotes_summary) &&
            stock_quotes_summary.map((stock_summary, index) => (
              <React.Fragment key={index}>
                <Grid item sm={2}>
                  <Typography>{stock_summary.code}</Typography>
                </Grid>
                <Grid item sm={3}>
                  <Typography>{stock_summary.starting_price}</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{stock_summary.min_price}</Typography>
                </Grid>
                <Grid item sm={3}>
                  <Typography>{stock_summary.max_price}</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{stock_summary.current_price}</Typography>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      </div>
    </Box>
  )
}

export default StockQuotesSummary
