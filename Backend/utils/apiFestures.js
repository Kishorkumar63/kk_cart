class apiFeatures
{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr
    }


    search()
    {
        let keyword=this.queryStr.keyword ?
        {
name:{
    $regex:this.queryStr.keyword,
    $options:"i"
}
        }:{}
        this.query.find({...keyword})
        return this
    }
    filter()
    {
        const queryStrCopy={...this.queryStr}
 // before 
 //console.log(queryStrCopy);

 // remove Field From Query
        const removeFields=["keyword","limit","page"];
        removeFields.forEach(filed=> delete queryStrCopy[filed]  )
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `${match}`);
        this.query.find(JSON.parse(queryStr));
        // after
       // console.log(queryStrCopy);
        return this;

    }
    paginate(resPerPage)
  {
const currentpage= Number(this.queryStr.page) || 1
const skip=resPerPage*(currentpage-1)// 2 * 3-1
this.query.limit(resPerPage).skip(skip)
return this 
  }
}
module.exports=apiFeatures;
// export default apiFeatures