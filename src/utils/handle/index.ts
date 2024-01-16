import {isArray} from "@/utils/affirm/is";

export function handleTree(node, func){
  console.log(node, func);
}

/*
* 树结构广度优先搜索
* */
export function treeBreadthSearch(node: Record<string, any>, target: any, done: (sp: any) => any){
  const queue: any[] = [];
  let step = 0;
  queue.push(node);
  while(queue.length>0){
    step++;
    const len = queue.length;
    for(let i = 0;i<len;i++){
      const front = queue[0];
      if(front.id === target){
        done(step);
        return true;
      }else{
        if(front.children && isArray(front.children)){
          for(let j = 0;j<front.children.length;j++){
            queue.push(front.children[j]);
          }
        }
      }
      queue.shift();
    }
  }
}

/*
* 树结构深度优先搜索
* */
export function treeDeepSearch(node: Record<string, any>, target: any, done: () => any){
  if(!node){
    return;
  }else{
    if(node.id === target){
      done();
    }else{
      if(node.children && isArray(node.children)){
        for(let i = 0;i<node.children.length;i++){
          treeDeepSearch(node.children[i], target, done);
        }
      }
    }
  }
}
