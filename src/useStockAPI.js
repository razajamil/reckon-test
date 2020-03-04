import useInterval from '@use-it/interval'
import { useDispatch } from 'react-redux'
import { appendQuotes } from './state/stockPrices'
import axios from 'axios'

const useStockAPI = () => {
  const dispatch = useDispatch()

  const getPrices = () => {
    axios
      .get('https://join.reckon.com/stock-pricing')
      .then(response => {
        if (response && response.status === 200 && response.data) {
          dispatch(appendQuotes({ quotes: response.data }))
        } else console.log('Stock prices api error: ' + response.status)
      })
      .catch(err => console.log('Stock prices api error:' + err))
  }

  // call api on load
  getPrices()

  // call api every 2 seconds
  useInterval(getPrices, 2000)
}

export default useStockAPI
