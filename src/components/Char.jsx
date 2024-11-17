export default function Char({data, index,pressed}){

    function cls(){
        const list = [];
        if(data ===" "){
            list.push("space");
        }
        if(pressed.length > index){
            if(pressed[index] === data){
                list.push("correct")
            } else{
                list.push("wrong")
            }
        } else if(pressed.length === index){
            list.push("active")
        }

        return list.join(" ")
    }
    return <span className={cls()}>{data}</span>
}