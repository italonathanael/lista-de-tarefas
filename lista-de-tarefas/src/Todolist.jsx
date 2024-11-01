import React, { useState, useEffect } from "react";
import "./TodoList.css";
import icon from "./assets/icone.webp.webp";

function TodoList(){
    const ListaStorage = localStorage.getItem('Lista');


    const[Lista,setLista] = useState(ListaStorage?JSON.parse(ListaStorage) : []);

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(Lista))
    }, [Lista])

    const [novoItem, setNovoItem] = useState("")

    function adicionarItem(form) {
        form.preventDefault();
        if (!novoItem){
            return;
        }
        setLista([...Lista, {text:novoItem, iscompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou (index){
        const listaAux = [...Lista]
        listaAux[index].iscompleted = !listaAux [index].iscompleted;
        setLista(listaAux);
    }

    function deleta (index){
        const listaAux = [...Lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

return (
        <div>
        <h1>Lista de Tarefas</h1>
        <form onSubmit={adicionarItem}>
            <input id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(e) =>{setNovoItem(e.target.value)}}
                placeholder="adicione uma tarefa"/> 
            <button className="add" type="submit">adicionar</button>
        </form>
        <div className="ListaTarefas">
            <div className="div1">
                {
                    Lista.length< 1
                    ?
                    <img className="icone_central" src={icon}/>
                    : 
                    Lista.map((item,index)=>(

                        <div key={index}

                        className={item.iscompleted? "item completo": "item"}>

                        <span onClick={()=>{clicou(index)}}>{item.text}</span>

                        <button onClick={()=> {deleta(index)}} className="del">deletar</button>
                    </div>

                    ))
                }
                {
                    Lista.length > 0 &&
                    <button onClick={()=> {deletaTudo()}} className="deleteall">deletar todas</button>
                }


        </div>
    </div>
    </div>
)
}
export default TodoList;