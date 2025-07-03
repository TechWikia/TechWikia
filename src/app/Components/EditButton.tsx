'use client'
import edit from "../services/edit";

export function EditButton({ id }: { id: string }) {
return(
  <button onClick={()=>{edit(id)}}>
    editar
  </button>
);
}