

export const RecipeSearch = ({setterFunction}) => {

    return (

       <div className="search" >
          <img className="searchLogo" src={" https://iconarchive.com/download/i60242/zerode/plump/Search.ico"}/>

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