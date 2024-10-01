import React from "react";
import NoteContext from "../NotesContext";

const NoteState=(props)=>{

    const state={
        'name':'Asfak',
        'class':'A4'
    }
return(
    <NoteContext.Provider value={state}>
        {props.children};
    </NoteContext.Provider>
)
}

export default NoteState;