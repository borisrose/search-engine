export const classRemoverOrAdder = (arrayList, index ,className, isToRemove) => {


    if(index) {

        if(arrayList[index] && isToRemove && arrayList[index] === className){

            return true
        }

        if(arrayList[index] && !isToRemove && arrayList[index] !== className){

            return true
        }


    }
   





    


}