import React from 'react'
import { getAllProperties} from '../utils/api'
import {useQuery} from 'react-query'
const useProperties = () => {
    const {data,isError,isLoading,refetch}  = useQuery(
        "allProperties",getAllProperties,{refetchOnWindowFocus:false}
    )
  return {
    data,isError,isLoading,refetch
  }
}

export default useProperties