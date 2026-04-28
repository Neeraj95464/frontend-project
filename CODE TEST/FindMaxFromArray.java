public FindMaxFromArray{
    public static void main(String[] args){
        int arr[] = {1,2,42,5,3,6,4,6,3,77,44,2,4,7,9933,7,2,7}

        int max = arr[0];
        
        for(int i=1;i<arr.length;i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }

        System,out.println("Max elemes in arr is "+max);
    }
}


