
var asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a == 'number' && typeof b == 'number'){
                resolve(a+b)
            }else{
                reject("Should be numbers")
            }
        },1500)
    })
}

asyncAdd(5,7).then((result)=>{
    console.log(result)
    return asyncAdd(result,'8')
}).then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})

// var somePromise = new Promise((resolve, reject) => {
//     resolve('hey it worked')
// })

// somePromise.then((result) => {
//     console.log(result)
// }).catch((err) => {

// });