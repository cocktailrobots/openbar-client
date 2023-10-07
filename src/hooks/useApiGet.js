import {useState, useEffect} from 'react';
import {getFromApi} from '../utils/api.js';

export default function useApiGet(host, path, params, initialVal, cb) {
  const [data, setData] = useState(initialVal);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getFromApi(host, path, params)
      const data = await response.json()
      console.log(data)
      setData(data)
      setIsDone(true)

      if (cb) {
        cb(data)
      }
    }

    getData().catch(err => {
      console.error(err)
      setError(err)
      setIsDone(true)
    })
  }, [host, path, params])

  return [data, error, isDone, setData]
}