import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './reset.scss'
import './App.scss'
import useStockAPI from './useStockAPI'
import StockQuotesLog from './stockQuotesLog/stockQuotesLog'
import StockQuotesSummary from './stockQuotesSummary/stockQuotesSummary'
import { Container, Typography } from '@material-ui/core'

const App = () => {
  useStockAPI()

  return (
    <div className='App'>
      <Container maxWidth='xl'>
        <Typography variant='h3' gutterBottom></Typography>
        <StockQuotesLog />
        <StockQuotesSummary />
      </Container>
    </div>
  )
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
