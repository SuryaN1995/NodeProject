var user = {
    name: 'Surya',
    age:25,
    sayHi: () => {
        console.log(`${this.name}`)
    },
    sayHiAlt (){
        console.log(`${this.name}`)
    },
    syLol : () =>{
        console.log(`${this.age}`)
    },
    syLolAlt (){
        console.log(`${this.age}`)
    }
} 

user.sayHi()
user.sayHiAlt()
user.syLol()
user.syLolAlt()