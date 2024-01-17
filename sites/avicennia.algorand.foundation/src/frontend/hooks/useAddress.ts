import { useMediaQuery, useTheme } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useAddressQuery(address?: string){
  if(typeof address === 'undefined'){
    return
  }

  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  return useQuery({ queryKey: [address], queryFn: ()=>{
    return fetch(`https://api.nf.domains/nfd/lookup?address=${address}&view=tiny&allowUnverified=true`).then(async (r)=>{
      if(r.ok){
        const data=  await r.json()
        return data[address].name
      }else{
        if(r.status === 404){
          return greaterThanMid ? address : `${address.slice(0, 5)}...${address.slice(-5)}`
        }
        throw new Error('Failed to fetch address')
      }
    })
  }})
}
