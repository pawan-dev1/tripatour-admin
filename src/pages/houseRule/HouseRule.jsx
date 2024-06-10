import React from 'react'
import { useGetHouseRuleQuery } from '../../store/services/houseRule'
import { useParams } from 'react-router-dom'
import { BreadCrum } from '../../components/breadCrume'
import { Button, Input } from 'antd'

const HouseRule = () => {
    const {id} = useParams()
    const {data} = useGetHouseRuleQuery(id)
    console.log(data)
  return (
    <div>
         <BreadCrum name={"House Rule"} sub={""} />
      <div className="search-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBlock:"10px"}}>
        <Input placeholder="Search here..." style={{width:"50%"}}/>
          <Button >Add House Rule</Button>
      </div>
    </div>
  )
}

export default HouseRule