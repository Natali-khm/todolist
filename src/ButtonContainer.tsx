import { Button } from '@mui/material';
import { memo } from 'react';

type ButtonContainerPropsType = {
    title: 'All' | 'Active' | 'Completed'
    changeFilter: () => {}
    variant: "contained" | "outlined"
}

export const ButtonContainer = memo((props: ButtonContainerPropsType) => {

    return  <Button onClick={() => props.changeFilter()}       
                    variant={props.variant}>       
                    {props.title}
            </Button>

}) 