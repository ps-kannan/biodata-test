import React,{useEffect} from 'react';
import  {Button}  from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const BioForm = ({bioData,setBioData,formStatus,singleData,setFormStatus}) =>{
    const {register, handleSubmit,  formState: { errors }, reset, setFocus, setValue} = useForm();
    //let dataArr;
    const defaultForm = {
      "firstName":"",
      "lestName":"",
      "email":"",
      "phoneNum1":"",
      "phoneNum2":"",
      "phoneNum3":"",
      "line1":"",
      "line2":"",
      "city":"",
      "state":"",
      "zip":"",
      "country":"",
      "qualification":"",
      "comment":""
    };
    //console.log('singleData',singleData);
   
    useEffect(()=>{
      setFocus("firstName");
      if(singleData!==null && singleData!==undefined){
        let dataIdArr = singleData.split("_");
        let dataId = parseInt(dataIdArr[1]);
        //console.log('dataId: ',dataId,singleData);
        let editData= bioData.filter((data)=> data.id===dataId);
        //console.log("useEffect Here",editData);
        reset(...editData);
      }
    },[singleData]);
    //console.log("Form biodata:",bioData,typeof bioData);
    const onSubmit = (data,e) => {
        e.preventDefault();
        let dataArr = [...bioData];
        //console.log('dataArr1',dataArr);
        //console.log("data",data,typeof bioData,typeof dataArr);
        if(formStatus==="new"){
          let modifyData = {...data,phoneNum:data.phoneNum1+""+data.phoneNum2+""+data.phoneNum3,id:bioData.length};
          //console.log('modifyData',modifyData);
          dataArr.push(modifyData);
          setBioData(dataArr);
        }else if(formStatus==="edit"){
          let dataIdArr = singleData.split("_");
        let dataId = parseInt(dataIdArr[1]);
          let updateDate = dataArr.map((mapData)=>{
            //console.log("Edit mapData: ",mapData);
            if(mapData.id===dataId){
              return data;
            }else{
              return mapData;
            }
          })
          //console.log('updateDate:',updateDate);
          setBioData(updateDate);
        }
        if(formStatus!=="new"){
          setFormStatus("new")
        }
        //console.log('dataArr2',dataArr);
        reset({...defaultForm});
        //console.log('biodata',bioData);
    };
    const NumVal = (e) => {
      
      let nextTag = "phoneNum2";
      let eleId = e.target.id;
      let pattern = new RegExp(/[\D]/gm);
      let curEleValue = e.target.value.replace(pattern, '');
      setValue(eleId, curEleValue, { shouldValidate: true });
      let curEleLength = curEleValue.length;
      let eleMaxLength = 3;
      if(eleId === "phoneNum2"){
        nextTag = "phoneNum3";
      }else if(eleId === "phoneNum3"){
        nextTag = "line1";
        eleMaxLength = 4;
      }else if(eleId === "zip"){
        nextTag = "country";
        eleMaxLength = 6;
      }
      if(eleMaxLength<=curEleLength){
        if(eleMaxLength<curEleLength){
          setValue(eleId, curEleValue.substr(0,eleMaxLength), { shouldValidate: true });
        }
        setFocus(nextTag);
        //console.log("PhoneNumVal",e.target.value.length,e);
      }
    };
    return(
        <>
            <h1 className="title"><strong>Bio Data</strong></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="reg_txt">Name <span>*</span></label>
                    <div className="controls form-inline">       
                        <input type="text" className="input-name" id="firstName" placeholder="First" 
                        {...register("firstName", {
                            required: true
                          })}
                        />
                        <input type="text" className="input-name" id="lastName" placeholder="Last"
                        {...register("lastName", {
                            required: true
                          })}
                        />
                    </div>     
                    {errors.firstNanme && <p>Name is required</p>}                 
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                    <label className="reg_txt">Email  <span>*</span></label>
                        <input type="email" className="form-register text" id="email" placeholder="E-mail"
                        {...register("email", {
                            required: true,
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Entered value does not match email format"
                            }
                          })}
                        />
                    </div>
                    <div className="clearfix"></div>
                    
                    <div className="form-group" style={{height:"70px"}}>
                    <label className="reg_txt">Phone Number  <span>*</span></label>
                    	<div className="clearfix"></div>
                      <div className="wsite-form">
							            <input type="text" id="phoneNum1" placeholder="###" className="text input-name1" 
                            {...register("phoneNum1", {
                            required: true,
                            //valueAsNumber: true,
                            minLength: 3,
                            pattern: {
                              value: /\d{3}/,
                              message: "Entered value does not match Phone Number format"
                            },
                           // onFocus: ()=>this.name=this.value,
                            onChange: (e) => NumVal(e)//,this.name)
                          })}
                            />
					            </div>
                       <div className="line">-</div>
                       <div className="wsite-form">
							            <input type="text" id="phoneNum2" placeholder="###" className="text input-name1" 
                            {...register("phoneNum2", {
                            required: true,
                            //valueAsNumber: true,
                            minLength: 3,
                            pattern: {
                              value: /\d{3}/,
                              message: "Entered value does not match Phone Number format"
                            },
                            onChange: (e) => NumVal(e)
                          })}
                            />
					              </div>
                       <div className="line">-</div>
                       <div className="wsite-form">
							            <input type="text" id="phoneNum3" placeholder="####" className="text input-name1" 
                            {...register("phoneNum3", {
                            required: true,
                            //valueAsNumber: true,
                            minLength: 4,
                            pattern: {
                              value: /\d{4}/,
                              message: "Entered value does not match Phone Number format"
                            },
                            onChange: (e) => NumVal(e)
                          })}
                            />
					              </div>
                       <p>{(errors.phoneNum1 || errors.phoneNum2 || errors.phoneNum3)? "Entered value does not match Phone Number format": null }</p>
                    </div>
                    
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Address  <span>*</span></label>
                        <input type="text" className="form-register text" id="line1" placeholder="Line 1" style={{marginBottom:"15px"}}
                        {...register("line1", {
                            required: true
                          })}
                        />
                        <input type="text" className="form-register text" id="line2" placeholder="Line 2" 
                        {...register("line2", {
                            required: true
                          })}
                        />
                    </div>
                    
                    <div className="form-group">                    
                        <div className="controls form-inline">       
                          <input type="text" id="city" className="input-name" placeholder="City" 
                          {...register("city", {
                            required: true
                          })}
                          />
                          <input type="text" id="state" className="input-name" placeholder="State" 
                          {...register("state", {
                            required: true
                          })}
                          />
   					    </div>                        
                    </div>
                    
                    <div className="form-group">                    
                        <div className="controls form-inline">       
                          <input type="text" id="zip" className="input-name" placeholder="Zip Code" 
                          {...register("zip", {
                            required: true,
                            minLength: 6,
                            pattern: {
                              value: /\d{6}/,
                              message: "Entered value does not match Zip format"
                            },
                            onChange: (e) => NumVal(e)
                          })}
                          />
                          <input type="text" id="country" className="input-name" placeholder="Country" 
                          {...register("country", {
                            required: true
                          })}
                          />
   					    </div>                        
                    </div>
					
					<div className="form-group">
                    <label className="reg_txt">Write Your qualification <span>*</span></label>
                        <input type="text" id="qualification" className="form-register text" placeholder="" style={{marginBottom:"15px"}}
                        {...register("qualification", {
                            required: true
                          })}
                        />
                    </div>
                    
                    
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Comment  <span>*</span></label>                        
                        <textarea id="comment" className="form-register text" 
                        {...register("comment", {
                            required: true
                          })}
                        ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <Button type="submit" variant="dark" className="btn btn-default submit" style={{width:"97%"}}>{(formStatus==="new")?"Submit":(formStatus==="edit")?"Update":"Back To Form"}</Button>
                    </div>
            </form>
        </>
    );
};

export default BioForm;