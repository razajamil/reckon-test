import { createSlice } from '@reduxjs/toolkit'
import { arrayHasValue, objectHasValue } from '../helpers'

const stockPricesSlice = createSlice({
  name: 'stockPrices',
  initialState: {
    // full record of all the quotes pulled from the server
    quotes: [],
    // last quote used to copy into log
    last_quotes: [],
    // used to trigger effects in UI components by flip flopping
    // don't want to deep compare on objects every api call
    quote_tick: true,
    // calculated summary of quotes, cheaper to calculate here
    // instead of doing some aggregate array operation in component
    // render
    quotes_summary: []
  },
  reducers: {
    appendQuotes(state, action) {
      const { quotes } = action.payload

      if (arrayHasValue(quotes)) {
        quotes.forEach(quote => {
          const stock_summary = state.quotes_summary.find(
            quotes_summary => quotes_summary.code === quote.code
          )
          // insert unique record based on code if code not found
          if (!objectHasValue(stock_summary)) {
            state.quotes_summary.unshift({
              code: quote.code,
              starting_price: quote.price,
              min_price: quote.price,
              max_price: quote.price,
              current_price: quote.price
            })
          } else {
            // update summary values for code
            stock_summary.current_price = quote.price

            if (quote.price < stock_summary.min_price)
              stock_summary.min_price = quote.price

            if (quote.price > stock_summary.min_price)
              stock_summary.max_price = quote.price
          }
        })

        state.quotes.unshift(...quotes)
        state.last_quotes = quotes
        state.quote_tick = !state.quote_tick
      }
    }
  }
})

export const { appendQuotes } = stockPricesSlice.actions

export const selectStockPrices = state => {
  return {
    stock_quotes: state.stockPrices.quotes,
    stock_quotes_last: state.stockPrices.last_quotes,
    stock_quotes_tick: state.stockPrices.quote_tick
  }
}

export const selectStockPricesSummary = state => {
  return {
    stock_quotes_summary: state.stockPrices.quotes_summary
  }
}

export default stockPricesSlice.reducer
