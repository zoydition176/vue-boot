export function handleTree(node, func){
  console.log(node, func);
}

function treeBreadthSearch(node: Record<string, any>){
  let queue: any[] = [];
  let step = 0;
  queue.push(node);
  while(queue.length>0){
    step++;
    const len = queue.length;
    for(let i = 0;i<len;i++){
      const front = queue[0];

    }
  }

}
