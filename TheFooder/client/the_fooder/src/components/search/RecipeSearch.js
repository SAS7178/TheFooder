
export const RecipeSearch = ({setterFunction}) => {

    return (

       <div className="search" >
          <img className="searchLogo" src={"pngfind.com-magnifying-glass-png-593333.png"}/>

           <input className="searchMe" 
           onChange={
               (changeEvent) => {
                   setterFunction(changeEvent.target.value)
               }
           }
            type="text" placeholder="&nbsp;&nbsp;&nbsp;Search for Recipe..." />
       </div>
        
    )
}