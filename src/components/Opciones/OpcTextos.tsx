import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ITexto } from '../../Interfaces/ITextos';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { getItems, updateItem } from '../../Services/sTextos';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OpcTextos() 
{
  const [data,setData] = React.useState<ITexto[]>([])

  //get db data textos
  getItems(setData);
 
  const handleClick = (item:ITexto) =>{
    updateItem(item)
  }
  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {id, value} = event.target
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, texto: value } : item
      )
    );
  }

  return (
    <React.Fragment>
         <Grid container spacing={2} sx={{mt:2}}>
            {
              data.map((item)=>(
                <Grid item xs={12} sm={6} key={item.id}>
                  <Item sx={{p:2}}>
                    <TextField
                      sx={{width:'95%', mb:1}}
                      id={item.id}
                      label={item.titulo}
                      name={item.titulo}
                      multiline
                      value={item.texto}
                      rows={5}
                      onChange={(e)=>handleChange(e)}
                      variant="outlined"
                    />
                    <Button variant="outlined" onClick={()=>handleClick(item)}>Guardar</Button>
                  </Item>
                </Grid>
              ))
            }
          </Grid>
    </React.Fragment>
  )
}
