

export const RecipeSearch = ({setterFunction}) => {

    return (

       <div className="search" >
           <input className="search" 
           onChange={
               (changeEvent) => {
                   setterFunction(changeEvent.target.value)
               }
           }
            type="text" placeholder="&nbsp;&nbsp;&nbsp;Search for Recipe..." />
       </div>
        
    )
}