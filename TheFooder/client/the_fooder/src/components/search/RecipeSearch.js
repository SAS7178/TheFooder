
export const RecipeSearch = ({setterFunction}) => {

    return (

       <div className="search" >
          <img alt="" className="searchLogo" src={"pngfind.com-magnifying-glass-png-593333.png"}/>

           <input className="searchMe" 
           onChange={
               (changeEvent) => {
                   setterFunction(changeEvent.target.value.toUpperCase())
               }
           }
            type="text" placeholder="&nbsp;&nbsp;&nbsp;Search for Recipe..." />
       </div>
        
    )
}