import React, { useState, useEffect } from 'react'
import { selectStockPrices } from '../state/stockPrices'
import { useSelector } from 'react-redux'
import './stockQuotesLog.scss'

import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { arrayHasValue, objectHasValue, formattedDateTime } from '../helpers'

const LogItem = ({ logItem }) => {
  if (!objectHasValue(logItem)) return null

  if (objectHasValue(logItem))
    return (
      <div className='logItem' color='text.primary' p={2}>
        <Typography component='div'>
          Updates for {logItem.time}
          {arrayHasValue(logItem.quotes) &&
            logItem.quotes.map((quote, index) => (
              // key=index bad practice but it's only a problem
              // when removing or reordering items
              <div key={index}>
                {quote.code}: ${quote.price}
              </div>
            ))}
        </Typography>
      </div>
    )
}

const StockQuotesLog = () => {
  const { stock_quotes_last, stock_quotes_tick } = useSelector(
    selectStockPrices
  )
  const [log, setLog] = useState([])
  const [logging, setLogging] = useState(true)

  const handleToggleLoggingClick = () => {
    setLogging(logging => !logging)
  }

  useEffect(() => {
    if (logging === true && arrayHasValue(stock_quotes_last)) {
      setLog([
        {
          time: formattedDateTime(),
          quotes: [...stock_quotes_last]
        },
        ...log
      ])
    }
  }, [stock_quotes_tick])

  return (
    <Box className='stockQuotesLog' p={2}>
      <div className='header'>
        <Typography variant='h4' fontWeight='Bold'>
          Log
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleToggleLoggingClick}
        >
          {logging ? 'Pause' : 'Resume'}
        </Button>
      </div>
      <div className='logItemsContainer'>
        {arrayHasValue(log) &&
          log.map((logItem, index) => (
            <LogItem key={index} logItem={logItem} />
          ))}
      </div>
    </Box>
  )
}

export default StockQuotesLog
